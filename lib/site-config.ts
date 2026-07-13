import { unstable_cache } from 'next/cache';
import { getSupabaseClient } from '@/lib/supabase/client';
import { getSupabaseFormsClient } from '@/lib/supabase/server';
import {
  getDefaultSiteContact,
  parsePhoneList,
  parseSocialLinks,
} from '@/lib/site-contact-defaults';
import type { Tables } from '@/types/database';
import type { SiteContactConfig } from '@/types/site-contact';

export { getDefaultSiteContact, parsePhoneList } from '@/lib/site-contact-defaults';

type SiteConfigRow = Pick<Tables<'site_config'>, 'key' | 'value' | 'value_json'>;

const CONTACT_KEYS = [
  'whatsapp_number',
  'contact_email',
  'phone',
  'address',
  'business_hours',
  'social_links',
] as const;

function mergeRows(rows: SiteConfigRow[]): SiteContactConfig {
  const defaults = getDefaultSiteContact();
  const byKey = new Map(rows.map((row) => [row.key, row]));

  const phone = byKey.get('phone')?.value?.trim() || defaults.phone;
  const email = byKey.get('contact_email')?.value?.trim() || defaults.email;
  const address = byKey.get('address')?.value?.trim() || defaults.address;
  const businessHours =
    byKey.get('business_hours')?.value?.trim() || defaults.businessHours;
  const whatsappRaw =
    byKey.get('whatsapp_number')?.value?.trim() || defaults.whatsapp;
  const socialRow = byKey.get('social_links');

  return {
    phone,
    phones: parsePhoneList(phone),
    whatsapp: whatsappRaw,
    email,
    address,
    businessHours,
    social: parseSocialLinks(
      socialRow?.value_json ?? null,
      socialRow?.value ?? null,
      defaults.social
    ),
  };
}

async function fetchSiteConfigRows(): Promise<SiteConfigRow[] | null> {
  const supabase = getSupabaseFormsClient() ?? getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value, value_json')
    .in('key', [...CONTACT_KEYS]);

  if (error) {
    console.error('[site-config] Failed to load site_config:', error.message);
    return null;
  }

  return (data ?? []) as SiteConfigRow[];
}

/**
 * Contact data for the site.
 * Reads public.site_config and falls back to constants/site.ts.
 */
export async function getSiteContactConfig(): Promise<SiteContactConfig> {
  const rows = await fetchSiteConfigRows();
  if (!rows || rows.length === 0) return getDefaultSiteContact();
  return mergeRows(rows);
}

/** Cached for ISR — edits in Supabase appear within ~60s without redeploy. */
export const getCachedSiteContactConfig = unstable_cache(
  async () => getSiteContactConfig(),
  ['site-contact-config'],
  { revalidate: 60 }
);
