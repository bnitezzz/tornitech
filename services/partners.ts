import { getSupabaseReader } from '@/services/supabase';

export type SocioComercial = {
  id: string;
  nombre: string;
  slug: string;
  logo: string | null;
  descripcion: string | null;
  sitioWeb: string | null;
};

export async function fetchSocioComercial(): Promise<SocioComercial | null> {
  const supabase = getSupabaseReader();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('partners')
    .select('id, name, slug, logo_url, description, website_url')
    .eq('is_active', true)
    .order('display_order')
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    nombre: data.name,
    slug: data.slug,
    logo: data.logo_url,
    descripcion: data.description,
    sitioWeb: data.website_url,
  };
}
