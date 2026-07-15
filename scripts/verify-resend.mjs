#!/usr/bin/env node
/**
 * Verifica conectividad con Resend (sin enviar email real).
 * Uso: npm run verify:resend
 */
import { loadEnv, isPlaceholder } from './lib/load-env.mjs';

const env = loadEnv();
const apiKey = env.RESEND_API_KEY?.trim();
const emailFrom = env.EMAIL_FROM?.trim();
const emailTo = env.EMAIL_TO?.trim();

if (!apiKey || isPlaceholder(apiKey)) {
  console.error('✗ RESEND_API_KEY: ausente o placeholder');
  console.error('  Configure la clave real en Netlify para habilitar notificaciones por email.');
  process.exit(1);
}

if (!emailFrom) {
  console.warn('⚠ EMAIL_FROM: no definido (se usará fallback en runtime)');
} else {
  console.log(`✓ EMAIL_FROM: ${emailFrom}`);
}

if (!emailTo) {
  console.warn('⚠ EMAIL_TO: no definido (se usará contact_email de site_config)');
} else {
  console.log(`✓ EMAIL_TO: ${emailTo}`);
}

try {
  const response = await fetch('https://api.resend.com/domains', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401 || response.status === 403) {
    console.error(`✗ Resend API: clave inválida (${response.status})`);
    process.exit(1);
  }

  if (!response.ok) {
    const body = await response.text();
    console.error(`✗ Resend API error (${response.status}):`, body.slice(0, 200));
    process.exit(1);
  }

  const domains = await response.json();
  const count = Array.isArray(domains?.data) ? domains.data.length : 0;
  console.log(`✓ Resend API: conexión OK (${count} dominio(s) registrado(s))`);

  if (count === 0) {
    console.warn('⚠ Sin dominios verificados en Resend — los emails pueden ir a spam.');
  }
} catch (error) {
  console.error('✗ No se pudo contactar Resend:', error instanceof Error ? error.message : error);
  process.exit(1);
}

console.log('\nResend configurado correctamente.');
process.exit(0);
