import { getSupabaseServer } from '@/lib/supabase/server';
import type { Insertable } from '@/types/database';

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  company: string;
  city?: string;
  sector?: string;
  source: 'contact_form' | 'catalog_download' | 'quote_request';
  sourceId?: string | null;
  acceptsMarketing?: boolean;
  notes?: string;
};

/** Persists a lead in Supabase. Returns lead id or null when DB is unavailable. */
export async function createLead(input: LeadInput): Promise<string | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const record: Insertable<'leads'> = {
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company,
    city: input.city || null,
    sector: input.sector || null,
    source: input.source,
    source_id: input.sourceId || null,
    accepts_marketing: input.acceptsMarketing ?? false,
    notes: input.notes || null,
  };

  const { data, error } = await supabase.from('leads').insert(record).select('id').single();

  if (error) {
    console.error('[leads] Insert error:', error);
    return null;
  }

  return data.id;
}

/** Registers email for marketing when the user opts in. */
export async function subscribeToMarketing(data: {
  email: string;
  name?: string;
  company?: string;
}): Promise<void> {
  if (!data.email) return;

  const supabase = getSupabaseServer();
  if (!supabase) return;

  const subscriber: Insertable<'newsletter_subscribers'> = {
    email: data.email,
    name: data.name || null,
    company: data.company || null,
    is_active: true,
    unsubscribed_at: null,
  };

  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert(subscriber, { onConflict: 'email' });

  if (error) {
    console.error('[newsletter] Upsert error:', error);
  }
}
