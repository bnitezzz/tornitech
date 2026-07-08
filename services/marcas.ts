import { getSupabaseReader } from '@/services/supabase';

export type Marca = { id: string; nombre: string; logo: string | null; slug: string };

export async function fetchMarcas(): Promise<Marca[]> {
  const supabase = getSupabaseReader();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('brands')
    .select('id, name, slug, logo_url')
    .eq('is_active', true)
    .order('name');

  if (error || !data) return [];
  return data.map((r) => ({ id: r.id, nombre: r.name, slug: r.slug, logo: r.logo_url }));
}
