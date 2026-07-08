import { getSupabaseFormsClient } from '@/lib/supabase/server';
import { isFormsBackendConfigured } from './config';

export class FormsBackendError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'FormsBackendError';
  }
}

/** Ensures Supabase is available for form submissions (service role or anon). */
export function getFormsBackend() {
  if (!isFormsBackendConfigured()) {
    throw new FormsBackendError(
      'Supabase no está configurado. Revise NEXT_PUBLIC_SUPABASE_URL y las claves de Supabase.'
    );
  }

  const supabase = getSupabaseFormsClient();
  if (!supabase) {
    throw new FormsBackendError('No se pudo inicializar el cliente de Supabase.');
  }

  return supabase;
}
