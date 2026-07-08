'use client';

import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';
import { SECTORS_CONTENT } from '@/constants/content';
import type { Sector } from '@/services/sectores';

async function fetchSectoresClient(): Promise<Sector[]> {
  const supabase = getSupabaseClient();
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

export function useSectores() {
  return useQuery<Sector[]>({
    queryKey: ['sectores'],
    queryFn: fetchSectoresClient,
    staleTime: 120_000,
    placeholderData: SECTORS_CONTENT.sectors.map((s, i) => ({
      id: String(i),
      nombre: s.title,
      slug: s.title.toLowerCase().replace(/\s+/g, '-'),
      imagen: s.image,
    })),
  });
}
