/*
================================================================================
  TORNITECH — Esquema corporativo Supabase (PostgreSQL)
================================================================================

  Entidades principales:
    1. leads              — Prospectos capturados desde formularios
    2. catalog_downloads  — Registro de descargas PDF por lead
    3. quote_requests     — Solicitudes de cotización
    4. site_config        — Configuración del sitio (WhatsApp, correos, redes)
    5. products           — Catálogo de productos / servicios
    6. catalogs           — Documentos PDF descargables

  Uso:
    • Proyecto nuevo  → ejecutar este archivo completo en el SQL Editor de Supabase
    • Proyecto existente → usar la migración 002_corporate_enhancements.sql

  Convenciones:
    • PK: uuid (gen_random_uuid())
    • Timestamps: timestamptz con DEFAULT now()
    • RLS habilitado; escritura pública solo en tablas de captura
================================================================================
*/

-- ─── Extensiones ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Tipos enumerados ────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE public.lead_source AS ENUM (
    'contact_form',
    'catalog_download',
    'quote_request',
    'whatsapp',
    'newsletter'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.quote_status AS ENUM (
    'pending',
    'in_review',
    'quoted',
    'closed',
    'spam'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.contact_status AS ENUM (
    'new',
    'read',
    'replied',
    'archived'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Función: actualizar updated_at ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─── Función: incrementar contador de descargas ─────────────────────────────
CREATE OR REPLACE FUNCTION public.increment_download_count(catalog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.catalogs
  SET download_count = download_count + 1,
      updated_at = now()
  WHERE id = catalog_id;
END;
$$;

-- =============================================================================
-- 1. CONFIGURACIÓN DEL SITIO
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.site_config (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  key         text        NOT NULL UNIQUE,
  value       text,
  value_json  jsonb,
  description text,
  is_public   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT site_config_key_format CHECK (key ~ '^[a-z][a-z0-9_]*$')
);

DROP TRIGGER IF EXISTS trg_site_config_updated_at ON public.site_config;
CREATE TRIGGER trg_site_config_updated_at
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE public.site_config IS 'Configuración clave-valor del sitio (WhatsApp, correos, redes sociales).';

-- ─── 2. PRODUCTOS / SERVICIOS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  description   text,
  image_url     text,
  display_order integer     NOT NULL DEFAULT 0,
  is_active     boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.products (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  sku               text        NOT NULL UNIQUE,
  name              text        NOT NULL,
  slug              text        NOT NULL UNIQUE,
  description       text,
  short_description text,
  category_id       uuid        REFERENCES public.categories(id) ON DELETE SET NULL,
  specifications    jsonb       NOT NULL DEFAULT '{}',
  material          text,
  grade             text,
  standard          text,
  applications      text,
  sectors           text,
  unit              text        NOT NULL DEFAULT 'pieza',
  min_order_qty     integer     NOT NULL DEFAULT 1 CHECK (min_order_qty >= 1),
  image_url         text,
  datasheet_url     text,
  is_featured       boolean     NOT NULL DEFAULT false,
  is_active         boolean     NOT NULL DEFAULT true,
  display_order     integer     NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT products_sku_not_empty CHECK (length(trim(sku)) > 0),
  CONSTRAINT products_name_not_empty CHECK (length(trim(name)) > 0)
);

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE public.products IS 'Catálogo de productos y servicios industriales.';

-- ─── 3. DOCUMENTOS PDF (catálogos) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.catalogs (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text        NOT NULL,
  slug            text        NOT NULL UNIQUE,
  description     text,
  file_url        text        NOT NULL,
  file_size_bytes bigint,
  cover_image_url text,
  version         text,
  pages           integer     CHECK (pages IS NULL OR pages > 0),
  language        text        NOT NULL DEFAULT 'es',
  is_featured     boolean     NOT NULL DEFAULT false,
  is_active       boolean     NOT NULL DEFAULT true,
  display_order   integer     NOT NULL DEFAULT 0,
  download_count  integer     NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT catalogs_title_not_empty CHECK (length(trim(title)) > 0),
  CONSTRAINT catalogs_file_url_not_empty CHECK (length(trim(file_url)) > 0)
);

DROP TRIGGER IF EXISTS trg_catalogs_updated_at ON public.catalogs;
CREATE TRIGGER trg_catalogs_updated_at
  BEFORE UPDATE ON public.catalogs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE public.catalogs IS 'Documentos PDF descargables (catálogos, fichas técnicas).';

-- ─── 4. LEADS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text        NOT NULL,
  email             text        NOT NULL,
  phone             text,
  company           text        NOT NULL,
  city              text,
  sector            text,
  source            text        NOT NULL,
  source_id         uuid,
  accepts_marketing boolean     NOT NULL DEFAULT false,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT leads_name_not_empty CHECK (length(trim(name)) >= 2),
  CONSTRAINT leads_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  CONSTRAINT leads_company_not_empty CHECK (length(trim(company)) >= 1),
  CONSTRAINT leads_source_valid CHECK (
    source IN ('contact_form', 'catalog_download', 'quote_request', 'whatsapp', 'newsletter')
  )
);

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE public.leads IS 'Prospectos capturados desde formularios, descargas y cotizaciones.';
COMMENT ON COLUMN public.leads.accepts_marketing IS 'Indica si el lead aceptó recibir promociones.';
COMMENT ON COLUMN public.leads.created_at IS 'Fecha de captura del lead.';

-- ─── 5. DESCARGAS DE PDF ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.catalog_downloads (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_id  uuid        NOT NULL REFERENCES public.catalogs(id) ON DELETE CASCADE,
  lead_id     uuid        REFERENCES public.leads(id) ON DELETE SET NULL,
  email       text,
  ip_address  inet,
  user_agent  text,
  created_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT catalog_downloads_email_format CHECK (
    email IS NULL OR email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  )
);

COMMENT ON TABLE public.catalog_downloads IS 'Registro de qué documento PDF descargó cada lead.';

-- ─── 6. SOLICITUDES DE COTIZACIÓN ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id      uuid        REFERENCES public.leads(id) ON DELETE SET NULL,
  name         text        NOT NULL,
  company      text        NOT NULL,
  email        text        NOT NULL,
  phone        text,
  city         text,
  sector       text,
  product_id   uuid        REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text,
  product_sku  text,
  quantity     text,
  message      text,
  status       text        NOT NULL DEFAULT 'pending',
  source       text        NOT NULL DEFAULT 'web',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT quote_requests_name_not_empty CHECK (length(trim(name)) >= 2),
  CONSTRAINT quote_requests_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  CONSTRAINT quote_requests_company_not_empty CHECK (length(trim(company)) >= 2),
  CONSTRAINT quote_requests_status_valid CHECK (
    status IN ('pending', 'in_review', 'quoted', 'closed', 'spam')
  )
);

DROP TRIGGER IF EXISTS trg_quote_requests_updated_at ON public.quote_requests;
CREATE TRIGGER trg_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

COMMENT ON TABLE public.quote_requests IS 'Solicitudes de cotización de productos o servicios.';

-- ─── 7. FORMULARIO DE CONTACTO (complementario) ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid        REFERENCES public.leads(id) ON DELETE SET NULL,
  name       text        NOT NULL,
  email      text        NOT NULL,
  phone      text,
  company    text,
  subject    text,
  message    text        NOT NULL,
  status     text        NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT contact_submissions_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  CONSTRAINT contact_submissions_message_min CHECK (length(trim(message)) >= 10),
  CONSTRAINT contact_submissions_status_valid CHECK (
    status IN ('new', 'read', 'replied', 'archived')
  )
);

DROP TRIGGER IF EXISTS trg_contact_submissions_updated_at ON public.contact_submissions;
CREATE TRIGGER trg_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── 8. SUSCRIPTORES (promociones) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email            text        NOT NULL UNIQUE,
  name             text,
  company          text,
  lead_id          uuid        REFERENCES public.leads(id) ON DELETE SET NULL,
  is_active        boolean     NOT NULL DEFAULT true,
  unsubscribed_at  timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT newsletter_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

-- =============================================================================
-- ÍNDICES
-- =============================================================================

-- Leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at      ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email           ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_company         ON public.leads (company);
CREATE INDEX IF NOT EXISTS idx_leads_source          ON public.leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_accepts_marketing ON public.leads (accepts_marketing)
  WHERE accepts_marketing = true;

-- Descargas PDF
CREATE INDEX IF NOT EXISTS idx_catalog_downloads_catalog ON public.catalog_downloads (catalog_id);
CREATE INDEX IF NOT EXISTS idx_catalog_downloads_lead    ON public.catalog_downloads (lead_id);
CREATE INDEX IF NOT EXISTS idx_catalog_downloads_created ON public.catalog_downloads (created_at DESC);

-- Cotizaciones
CREATE INDEX IF NOT EXISTS idx_quote_requests_created  ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status   ON public.quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email    ON public.quote_requests (email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_product  ON public.quote_requests (product_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_lead     ON public.quote_requests (lead_id);

-- Contacto
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status  ON public.contact_submissions (status);

-- Productos
CREATE INDEX IF NOT EXISTS idx_products_sku       ON public.products (sku);
CREATE INDEX IF NOT EXISTS idx_products_slug      ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_featured  ON public.products (is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active    ON public.products (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_category  ON public.products (category_id);

-- Catálogos PDF
CREATE INDEX IF NOT EXISTS idx_catalogs_slug     ON public.catalogs (slug);
CREATE INDEX IF NOT EXISTS idx_catalogs_active   ON public.catalogs (is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_catalogs_featured ON public.catalogs (is_featured) WHERE is_featured = true;

-- Configuración
CREATE INDEX IF NOT EXISTS idx_site_config_public ON public.site_config (key) WHERE is_public = true;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.site_config          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalogs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_downloads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Lectura pública: contenido del sitio
DROP POLICY IF EXISTS "public_read_site_config" ON public.site_config;
CREATE POLICY "public_read_site_config" ON public.site_config
  FOR SELECT TO anon, authenticated USING (is_public = true);

DROP POLICY IF EXISTS "public_read_categories" ON public.categories;
CREATE POLICY "public_read_categories" ON public.categories
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_products" ON public.products;
CREATE POLICY "public_read_products" ON public.products
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_catalogs" ON public.catalogs;
CREATE POLICY "public_read_catalogs" ON public.catalogs
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- Escritura pública: solo captura de formularios (INSERT)
DROP POLICY IF EXISTS "public_insert_leads" ON public.leads;
CREATE POLICY "public_insert_leads" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_catalog_downloads" ON public.catalog_downloads;
CREATE POLICY "public_insert_catalog_downloads" ON public.catalog_downloads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_quote_requests" ON public.quote_requests;
CREATE POLICY "public_insert_quote_requests" ON public.quote_requests
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_contact_submissions" ON public.contact_submissions;
CREATE POLICY "public_insert_contact_submissions" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_newsletter" ON public.newsletter_subscribers;
CREATE POLICY "public_insert_newsletter" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- =============================================================================
-- DATOS INICIALES: configuración del sitio
-- =============================================================================
INSERT INTO public.site_config (key, value, description, is_public) VALUES
  ('whatsapp_number',   '584242818062',               'Número de WhatsApp con código de país', true),
  ('contact_email',     'ventasccstornitech@gmail.com', 'Correo principal de contacto', true),
  ('sales_email',       'ventasccstornitech@gmail.com', 'Correo del equipo comercial', false),
  ('phone',             '0212-2398501 / 0212-2358456', 'Teléfono de la empresa', true),
  ('address',           'Av. tercera transversal de Montecristo entre 1era y 2da Av., Caracas 1071', 'Dirección física', true),
  ('business_hours',    'Lunes a Viernes 8:00am – 5:00pm · Sábado 9:00am – 2:00pm', 'Horario de atención', true),
  ('site_url',          'https://tornitech.com',      'URL del sitio web', true)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.site_config (key, value_json, description, is_public) VALUES
  ('social_links', '{"instagram":"https://www.instagram.com/ccstornitech/"}', 'Redes sociales', true)
ON CONFLICT (key) DO NOTHING;

-- Productos de ejemplo
INSERT INTO public.products (sku, name, slug, short_description, standard, is_featured, display_order) VALUES
  ('933-8.8-M12',  'Tornillo Hexagonal DIN 933',  'tornillo-hexagonal-din-933',  'Tornillo de cabeza hexagonal, rosca métrica completa.', 'DIN 933', true, 1),
  ('931-10.9-M16', 'Tornillo Hexagonal DIN 931',  'tornillo-hexagonal-din-931',  'Tornillo con cuello, rosca parcial.', 'DIN 931', true, 2),
  ('ISO4014-M20',  'Perno Hexagonal ISO 4014',    'perno-hexagonal-iso-4014',    'Perno de alta resistencia para conexiones estructurales.', 'ISO 4014', true, 3),
  ('DIN985-M8',    'Tuerca Autoblocante DIN 985', 'tuerca-autoblocante-din-985', 'Tuerca con inserto de nylon antivibración.', 'DIN 985', true, 4)
ON CONFLICT (sku) DO NOTHING;

-- Catálogos PDF de ejemplo
INSERT INTO public.catalogs (title, slug, description, file_url, version, is_featured, display_order) VALUES
  (
    'Catálogo general',
    'catalogo-general',
    'Referencia completa de tornillería y fijación industrial — Volumen 1, 2025.',
    '/catalogs/catalogo-general-vol1-2025.pdf',
    '2025',
    true,
    1
  ),
  (
    'Catálogo Automotriz',
    'catalogo-automotriz',
    'Tornillería y elementos de fijación para el sector automotriz — Volumen 1, 2025.',
    '/catalogs/catalogo-automotriz-vol1-2025.pdf',
    '2025',
    true,
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- VISTAS ÚTILES (reportes)
-- =============================================================================

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
-- =============================================================================
-- CATÁLOGO PRODUCTOS (migración 004)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.productos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  categoria text NOT NULL,
  descripcion text,
  orden integer NOT NULL DEFAULT 0,
  activo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS productos_activo_categoria_orden_idx
  ON public.productos (activo, categoria, orden);

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.configuracion_web (
  id integer PRIMARY KEY CHECK (id = 1),
  mostrar_productos boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.configuracion_web (id, mostrar_productos)
VALUES (1, true)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.configuracion_web ENABLE ROW LEVEL SECURITY;
