import { DEFAULT_CATALOGS } from '@/constants/content';
import { getSupabaseFormsClient, getSupabaseServer } from '@/lib/supabase/server';
import { isValidUuid } from '@/lib/supabase/config';

const ALLOWED_PREFIXES = ['/catalogs/'] as const;

/** Only same-origin catalog PDF paths are permitted for download. */
export function isAllowedCatalogPath(path: string): boolean {
  if (!path.startsWith('/')) return false;
  if (path.includes('..')) return false;
  return ALLOWED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export type ResolvedCatalog = {
  id: string;
  title: string;
  fileUrl: string;
};

/**
 * Resolves catalog metadata server-side. Never trusts client-supplied URLs.
 */
export async function resolveCatalogForDownload(
  catalogId: string,
  catalogSlug?: string
): Promise<ResolvedCatalog | null> {
  const supabase = getSupabaseServer() ?? getSupabaseFormsClient();

  if (supabase && isValidUuid(catalogId)) {
    const { data, error } = await supabase
      .from('catalogs')
      .select('id, title, file_url')
      .eq('id', catalogId)
      .eq('is_active', true)
      .maybeSingle();

    if (!error && data?.file_url && isAllowedCatalogPath(data.file_url)) {
      return { id: data.id, title: data.title, fileUrl: data.file_url };
    }
  }

  const fallback = DEFAULT_CATALOGS.find(
    (catalog) => catalog.id === catalogId || catalog.slug === catalogSlug
  );

  if (fallback && isAllowedCatalogPath(fallback.file_url)) {
    return {
      id: fallback.id,
      title: fallback.title,
      fileUrl: fallback.file_url,
    };
  }

  return null;
}
