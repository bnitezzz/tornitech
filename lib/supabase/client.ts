import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { isSupabaseClientConfigured } from './config';

let browserClient: SupabaseClient<Database> | null = null;

/** Browser Supabase client. Returns null if env vars are missing. */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseClientConfigured()) return null;

  if (!browserClient) {
    browserClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return browserClient;
}
