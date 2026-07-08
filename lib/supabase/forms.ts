import { getSupabaseServer } from '@/lib/supabase/server';
import { isSupabaseConfigured } from './config';

export class FormsBackendError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'FormsBackendError';
  }
}

/** Ensures Supabase service role is available for form submissions. */
export function getFormsBackend() {
  if (!isSupabaseConfigured()) {
    throw new FormsBackendError(
      'Supabase no está configurado. Revise NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    throw new FormsBackendError('No se pudo inicializar el cliente de Supabase.');
  }

  return supabase;
}
