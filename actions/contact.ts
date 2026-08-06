'use server';

import { revalidatePath } from 'next/cache';
import {
  buildCatalogDownloadNotificationEmail,
  buildContactConfirmationEmail,
  buildContactNotificationEmail,
  sendEmail,
} from '@/lib/email';
import { resolveCatalogForDownload } from '@/lib/catalogs';
import { createCatalogDownloadToken } from '@/lib/catalog-download-token';
import { createLead, subscribeToMarketing, FormsBackendError } from '@/lib/leads';
import { getFormsBackend } from '@/lib/supabase/forms';
import { getSupabaseServer } from '@/lib/supabase/server';
import { isValidUuid } from '@/lib/supabase/config';
import { enforceFormRateLimit } from '@/lib/rate-limit';
import { toSafeErrorMessage } from '@/lib/security';
import { parseCatalogDownloadForm, parseContactForm } from '@/lib/validation';
import type { Insertable } from '@/types/database';
import type { ActionResult, CatalogDownloadResult } from '@/types/actions';
import type { CatalogDownloadFormData, ContactFormData } from '@/types';

function persistenceErrorMessage(error: unknown): string {
  if (error instanceof FormsBackendError) {
    console.error('[forms]', error.message);
    return 'No pudimos guardar su solicitud en este momento. Intente de nuevo o contáctenos por teléfono.';
  }
  console.error('[forms]', toSafeErrorMessage(error));
  return 'Error al procesar su solicitud. Por favor intente de nuevo.';
}

export async function submitContact(
  data: ContactFormData
): Promise<ActionResult> {
  const parsed = parseContactForm(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Datos del formulario inválidos. Revise los campos e intente de nuevo.',
    };
  }

  const form = parsed.data;

  // Honeypot filled → pretend success without writing (bots).
  if (form.website) {
    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
    };
  }

  const rateLimit = await enforceFormRateLimit({
    scope: 'contact',
    email: form.email,
  });

  if (!rateLimit.allowed) {
    return {
      success: false,
      message: rateLimit.message ?? 'Demasiadas solicitudes. Intente más tarde.',
    };
  }

  try {
    const supabase = getFormsBackend();
    const acceptsMarketing = form.accepts_marketing ?? false;
    const company = form.company?.trim() || 'No especificada';

    const leadId = await createLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company,
      source: 'contact_form',
      acceptsMarketing,
      notes: form.subject ? `Asunto: ${form.subject}` : undefined,
    });

    const submission: Insertable<'contact_submissions'> = {
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      subject: form.subject || null,
      message: form.message,
      status: 'new',
      lead_id: leadId,
    };

    const { error: contactError } = await supabase
      .from('contact_submissions')
      .insert(submission);

    if (contactError) {
      throw new FormsBackendError('No se pudo guardar el mensaje de contacto.', contactError);
    }

    if (acceptsMarketing) {
      await subscribeToMarketing({
        email: form.email,
        name: form.name,
        company: form.company,
      });
    }

    const [notifyOk, confirmOk] = await Promise.all([
      sendEmail(
        await buildContactNotificationEmail({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
          acceptsMarketing,
        })
      ),
      sendEmail(buildContactConfirmationEmail({ name: form.name, email: form.email })),
    ]);

    if (!notifyOk || !confirmOk) {
      console.error('[submitContact] Email delivery incomplete', {
        notifyOk,
        confirmOk,
      });
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
    };
  } catch (error) {
    return {
      success: false,
      message: persistenceErrorMessage(error),
    };
  }
}

export async function submitCatalogDownload(
  data: CatalogDownloadFormData & {
    catalogId: string;
    catalogSlug?: string;
  }
): Promise<ActionResult<CatalogDownloadResult>> {
  const parsed = parseCatalogDownloadForm(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Datos del formulario inválidos. Revise los campos e intente de nuevo.',
    };
  }

  const form = parsed.data;

  // Honeypot filled → pretend success without issuing a download token.
  if (form.website) {
    return {
      success: true,
      message: 'Descarga registrada. El catálogo comenzará a descargar.',
    };
  }

  const rateLimit = await enforceFormRateLimit({
    scope: 'catalog',
    email: form.email,
  });

  if (!rateLimit.allowed) {
    return {
      success: false,
      message: rateLimit.message ?? 'Demasiadas solicitudes. Intente más tarde.',
    };
  }

  const catalog = await resolveCatalogForDownload(data.catalogId, data.catalogSlug);

  if (!catalog) {
    return {
      success: false,
      message: 'Catálogo no disponible. Por favor contacte a nuestro equipo comercial.',
    };
  }

  try {
    const supabase = getFormsBackend();
    const acceptsMarketing = form.accepts_marketing ?? false;

    const leadId = await createLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      city: form.city,
      sector: form.sector,
      source: 'catalog_download',
      sourceId: isValidUuid(catalog.id) ? catalog.id : null,
      acceptsMarketing,
      notes: `Catálogo: ${catalog.title}`,
    });

    if (acceptsMarketing) {
      await subscribeToMarketing({
        email: form.email,
        name: form.name,
        company: form.company,
      });
    }

    if (isValidUuid(catalog.id)) {
      const downloadRecord: Insertable<'catalog_downloads'> = {
        catalog_id: catalog.id,
        lead_id: leadId,
        email: form.email,
      };

      const { error: downloadError } = await supabase
        .from('catalog_downloads')
        .insert(downloadRecord);

      if (downloadError) {
        throw new FormsBackendError('No se pudo registrar la descarga del catálogo.', downloadError);
      }

      const adminClient = getSupabaseServer();
      if (adminClient) {
        const { error: updateError } = await adminClient.rpc('increment_download_count', {
          catalog_id: catalog.id,
        });

        if (updateError) {
          console.error('[submitCatalogDownload] increment_download_count:', updateError);
        }
      }
    }

    const emailOk = await sendEmail(
      await buildCatalogDownloadNotificationEmail({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        city: form.city,
        sector: form.sector,
        catalogTitle: catalog.title,
        acceptsMarketing,
      })
    );

    if (!emailOk) {
      console.error('[submitCatalogDownload] Team notification email failed');
    }

    revalidatePath('/');
    const downloadToken = createCatalogDownloadToken(catalog.id);

    return {
      success: true,
      message: 'Descarga registrada. El catálogo comenzará a descargar.',
      data: {
        downloadUrl: `/api/catalogs/download?token=${encodeURIComponent(
          downloadToken
        )}`,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: persistenceErrorMessage(error),
    };
  }
}
