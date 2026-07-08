'use client';

import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { SiteConfigJsonMap } from '@/types/configuracion';

async function loadConfigJson(): Promise<SiteConfigJsonMap> {
  const supabase = getSupabaseClient();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value_json')
    .eq('is_public', true)
    .not('value_json', 'is', null);

  if (error || !data) return {};

  return Object.fromEntries(
    data.filter((row) => row.value_json).map((row) => [row.key, row.value_json as unknown])
  );
}

export function useSiteConfigJson() {
  return useQuery({
    queryKey: ['site_config_json'],
    queryFn: loadConfigJson,
  });
}

export function useConfigSection<T>(key: string, fallback: T): T {
  const { data } = useSiteConfigJson();
  const section = data?.[key];
  if (!section || typeof section !== 'object') return fallback;
  return { ...fallback, ...(section as T) };
}
