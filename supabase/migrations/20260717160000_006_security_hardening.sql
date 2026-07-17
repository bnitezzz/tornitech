/*
  006 — Security hardening (P0/P1)

  - Lock PII view from anon/authenticated
  - Revoke SECURITY DEFINER RPCs from public roles
  - Remove public INSERT on capture tables (writes only via service_role / Server Actions)
  - Tighten site_config public read (is_public must be true)
  - Harden Storage bucket images (size/MIME + no anon write)
  - Fix set_updated_at search_path
*/

-- ─── 1. Vista PII: security_invoker + sin acceso público ─────────────────────
DROP VIEW IF EXISTS public.v_leads_with_downloads;

CREATE VIEW public.v_leads_with_downloads
WITH (security_invoker = true)
AS
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

COMMENT ON VIEW public.v_leads_with_downloads IS
  'Reporte interno de leads + descargas. Solo service_role / Dashboard.';

REVOKE ALL ON TABLE public.v_leads_with_downloads FROM PUBLIC;
REVOKE ALL ON TABLE public.v_leads_with_downloads FROM anon, authenticated;
GRANT SELECT ON TABLE public.v_leads_with_downloads TO service_role;

-- ─── 2. RPC SECURITY DEFINER: solo service_role ──────────────────────────────
REVOKE ALL ON FUNCTION public.increment_download_count(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_download_count(uuid) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_download_count(uuid) TO service_role;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

-- ─── 3. Eliminar INSERT público en tablas de captura ─────────────────────────
-- Las escrituras deben pasar por Server Actions con SUPABASE_SERVICE_ROLE_KEY.
DROP POLICY IF EXISTS "public_insert_leads" ON public.leads;
DROP POLICY IF EXISTS "public_insert_catalog_downloads" ON public.catalog_downloads;
DROP POLICY IF EXISTS "public_insert_quote_requests" ON public.quote_requests;
DROP POLICY IF EXISTS "public_insert_contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "public_insert_newsletter" ON public.newsletter_subscribers;

-- Asegurar que no queden políticas de escritura residuales en captura
DO $$
DECLARE
  tbl text;
  pol text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'leads', 'catalog_downloads', 'quote_requests',
    'contact_submissions', 'newsletter_subscribers'
  ] LOOP
    FOR pol IN
      SELECT policyname FROM pg_policies
      WHERE schemaname = 'public' AND tablename = tbl
        AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
    END LOOP;
  END LOOP;
END $$;

-- ─── 4. site_config: solo keys explícitamente públicas ───────────────────────
DROP POLICY IF EXISTS "public_read_site_config" ON public.site_config;
CREATE POLICY "public_read_site_config" ON public.site_config
  FOR SELECT TO anon, authenticated
  USING (is_public IS TRUE);

UPDATE public.site_config
SET is_public = false
WHERE key = 'sales_email' AND COALESCE(is_public, true) = true;

-- ─── 5. set_updated_at: search_path fijo ─────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─── 6. Storage: bucket images endurecido ────────────────────────────────────
UPDATE storage.buckets
SET
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'images';

-- Quitar escrituras públicas si existen; lectura pública del bucket público OK
DO $$
DECLARE
  pol text;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND (
        policyname ILIKE '%images%'
        OR qual::text ILIKE '%images%'
        OR with_check::text ILIKE '%images%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol);
  END LOOP;
END $$;

DROP POLICY IF EXISTS "Public read product images" ON storage.objects;
-- Public bucket URLs remain reachable without a SELECT listing policy.
-- Writes only via service_role (Dashboard / admin scripts).

DROP POLICY IF EXISTS "Service role manage product images" ON storage.objects;
CREATE POLICY "Service role manage product images"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');
