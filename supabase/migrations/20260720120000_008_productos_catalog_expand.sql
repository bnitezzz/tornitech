/*
  Expand productos for Panama Fasteners Excel import.
  Excel columns preserved; optional sku/brand/price/stock/datasheet added.
  RLS: SELECT only for anon/authenticated. Writes via service_role.
*/

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

ALTER TABLE public.productos
  ADD COLUMN IF NOT EXISTS source_id integer,
  ADD COLUMN IF NOT EXISTS sku text,
  ADD COLUMN IF NOT EXISTS brand text,
  ADD COLUMN IF NOT EXISTS subcategory text,
  ADD COLUMN IF NOT EXISTS especificacion_tecnica text,
  ADD COLUMN IF NOT EXISTS medidas text,
  ADD COLUMN IF NOT EXISTS acabado text,
  ADD COLUMN IF NOT EXISTS presentacion text,
  ADD COLUMN IF NOT EXISTS grupo integer,
  ADD COLUMN IF NOT EXISTS familia integer,
  ADD COLUMN IF NOT EXISTS url_fotografia text,
  ADD COLUMN IF NOT EXISTS url_producto text,
  ADD COLUMN IF NOT EXISTS contenido text,
  ADD COLUMN IF NOT EXISTS datasheet_url text,
  ADD COLUMN IF NOT EXISTS stock integer,
  ADD COLUMN IF NOT EXISTS price numeric(12, 2),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

COMMENT ON TABLE public.productos IS
  'Catálogo de productos (Excel Panama Fasteners). Lectura pública; escritura solo service_role.';
COMMENT ON COLUMN public.productos.source_id IS 'ID numérico del Excel de origen (upsert).';
COMMENT ON COLUMN public.productos.url_fotografia IS 'URL de imagen del producto (no binario).';
COMMENT ON COLUMN public.productos.brand IS 'Marca (opcional; no viene en todos los Excel).';

-- Prefer UNIQUE constraint for PostgREST upsert onConflict=source_id
ALTER TABLE public.productos DROP CONSTRAINT IF EXISTS productos_source_id_key;
DROP INDEX IF EXISTS public.productos_source_id_uidx;
ALTER TABLE public.productos
  ADD CONSTRAINT productos_source_id_key UNIQUE (source_id);

CREATE UNIQUE INDEX IF NOT EXISTS productos_nombre_lower_uidx
  ON public.productos (lower(btrim(nombre)));

CREATE INDEX IF NOT EXISTS productos_nombre_btree_idx
  ON public.productos (nombre);

CREATE INDEX IF NOT EXISTS productos_sku_btree_idx
  ON public.productos (sku)
  WHERE sku IS NOT NULL;

CREATE INDEX IF NOT EXISTS productos_brand_btree_idx
  ON public.productos (brand)
  WHERE brand IS NOT NULL;

CREATE INDEX IF NOT EXISTS productos_categoria_btree_idx
  ON public.productos (categoria);

CREATE INDEX IF NOT EXISTS productos_nombre_trgm_idx
  ON public.productos USING gin (nombre extensions.gin_trgm_ops);

CREATE INDEX IF NOT EXISTS productos_sku_trgm_idx
  ON public.productos USING gin (sku extensions.gin_trgm_ops)
  WHERE sku IS NOT NULL;

CREATE INDEX IF NOT EXISTS productos_brand_trgm_idx
  ON public.productos USING gin (brand extensions.gin_trgm_ops)
  WHERE brand IS NOT NULL;

CREATE INDEX IF NOT EXISTS productos_categoria_trgm_idx
  ON public.productos USING gin (categoria extensions.gin_trgm_ops);

CREATE INDEX IF NOT EXISTS productos_activo_updated_idx
  ON public.productos (activo, updated_at DESC);

DROP TRIGGER IF EXISTS trg_productos_updated_at ON public.productos;
CREATE TRIGGER trg_productos_updated_at
  BEFORE UPDATE ON public.productos
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_productos" ON public.productos;
DROP POLICY IF EXISTS "anon_insert_productos" ON public.productos;
DROP POLICY IF EXISTS "anon_update_productos" ON public.productos;
DROP POLICY IF EXISTS "anon_delete_productos" ON public.productos;
DROP POLICY IF EXISTS "authenticated_insert_productos" ON public.productos;
DROP POLICY IF EXISTS "authenticated_update_productos" ON public.productos;
DROP POLICY IF EXISTS "authenticated_delete_productos" ON public.productos;

CREATE POLICY "public_read_productos" ON public.productos
  FOR SELECT TO anon, authenticated
  USING (activo = true);

REVOKE ALL ON TABLE public.productos FROM PUBLIC;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.productos FROM anon, authenticated;
GRANT SELECT ON TABLE public.productos TO anon, authenticated;
GRANT ALL ON TABLE public.productos TO service_role, postgres;
