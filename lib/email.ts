import { SITE_CONFIG } from '@/constants/site';
import { getSiteContactConfig } from '@/lib/site-config';
import { escapeHtml, sanitizeEmailHeader } from '@/lib/security';

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim(),
    from: process.env.EMAIL_FROM?.trim() || `${SITE_CONFIG.name} <noreply@${new URL(SITE_CONFIG.url).hostname}>`,
  };
}

/** Team inbox: EMAIL_TO env, else contact_email from site_config, else constants. */
export async function getTeamInbox(): Promise<string> {
  const fromEnv = process.env.EMAIL_TO?.trim();
  if (fromEnv) return fromEnv;

  try {
    const contact = await getSiteContactConfig();
    return contact.email;
  } catch {
    return SITE_CONFIG.email;
  }
}

/** Sends an email via Resend HTTP API. Skips silently when RESEND_API_KEY is not set. */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const { apiKey, from } = getEmailConfig();
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[email] Skipped (RESEND_API_KEY not set):', sanitizeEmailHeader(payload.subject));
    }
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: sanitizeEmailHeader(payload.subject),
        html: payload.html,
        reply_to: payload.replyTo,
      }),
    });

    if (!response.ok) {
      console.error('[email] Resend error:', response.status);
      return false;
    }

    return true;
  } catch {
    console.error('[email] Failed to send');
    return false;
  }
}

export async function buildContactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  acceptsMarketing: boolean;
}): Promise<EmailPayload> {
  return {
    to: await getTeamInbox(),
    subject: sanitizeEmailHeader(`[Contacto] ${data.subject || 'Nueva consulta'} — ${data.name}`),
    replyTo: data.email,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      ${data.company ? `<p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>` : ''}
      ${data.subject ? `<p><strong>Asunto:</strong> ${escapeHtml(data.subject)}</p>` : ''}
      <p><strong>Acepta promociones:</strong> ${data.acceptsMarketing ? 'Sí' : 'No'}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
    `,
  };
}

export function buildContactConfirmationEmail(data: {
  name: string;
  email: string;
}): EmailPayload {
  return {
    to: data.email,
    subject: sanitizeEmailHeader(`Recibimos su mensaje — ${SITE_CONFIG.name}`),
    html: `
      <p>Estimado/a ${escapeHtml(data.name)},</p>
      <p>Hemos recibido su consulta. Nuestro equipo la revisará y responderá en horario comercial.</p>
      <p>${escapeHtml(SITE_CONFIG.responseTime)}</p>
      <p>Atentamente,<br />${escapeHtml(SITE_CONFIG.name)}</p>
    `,
  };
}

export async function buildCatalogDownloadNotificationEmail(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  city?: string;
  sector?: string;
  catalogTitle: string;
  acceptsMarketing: boolean;
}): Promise<EmailPayload> {
  return {
    to: await getTeamInbox(),
    subject: sanitizeEmailHeader(`[Catálogo] Descarga — ${data.catalogTitle} — ${data.name}`),
    replyTo: data.email,
    html: `
      <h2>Descarga de catálogo registrada</h2>
      <p><strong>Catálogo:</strong> ${escapeHtml(data.catalogTitle)}</p>
      <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>
      ${data.phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      ${data.city ? `<p><strong>Ciudad:</strong> ${escapeHtml(data.city)}</p>` : ''}
      ${data.sector ? `<p><strong>Sector:</strong> ${escapeHtml(data.sector)}</p>` : ''}
      <p><strong>Acepta promociones:</strong> ${data.acceptsMarketing ? 'Sí' : 'No'}</p>
    `,
  };
}
