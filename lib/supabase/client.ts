import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseClientConfigured } from './config';

let browserClient: SupabaseClient | null = null;

/** Browser Supabase client. Returns null if env vars are missing. */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseClientConfigured()) return null;

  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return browserClient;
}
