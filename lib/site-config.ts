import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { getSupabaseFormsClient, getSupabaseServer } from '@/lib/supabase/server';
import {
  getDefaultSiteContact,
  parsePhoneList,
  parseSocialLinks,
} from '@/lib/site-contact-defaults';
import type { Tables } from '@/types/database';
import type { SiteContactConfig } from '@/types/site-contact';

export { getDefaultSiteContact, parsePhoneList } from '@/lib/site-contact-defaults';

type SiteConfigRow = Pick<Tables<'site_config'>, 'key' | 'value' | 'value_json'>;

/** Avoid hanging the first paint when Supabase is slow. Defaults in constants/site.ts cover the gap. */
const SITE_CONFIG_FETCH_TIMEOUT_MS = 1_200;

const CONTACT_KEYS = [
  'whatsapp_number',
  'contact_email',
  'phone',
  'address',
  'business_hours',
  'social_links',
] as const;

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`site_config fetch timed out after ${ms}ms`));
    }, ms);

    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

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
  const supabase = getSupabaseServer() ?? getSupabaseFormsClient();
  if (!supabase) return null;

  try {
    const { data, error } = await withTimeout(
      supabase
        .from('site_config')
        .select('key, value, value_json')
        .in('key', [...CONTACT_KEYS]),
      SITE_CONFIG_FETCH_TIMEOUT_MS
    );

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[site-config] Failed to load site_config:', error.message);
      }
      return null;
    }

    return (data ?? []) as SiteConfigRow[];
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        '[site-config] site_config unavailable:',
        err instanceof Error ? err.message : err
      );
    }
    return null;
  }
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

const getCachedSiteContact = unstable_cache(
  async () => getSiteContactConfig(),
  ['site-contact-config'],
  { revalidate: 60 }
);

/**
 * One read per request (layout + page) and ~60s across requests.
 * The HTML shell stays dynamic so Netlify does not cache an empty 304.
 */
export const getCachedSiteContactConfig = cache(getCachedSiteContact);
