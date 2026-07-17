import { SITE_CONFIG } from '@/constants/site';
import { isSafeHttpUrl } from '@/lib/security';
import type { SiteContactConfig, SiteSocialLinks } from '@/types/site-contact';
import type { Json } from '@/types/database';

/** Defaults from constants — used when Supabase is offline or keys are missing. */
export function getDefaultSiteContact(): SiteContactConfig {
  return {
    phone: SITE_CONFIG.phone,
    phones: [...SITE_CONFIG.phones],
    whatsapp: SITE_CONFIG.whatsapp,
    email: SITE_CONFIG.email,
    address: SITE_CONFIG.address,
    businessHours: SITE_CONFIG.businessHours,
    social: { ...SITE_CONFIG.social },
  };
}

/** Splits a phone string like "0212-2398501 / 0212-2358456" into list items. */
export function parsePhoneList(phone: string): string[] {
  return phone
    .split(/[/|,·]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function asRecord(value: Json | null): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function parseSocialLinks(
  valueJson: Json | null,
  value: string | null,
  fallback: SiteSocialLinks
): SiteSocialLinks {
  let raw: Record<string, unknown> | null = asRecord(valueJson);

  if (!raw && value) {
    try {
      const parsed: unknown = JSON.parse(value);
      raw = asRecord(parsed as Json);
    } catch {
      raw = null;
    }
  }

  if (!raw) return { ...fallback };

  const pick = (key: keyof SiteSocialLinks) => {
    const candidate = raw?.[key];
    if (typeof candidate !== 'string') return fallback[key];
    const trimmed = candidate.trim();
    if (!trimmed) return fallback[key];
    return isSafeHttpUrl(trimmed) ? trimmed : fallback[key];
  };

  return {
    linkedin: pick('linkedin'),
    facebook: pick('facebook'),
    instagram: pick('instagram'),
  };
}
