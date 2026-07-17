import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getSupabaseUrl, isSupabaseConfigured } from './config';

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
 * Server-side client for form writes.
 * Requires service role — anon INSERT policies were removed for security.
 */
export function getSupabaseFormsClient(): SupabaseClient<Database> | null {
  const url = getSupabaseUrl();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    if (process.env.NODE_ENV === 'development' && url && !serviceKey) {
      console.warn(
        '[supabase] SUPABASE_SERVICE_ROLE_KEY requerida para formularios (INSERT público deshabilitado).'
      );
    }
    return null;
  }

  if (!formsClient) {
    formsClient = createClient<Database>(url, serviceKey, serverClientOptions);
  }

  return formsClient;
}
