/*
  Endurece RLS: contenido del sitio solo lectura pública.
  Formularios públicos mantienen INSERT en tablas de captura.
*/

-- Eliminar políticas permisivas de escritura en tablas de contenido
DO $$ DECLARE
  tbl text;
  pol text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'categories', 'subcategories', 'brands', 'certifications', 'sectors',
    'products', 'product_sectors', 'product_certifications', 'catalogs',
    'partners', 'news', 'blog_posts', 'site_config'
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

-- Lectura pública de contenido activo
DROP POLICY IF EXISTS "public_read_categories" ON public.categories;
CREATE POLICY "public_read_categories" ON public.categories
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_products" ON public.products;
CREATE POLICY "public_read_products" ON public.products
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_catalogs" ON public.catalogs;
CREATE POLICY "public_read_catalogs" ON public.catalogs
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_site_config" ON public.site_config;
CREATE POLICY "public_read_site_config" ON public.site_config
  FOR SELECT TO anon, authenticated USING (COALESCE(is_public, true) = true);

-- Captura pública (INSERT únicamente)
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

-- RPC: solo service_role (server actions usan service role key)
REVOKE EXECUTE ON FUNCTION public.increment_download_count(uuid) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_download_count(uuid) TO service_role;
