import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getSupabasePublicKey, getSupabaseUrl, isSupabaseConfigured } from './config';

let serverClient: SupabaseClient<Database> | null = null;
let formsClient: SupabaseClient<Database> | null = null;

const serverClientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
} as const;

/** Server-side Supabase client with service role. Returns null if not configured. */
export function getSupabaseServer(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null;

  if (!serverClient) {
    serverClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      serverClientOptions
    );
  }

  return serverClient;
}

/**
 * Server-side client for public form writes.
 * Prefers service role; falls back to anon key (RLS public_insert_* policies).
 */
export function getSupabaseFormsClient(): SupabaseClient<Database> | null {
  const url = getSupabaseUrl();
  if (!url) return null;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const publicKey = getSupabasePublicKey();
  const key = serviceKey || publicKey;

  if (!key) return null;

  if (!formsClient) {
    formsClient = createClient<Database>(url, key, serverClientOptions);

    if (!serviceKey && process.env.NODE_ENV === 'development') {
      console.warn(
        '[supabase] SUPABASE_SERVICE_ROLE_KEY no definida; formularios usan anon key con RLS.'
      );
    }
  }

  return formsClient;
}
