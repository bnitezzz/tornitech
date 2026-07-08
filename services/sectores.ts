import { getSupabaseReader } from '@/services/supabase';

export type Sector = {
  id: string;
  nombre: string;
  slug: string;
  imagen: string | null;
};

export async function fetchSectores(): Promise<Sector[]> {
  const supabase = getSupabaseReader();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('sectors')
    .select('id, name, slug, image_url')
    .eq('is_active', true)
    .order('display_order');

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    nombre: row.name,
    slug: row.slug,
    imagen: row.image_url,
  }));
}
