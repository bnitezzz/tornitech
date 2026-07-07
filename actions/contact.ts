'use server';

import { supabaseServer } from '@/lib/supabase/server';
import type { ContactFormData, CatalogDownloadFormData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function submitContact(data: ContactFormData) {
  try {
    const { error } = await supabaseServer
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject || null,
        message: data.message,
        status: 'new',
      });

    if (error) throw error;

    return { success: true, message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'Error al enviar el mensaje. Por favor intente de nuevo.' };
  }
}

export async function submitCatalogDownload(data: CatalogDownloadFormData & { catalogId: string; catalogTitle: string }) {
  try {
    // Create lead
    const { data: lead, error: leadError } = await supabaseServer
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company,
        city: data.city || null,
        sector: data.sector || null,
        source: 'catalog_download',
        source_id: data.catalogId,
        accepts_marketing: data.accepts_marketing || false,
      })
      .select('id')
      .single();

    if (leadError) throw leadError;

    // Track download
    const { error: downloadError } = await supabaseServer
      .from('catalog_downloads')
      .insert({
        catalog_id: data.catalogId,
        lead_id: lead.id,
        email: data.email,
      });

    if (downloadError) throw downloadError;

    // Increment download count
    const { error: updateError } = await supabaseServer.rpc('increment_download_count', {
      catalog_id: data.catalogId,
    });

    // Don't fail if increment fails, just log
    if (updateError) {
      console.error('Error incrementing download count:', updateError);
    }

    revalidatePath('/');
    return { success: true, message: 'Descarga registrada. El catálogo comenzará a descargar.' };
  } catch (error) {
    console.error('Error submitting catalog download:', error);
    return { success: false, message: 'Error al registrar la descarga. Por favor intente de nuevo.' };
  }
}

