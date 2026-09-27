import { z } from 'zod';

/** List row — only columns needed for search results. */
export const productoListItemSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string(),
  brand: z.string().nullable().optional(),
  categoria: z.string(),
  url_fotografia: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
});

/** Full product detail for modal. */
export const productoDetailSchema = z.object({
  id: z.string().uuid(),
  source_id: z.number().nullable().optional(),
  nombre: z.string(),
  sku: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  categoria: z.string(),
  subcategory: z.string().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  especificacion_tecnica: z.string().nullable().optional(),
  medidas: z.string().nullable().optional(),
  acabado: z.string().nullable().optional(),
  presentacion: z.string().nullable().optional(),
  grupo: z.number().nullable().optional(),
  familia: z.number().nullable().optional(),
  url_fotografia: z.string().nullable().optional(),
  url_producto: z.string().nullable().optional(),
  contenido: z.string().nullable().optional(),
  datasheet_url: z.string().nullable().optional(),
  orden: z.number().optional(),
  activo: z.boolean().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const productSearchQuerySchema = z
  .string()
  .trim()
  .max(80)
  .transform((value) => value.replace(/[%_,]/g, ' ').replace(/\s+/g, ' ').trim());

export type ProductoListItem = z.infer<typeof productoListItemSchema>;
export type ProductoDetail = z.infer<typeof productoDetailSchema>;

export interface ConfiguracionWeb {
  id: number;
  mostrar_productos: boolean;
  updated_at?: string;
}

/** Columns selected for list/search queries (no SELECT *). */
export const PRODUCTO_LIST_COLUMNS =
  'id, nombre, brand, categoria, url_fotografia, sku' as const;

/** Columns selected for detail modal. */
export const PRODUCTO_DETAIL_COLUMNS = [
  'id',
  'source_id',
  'nombre',
  'sku',
  'brand',
  'categoria',
  'subcategory',
  'descripcion',
  'especificacion_tecnica',
  'medidas',
  'acabado',
  'presentacion',
  'grupo',
  'familia',
  'url_fotografia',
  'url_producto',
  'contenido',
  'datasheet_url',
  'orden',
  'activo',
  'created_at',
  'updated_at',
].join(', ');
