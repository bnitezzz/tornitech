import { getSupabaseFormsClient, getSupabaseServer } from '@/lib/supabase/server';

/** Server-side Supabase reader: service role preferred, public key fallback. */
export function getSupabaseReader() {
  return getSupabaseServer() ?? getSupabaseFormsClient();
}
