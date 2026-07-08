'use server';

import { revalidatePath } from 'next/cache';
import {
  buildCatalogDownloadNotificationEmail,
  buildContactConfirmationEmail,
  buildContactNotificationEmail,
  sendEmail,
} from '@/lib/email';
import { createLead, subscribeToMarketing } from '@/lib/leads';
import { getSupabaseServer } from '@/lib/supabase/server';
import { isValidUuid } from '@/lib/supabase/config';
import type { Insertable } from '@/types/database';
import type { ActionResult, CatalogDownloadResult } from '@/types/actions';
import type { CatalogDownloadFormData, ContactFormData } from '@/types';

export async function submitContact(
  data: ContactFormData
): Promise<ActionResult> {
  try {
    const supabase = getSupabaseServer();
    const acceptsMarketing = data.accepts_marketing ?? false;
    const company = data.company?.trim() || 'No especificada';

    if (supabase) {
      const submission: Insertable<'contact_submissions'> = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject || null,
        message: data.message,
        status: 'new',
      };

      const { error: contactError } = await supabase
        .from('contact_submissions')
        .insert(submission);

      if (contactError) throw contactError;
    }

    await createLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company,
      source: 'contact_form',
      acceptsMarketing,
      notes: data.subject ? `Asunto: ${data.subject}` : undefined,
    });

    if (acceptsMarketing) {
      await subscribeToMarketing({
        email: data.email,
        name: data.name,
        company: data.company,
      });
    }

    await Promise.all([
      sendEmail(
        buildContactNotificationEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: data.subject,
          message: data.message,
          acceptsMarketing,
        })
      ),
      sendEmail(buildContactConfirmationEmail({ name: data.name, email: data.email })),
    ]);

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
    };
  } catch (error) {
    console.error('[submitContact]', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intente de nuevo.',
    };
  }
}

export async function submitCatalogDownload(
  data: CatalogDownloadFormData & {
    catalogId: string;
    catalogTitle: string;
    catalogFileUrl: string;
  }
): Promise<ActionResult<CatalogDownloadResult>> {
  try {
    const supabase = getSupabaseServer();
    const acceptsMarketing = data.accepts_marketing ?? false;
    const downloadUrl = data.catalogFileUrl;

    const leadId = await createLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      city: data.city,
      sector: data.sector,
      source: 'catalog_download',
      sourceId: isValidUuid(data.catalogId) ? data.catalogId : null,
      acceptsMarketing,
      notes: `Catálogo: ${data.catalogTitle}`,
    });

    if (acceptsMarketing) {
      await subscribeToMarketing({
        email: data.email,
        name: data.name,
        company: data.company,
      });
    }

    if (supabase && isValidUuid(data.catalogId)) {
      const downloadRecord: Insertable<'catalog_downloads'> = {
        catalog_id: data.catalogId,
        lead_id: leadId,
        email: data.email,
      };

      const { error: downloadError } = await supabase
        .from('catalog_downloads')
        .insert(downloadRecord);

      if (downloadError) {
        console.error('[submitCatalogDownload] catalog_downloads:', downloadError);
      }

      const { error: updateError } = await supabase.rpc('increment_download_count', {
        catalog_id: data.catalogId,
      } as { catalog_id: string });

      if (updateError) {
        console.error('[submitCatalogDownload] increment_download_count:', updateError);
      }
    }

    await sendEmail(
      buildCatalogDownloadNotificationEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        city: data.city,
        sector: data.sector,
        catalogTitle: data.catalogTitle,
        acceptsMarketing,
      })
    );

    revalidatePath('/');

    return {
      success: true,
      message: 'Descarga registrada. El catálogo comenzará a descargar.',
      data: { downloadUrl },
    };
  } catch (error) {
    console.error('[submitCatalogDownload]', error);
    return {
      success: false,
      message: 'Error al registrar la descarga. Por favor intente de nuevo.',
    };
  }
}
