import { getSupabaseReader } from '@/services/supabase';

export type Certificacion = { id: string; nombre: string; codigo: string; logo: string | null };

export async function fetchCertificaciones(): Promise<Certificacion[]> {
  const supabase = getSupabaseReader();
  if (!supabase) return [];

  const { data, error } = await supabase.from('certifications').select('id, name, code, logo_url').order('name');
  if (error || !data) return [];
  return data.map((r) => ({ id: r.id, nombre: r.name, codigo: r.code, logo: r.logo_url }));
}
