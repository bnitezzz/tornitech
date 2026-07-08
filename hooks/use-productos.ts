'use client';

import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';
import { DEFAULT_PRODUCTS } from '@/constants/content';
import type { Producto } from '@/types/producto';

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  material: string | null;
  grade: string | null;
  standard: string | null;
  datasheet_url: string | null;
  is_active: boolean;
  created_at: string;
};

function mapRow(row: ProductRow): Producto {
  return {
    id: row.id,
    nombre: row.name,
    slug: row.slug,
    descripcion: row.short_description || row.description,
    imagen: row.image_url,
    categoria: null,
    marca: null,
    din: row.standard,
    astm: null,
    grado: row.grade,
    sku: row.sku,
    material: row.material,
    stock: 0,
    activo: row.is_active,
    pdf: row.datasheet_url,
    fecha: row.created_at,
  };
}

function mapFallbackProducts(): Producto[] {
  return DEFAULT_PRODUCTS.map((p) => ({
    id: p.id,
    nombre: p.name,
    slug: p.sku.toLowerCase().replace(/\s+/g, '-'),
    descripcion: p.short_description,
    imagen: p.image,
    categoria: null,
    marca: null,
    din: p.specs.includes('DIN') ? p.specs : null,
    astm: null,
    grado: null,
    sku: p.sku,
    material: null,
    stock: 0,
    activo: true,
    pdf: null,
    fecha: null,
  }));
}

async function fetchProductosClient(featured?: boolean, limit?: number): Promise<Producto[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return mapFallbackProducts();

  let query = supabase
    .from('products')
    .select(
      'id, sku, name, slug, description, short_description, image_url, material, grade, standard, datasheet_url, is_active, created_at'
    )
    .eq('is_active', true)
    .order('display_order');

  if (featured) query = query.eq('is_featured', true);
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data?.length) return mapFallbackProducts();
  return (data as ProductRow[]).map(mapRow);
}

export function useProductos(options?: { featured?: boolean; limit?: number }) {
  return useQuery({
    queryKey: ['productos', options?.featured, options?.limit],
    queryFn: () => fetchProductosClient(options?.featured, options?.limit),
    placeholderData: mapFallbackProducts(),
  });
}
