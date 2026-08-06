import { SITE_CONFIG } from '@/constants/site';
import { getSiteContactConfig } from '@/lib/site-config';
import { escapeHtml, sanitizeEmailHeader } from '@/lib/security';

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

type ParsedEmailAddress = {
  email: string;
  name?: string;
};

function getEmailConfig() {
  return {
    apiKey: process.env.SENDGRID_API_KEY?.trim(),
    from: process.env.EMAIL_FROM?.trim() || `${SITE_CONFIG.name} <noreply@${new URL(SITE_CONFIG.url).hostname}>`,
  };
}

/** Parses `"Name" <email@domain.com>` or plain `email@domain.com`. */
export function parseEmailAddress(value: string): ParsedEmailAddress {
  const trimmed = value.trim();
  const bracketMatch = trimmed.match(/^(.+?)\s*<([^>]+)>$/);

  if (bracketMatch) {
    const name = bracketMatch[1].trim().replace(/^["']|["']$/g, '');
    return { name: name || undefined, email: bracketMatch[2].trim() };
  }

  return { email: trimmed };
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

/** Sends an email via SendGrid v3 API. Skips silently when SENDGRID_API_KEY is not set. */
const SENDGRID_TIMEOUT_MS = 10_000;

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const { apiKey, from } = getEmailConfig();
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[email] Skipped (SENDGRID_API_KEY not set):', sanitizeEmailHeader(payload.subject));
    }
    return false;
  }

  const fromAddress = parseEmailAddress(from);
  const recipients = Array.isArray(payload.to) ? payload.to : [payload.to];

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(SENDGRID_TIMEOUT_MS),
      body: JSON.stringify({
        personalizations: [
          {
            to: recipients.map((email) => ({ email })),
          },
        ],
        from: {
          email: fromAddress.email,
          ...(fromAddress.name ? { name: fromAddress.name } : {}),
        },
        ...(payload.replyTo
          ? { reply_to: { email: payload.replyTo } }
          : {}),
        subject: sanitizeEmailHeader(payload.subject),
        content: [{ type: 'text/html', value: payload.html }],
      }),
    });

    if (!response.ok) {
      console.error('[email] SendGrid error:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === 'TimeoutError' || error.name === 'AbortError');
    console.error(timedOut ? '[email] SendGrid timed out' : '[email] Failed to send');
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
