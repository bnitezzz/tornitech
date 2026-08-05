#!/usr/bin/env node
/**
 * Verifica conectividad con SendGrid (sin enviar email real).
 * Uso: npm run verify:sendgrid
 */
import { loadEnv, isPlaceholder } from './lib/load-env.mjs';

const env = loadEnv();
const apiKey = env.SENDGRID_API_KEY?.trim();
const emailFrom = env.EMAIL_FROM?.trim();
const emailTo = env.EMAIL_TO?.trim();

if (!apiKey || isPlaceholder(apiKey)) {
  console.error('✗ SENDGRID_API_KEY: ausente o placeholder');
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
  const response = await fetch('https://api.sendgrid.com/v3/user/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401 || response.status === 403) {
    console.error(`✗ SendGrid API: clave inválida (${response.status})`);
    process.exit(1);
  }

  if (!response.ok) {
    const body = await response.text();
    console.error(`✗ SendGrid API error (${response.status}):`, body.slice(0, 200));
    process.exit(1);
  }

  const profile = await response.json();
  console.log(`✓ SendGrid API: conexión OK (cuenta: ${profile.username || profile.email || 'verificada'})`);
  console.log('ℹ Verifique el dominio en SendGrid → Settings → Sender Authentication para producción.');
} catch (error) {
  console.error('✗ No se pudo contactar SendGrid:', error instanceof Error ? error.message : error);
  process.exit(1);
}

console.log('\nSendGrid configurado correctamente.');
process.exit(0);
