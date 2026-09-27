import { getSupabaseClient } from '@/lib/supabase/client';
import { safeHttpUrl, toSafeErrorMessage } from '@/lib/security';
import {
  PRODUCTO_DETAIL_COLUMNS,
  PRODUCTO_LIST_COLUMNS,
  productSearchQuerySchema,
  type ConfiguracionWeb,
  type ProductoDetail,
  type ProductoListItem,
} from '@/types/producto';
import type { Tables } from '@/types/database';

type ProductoRow = Tables<'productos'>;
type ConfigRow = Tables<'configuracion_web'>;

export const PRODUCT_SEARCH_LIMIT = 40;
export const PRODUCT_SEARCH_MIN_CHARS = 2;

function mapListItem(row: Pick<
  ProductoRow,
  'id' | 'nombre' | 'brand' | 'categoria' | 'url_fotografia' | 'sku'
>): ProductoListItem {
  return {
    id: row.id,
    nombre: row.nombre,
    brand: row.brand,
    categoria: row.categoria,
    url_fotografia: safeHttpUrl(row.url_fotografia) ?? null,
    sku: row.sku,
  };
}

function mapDetail(row: ProductoRow): ProductoDetail {
  return {
    id: row.id,
    source_id: row.source_id,
    nombre: row.nombre,
    sku: row.sku,
    brand: row.brand,
    categoria: row.categoria,
    subcategory: row.subcategory,
    descripcion: row.descripcion,
    especificacion_tecnica: row.especificacion_tecnica,
    medidas: row.medidas,
    acabado: row.acabado,
    presentacion: row.presentacion,
    grupo: row.grupo,
    familia: row.familia,
    url_fotografia: safeHttpUrl(row.url_fotografia) ?? null,
    url_producto: safeHttpUrl(row.url_producto) ?? null,
    contenido: row.contenido,
    datasheet_url: safeHttpUrl(row.datasheet_url) ?? null,
    orden: row.orden,
    activo: row.activo,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/** Sanitize user query for PostgREST ilike / or filters. */
export function sanitizeProductSearchQuery(raw: string): string {
  const parsed = productSearchQuerySchema.safeParse(raw);
  return parsed.success ? parsed.data : '';
}

/**
 * Server-side product search (nombre, sku, brand, categoria).
 * Does not load the full catalog — limited results only.
 */
export async function searchProductos(rawQuery: string): Promise<ProductoListItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const q = sanitizeProductSearchQuery(rawQuery);
  if (q.length < PRODUCT_SEARCH_MIN_CHARS) return [];

  const escaped = q.replace(/"/g, '');
  const pattern = `%${escaped}%`;
  const orFilter = [
    `nombre.ilike."${pattern}"`,
    `sku.ilike."${pattern}"`,
    `brand.ilike."${pattern}"`,
    `categoria.ilike."${pattern}"`,
  ].join(',');

  const { data, error } = await supabase
    .from('productos')
    .select(PRODUCTO_LIST_COLUMNS)
    .eq('activo', true)
    .or(orFilter)
    .order('nombre', { ascending: true })
    .limit(PRODUCT_SEARCH_LIMIT);

  if (error) {
    throw new Error(toSafeErrorMessage(error) || 'Error al buscar productos');
  }

  return ((data ?? []) as unknown as Pick<
    ProductoRow,
    'id' | 'nombre' | 'brand' | 'categoria' | 'url_fotografia' | 'sku'
  >[]).map(mapListItem);
}

/** Fetch a single active product for the detail modal. */
export async function getProductoById(id: string): Promise<ProductoDetail | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('productos')
    .select(PRODUCTO_DETAIL_COLUMNS)
    .eq('id', id)
    .eq('activo', true)
    .maybeSingle();

  if (error) {
    throw new Error(toSafeErrorMessage(error) || 'Error al cargar el producto');
  }
  if (!data) return null;

  return mapDetail(data as unknown as ProductoRow);
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
