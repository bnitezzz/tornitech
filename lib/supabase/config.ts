/** Supabase project URL from env. */
export function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
}

/** Publishable key (sb_publishable_*) or legacy anon JWT. */
export function getSupabasePublicKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

/** Returns true when Supabase URL and service role key are configured. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

/** Returns true when form submissions can reach Supabase (service role required). */
export function isFormsBackendConfigured(): boolean {
  return Boolean(getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

/** Returns true when the public Supabase client can be initialized. */
export function isSupabaseClientConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublicKey());
}

/** Validates UUID v4 format for Supabase foreign keys. */
export function isValidUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}
