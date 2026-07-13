/*
  Catálogo de productos para la sección PRODUCTOS (CSV → Supabase).
  Toggle de visibilidad vía configuracion_web.mostrar_productos.
*/

-- ---------------------------------------------------------------------------
-- productos
-- ---------------------------------------------------------------------------
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

COMMENT ON TABLE public.productos IS
  'Catálogo plano importable por CSV (nombre, categoria, descripcion, orden, activo).';

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_productos" ON public.productos;
CREATE POLICY "public_read_productos" ON public.productos
  FOR SELECT TO anon, authenticated
  USING (activo = true);

-- ---------------------------------------------------------------------------
-- configuracion_web (un solo registro id = 1)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.configuracion_web (
  id integer PRIMARY KEY CHECK (id = 1),
  mostrar_productos boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.configuracion_web IS
  'Configuración pública de la web. Solo existe el registro id = 1.';

INSERT INTO public.configuracion_web (id, mostrar_productos)
VALUES (1, true)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.configuracion_web ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_configuracion_web" ON public.configuracion_web;
CREATE POLICY "public_read_configuracion_web" ON public.configuracion_web
  FOR SELECT TO anon, authenticated
  USING (true);

-- updated_at automático (reutiliza set_updated_at si existe)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'set_updated_at'
  ) THEN
    DROP TRIGGER IF EXISTS trg_configuracion_web_updated_at ON public.configuracion_web;
    CREATE TRIGGER trg_configuracion_web_updated_at
      BEFORE UPDATE ON public.configuracion_web
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;
