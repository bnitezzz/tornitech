import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import { getSupabasePublicKey, getSupabaseUrl } from '@/lib/supabase/config';

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
  const store = cookieStore ?? cookies();
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublicKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and publishable key are required.');
  }

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set(name, value, options);
          });
        } catch {
          // Called from a Server Component; middleware refreshes sessions.
        }
      },
    },
  });
}
