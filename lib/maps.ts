import { SITE_CONFIG } from '@/constants/site';

/**
 * Builds a Google Maps search URL for the given address.
 * Prefers company name + street so Maps can resolve the storefront.
 */
export function getGoogleMapsUrl(
  address: string,
  placeName: string = SITE_CONFIG.name
): string {
  const query = [placeName, address].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
