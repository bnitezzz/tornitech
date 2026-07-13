/*
  Migración incremental — Mejoras al esquema corporativo existente.
  Compatible con 001_initial_schema.sql ya aplicado en Supabase.

  Añade:
    - Función increment_download_count (usada por el frontend)
    - Triggers updated_at
    - Constraints de email y validación
    - Columnas opcionales (lead_id en formularios, updated_at en leads)
    - Índices adicionales
    - Datos semilla en site_config
*/

-- ─── Función: updated_at automático ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─── Función: contador de descargas (requerida por actions/contact.ts) ────────
CREATE OR REPLACE FUNCTION public.increment_download_count(catalog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.catalogs
  SET download_count = COALESCE(download_count, 0) + 1,
      updated_at = now()
  WHERE id = catalog_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_download_count(uuid) TO anon, authenticated, service_role;

-- ─── Columnas faltantes (idempotente) ───────────────────────────────────────
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.site_config
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS applications text,
  ADD COLUMN IF NOT EXISTS sectors text;

-- ─── Triggers updated_at ─────────────────────────────────────────────────────
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY[
    'leads', 'products', 'catalogs', 'site_config',
    'quote_requests', 'contact_submissions'
  ] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON public.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
      t, t
    );
  END LOOP;
END $$;

-- ─── Constraints de email (ignorar si ya existen) ─────────────────────────────
DO $$ BEGIN
  ALTER TABLE public.leads
    ADD CONSTRAINT leads_email_format
    CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.leads
    ADD CONSTRAINT leads_source_valid
    CHECK (source IN ('contact_form', 'catalog_download', 'quote_request', 'whatsapp', 'newsletter'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE public.quote_requests
    ADD CONSTRAINT quote_requests_status_valid
    CHECK (status IN ('pending', 'in_review', 'quoted', 'closed', 'spam'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Índices adicionales ─────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_leads_email            ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_accepts_marketing ON public.leads (accepts_marketing) WHERE accepts_marketing = true;
CREATE INDEX IF NOT EXISTS idx_catalog_downloads_lead  ON public.catalog_downloads (lead_id);
CREATE INDEX IF NOT EXISTS idx_catalog_downloads_catalog ON public.catalog_downloads (catalog_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_lead   ON public.quote_requests (lead_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status   ON public.quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_lead ON public.contact_submissions (lead_id);

-- ─── RLS: lectura pública solo de config pública ──────────────────────────────
DROP POLICY IF EXISTS "anon_read_site_config" ON public.site_config;
CREATE POLICY "public_read_site_config" ON public.site_config
  FOR SELECT TO anon, authenticated
  USING (COALESCE(is_public, true) = true);

-- ─── Datos semilla: configuración del sitio ──────────────────────────────────
INSERT INTO public.site_config (key, value, description, is_public) VALUES
  ('whatsapp_number', '584242818062', 'Número de WhatsApp con código de país', true),
  ('contact_email',   'ventasccstornitech@gmail.com', 'Correo principal de contacto', true),
  ('sales_email',     'ventasccstornitech@gmail.com', 'Correo del equipo comercial', false),
  ('phone',           '0212-2398501 / 0212-2358456', 'Teléfono de la empresa', true),
  ('business_hours',  'Lunes a Viernes 8:00am – 5:00pm · Sábado 9:00am – 2:00pm', 'Horario de atención', true),
  ('site_url',        'https://tornitech.com', 'URL del sitio web', true)
ON CONFLICT (key) DO UPDATE SET
  description = EXCLUDED.description,
  is_public = EXCLUDED.is_public;

INSERT INTO public.site_config (key, value_json, description, is_public) VALUES
  (
    'social_links',
    '{"instagram":"https://www.instagram.com/ccstornitech/"}'::jsonb,
    'Redes sociales',
    true
  )
ON CONFLICT (key) DO UPDATE SET
  value_json = EXCLUDED.value_json,
  description = EXCLUDED.description;

-- ─── Vista de reporte: leads + descargas ─────────────────────────────────────
CREATE OR REPLACE VIEW public.v_leads_with_downloads AS
SELECT
  l.id,
  l.name,
  l.email,
  l.phone,
  l.company,
  l.accepts_marketing,
  l.source,
  l.created_at,
  COUNT(cd.id) AS total_downloads,
  ARRAY_AGG(DISTINCT c.title ORDER BY c.title) FILTER (WHERE c.title IS NOT NULL) AS downloaded_documents
FROM public.leads l
LEFT JOIN public.catalog_downloads cd ON cd.lead_id = l.id
LEFT JOIN public.catalogs c ON c.id = cd.catalog_id
GROUP BY l.id;

COMMENT ON VIEW public.v_leads_with_downloads IS 'Leads con conteo y listado de PDFs descargados.';
