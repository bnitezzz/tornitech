import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from './config';

let serverClient: SupabaseClient | null = null;

/** Server-side Supabase client with service role. Returns null if not configured. */
export function getSupabaseServer(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!serverClient) {
    serverClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return serverClient;
}
