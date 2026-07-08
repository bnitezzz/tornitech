import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { isSupabaseConfigured } from './config';

let serverClient: SupabaseClient<Database> | null = null;

/** Server-side Supabase client with service role. Returns null if not configured. */
export function getSupabaseServer(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null;

  if (!serverClient) {
    serverClient = createClient<Database>(
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
