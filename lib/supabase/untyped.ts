import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase/client';
import { getSupabaseReader } from '@/services/supabase';

/** Untyped reader for CMS tables pending type regeneration. */
export function getUntypedReader(): SupabaseClient | null {
  return getSupabaseReader() as SupabaseClient | null;
}

export function getUntypedBrowser(): SupabaseClient | null {
  return getSupabaseClient() as SupabaseClient | null;
}
