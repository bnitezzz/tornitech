/**
 * Shared security helpers for XSS prevention, URL allowlisting, and safe logging.
 */

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Escape text for HTML email bodies / attributes. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Serialize JSON for embedding in <script type="application/ld+json">.
 * Prevents </script> breakout and U+2028/U+2029 line separators.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** Strip CR/LF and control chars from email subjects (header injection). */
export function sanitizeEmailHeader(value: string): string {
  return value.replace(CONTROL_CHARS, '').replace(/[\r\n]+/g, ' ').trim().slice(0, 200);
}

/** Only allow http(s) absolute URLs or same-origin paths. Blocks javascript:/data:. */
export function isSafeHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return !trimmed.includes('\\') && !trimmed.includes('\0');
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Returns the URL if safe, otherwise undefined (for conditional rendering). */
export function safeHttpUrl(value: string | null | undefined): string | undefined {
  return isSafeHttpUrl(value) ? value!.trim() : undefined;
}

/** Log-safe error message without dumping nested objects / PII payloads. */
export function toSafeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message.slice(0, 300);
  }
  if (typeof error === 'string') {
    return error.slice(0, 300);
  }
  return 'Unknown error';
}
