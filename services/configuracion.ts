import { getSupabaseReader } from '@/services/supabase';
import type { SiteConfigJsonMap, SiteConfigMap } from '@/types/configuracion';

export async function fetchSiteConfigValues(): Promise<SiteConfigMap> {
  const supabase = getSupabaseReader();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value')
    .eq('is_public', true)
    .not('value', 'is', null);

  if (error || !data) return {};

  return Object.fromEntries(
    data.filter((row) => row.value).map((row) => [row.key, row.value as string])
  );
}

export async function fetchSiteConfigJson(): Promise<SiteConfigJsonMap> {
  const supabase = getSupabaseReader();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value_json')
    .eq('is_public', true)
    .not('value_json', 'is', null);

  if (error || !data) return {};

  return Object.fromEntries(
    data
      .filter((row) => row.value_json)
      .map((row) => [row.key, row.value_json as unknown])
  );
}

export async function getConfigSection<T>(key: string, fallback: T): Promise<T> {
  const json = await fetchSiteConfigJson();
  const section = json[key];
  if (!section || typeof section !== 'object') return fallback;
  return { ...fallback, ...(section as T) };
}
