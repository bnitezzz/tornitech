import { getSupabaseClient } from '@/lib/supabase/client';
import type { ConfiguracionWeb, Producto, ProductoCategoria } from '@/types/producto';
import type { Tables } from '@/types/database';

type ProductoRow = Tables<'productos'>;
type ConfigRow = Tables<'configuracion_web'>;

function mapProducto(row: ProductoRow): Producto {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria,
    descripcion: row.descripcion,
    orden: row.orden,
    activo: row.activo,
  };
}

/** Active catalog products ordered by categoria, then orden. */
export async function getProductos(): Promise<Producto[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('productos')
    .select('id, nombre, categoria, descripcion, orden, activo')
    .eq('activo', true)
    .order('categoria', { ascending: true })
    .order('orden', { ascending: true });

  if (error) throw error;
  return ((data ?? []) as ProductoRow[]).map(mapProducto);
}

/** Unique category names from active products, alphabetically. */
export async function getCategorias(): Promise<string[]> {
  const productos = await getProductos();
  const categorias = new Set(productos.map((p) => p.categoria.trim()).filter(Boolean));
  return Array.from(categorias).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
}

/** Web config row (id = 1). Defaults to hidden when unavailable. */
export async function getConfiguracionProductos(): Promise<ConfiguracionWeb | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('configuracion_web')
    .select('id, mostrar_productos, updated_at')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as ConfigRow;
  return {
    id: row.id,
    mostrar_productos: row.mostrar_productos,
    updated_at: row.updated_at,
  };
}

/** Group products by category (alphabetical). Products keep `orden` within each group. */
export function groupProductosByCategoria(productos: Producto[]): ProductoCategoria[] {
  const map = new Map<string, Producto[]>();

  for (const producto of productos) {
    const key = producto.categoria.trim();
    if (!key) continue;
    const list = map.get(key) ?? [];
    list.push(producto);
    map.set(key, list);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
    .map(([categoria, items]) => ({
      categoria,
      productos: [...items].sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, 'es')),
    }));
}

/** Client-side search across nombre, categoria and descripcion. */
export function filterProductos(productos: Producto[], query: string): Producto[] {
  const q = query.trim().toLowerCase();
  if (!q) return productos;

  return productos.filter((p) => {
    const haystack = [p.nombre, p.categoria, p.descripcion ?? '']
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
