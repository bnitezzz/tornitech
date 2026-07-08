import { createClient as createBrowserSupabaseClient } from '@/utils/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { isSupabaseClientConfigured } from './config';

let browserClient: SupabaseClient<Database> | null = null;

/** Browser Supabase client with cookie-based auth (SSR). Returns null if env vars are missing. */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!isSupabaseClientConfigured()) return null;

  if (!browserClient) {
    browserClient = createBrowserSupabaseClient();
  }

  return browserClient;
}
