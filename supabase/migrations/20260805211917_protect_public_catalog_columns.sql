/*
  Restrict commercially sensitive columns exposed through PostgREST.

  RLS protects rows, not columns. Column grants ensure anon/authenticated
  cannot request stock, price, or the physical catalog PDF path directly.
*/

REVOKE SELECT ON TABLE public.productos FROM anon, authenticated;
GRANT SELECT (
  id,
  source_id,
  nombre,
  sku,
  brand,
  categoria,
  subcategory,
  descripcion,
  especificacion_tecnica,
  medidas,
  acabado,
  presentacion,
  grupo,
  familia,
  url_fotografia,
  url_producto,
  contenido,
  datasheet_url,
  orden,
  activo,
  created_at,
  updated_at
) ON TABLE public.productos TO anon, authenticated;

REVOKE SELECT ON TABLE public.catalogs FROM anon, authenticated;
DO $$
DECLARE
  safe_columns text;
BEGIN
  SELECT string_agg(quote_ident(column_name), ', ' ORDER BY ordinal_position)
  INTO safe_columns
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'catalogs'
    AND column_name <> 'file_url';

  IF safe_columns IS NULL THEN
    RAISE EXCEPTION 'public.catalogs has no public-safe columns';
  END IF;

  EXECUTE format(
    'GRANT SELECT (%s) ON TABLE public.catalogs TO anon, authenticated',
    safe_columns
  );
END
$$;

GRANT ALL ON TABLE public.productos, public.catalogs TO service_role, postgres;
