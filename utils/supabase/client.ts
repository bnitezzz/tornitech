import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';
import { getSupabasePublicKey, getSupabaseUrl } from '@/lib/supabase/config';

export function createClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and publishable key are required.');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
