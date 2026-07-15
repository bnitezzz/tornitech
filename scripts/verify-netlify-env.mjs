#!/usr/bin/env node
/**
 * Verifica variables requeridas para producción (paridad Netlify ↔ local).
 * Uso: npm run verify:env
 */
import { loadEnv, maskSecret, isPlaceholder } from './lib/load-env.mjs';

const REQUIRED = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    scope: 'build+runtime',
    validate: (v) => v.startsWith('https://') && v.includes('supabase.co'),
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    alt: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    scope: 'build+runtime',
    validate: (v) => v.startsWith('sb_') || v.startsWith('eyJ'),
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    scope: 'runtime (servidor)',
    secret: true,
    validate: (v) => v.startsWith('sb_') || v.startsWith('eyJ'),
  },
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    scope: 'build+runtime',
    validate: (v) => v.startsWith('https://'),
  },
  {
    key: 'NEXT_PUBLIC_WHATSAPP',
    scope: 'build+runtime',
    validate: (v) => /^\+?58\d{10,11}$/.test(v.replace(/[^0-9+]/g, '')),
  },
  {
    key: 'EMAIL_TO',
    scope: 'runtime (servidor)',
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  },
];

const RECOMMENDED = [
  {
    key: 'RESEND_API_KEY',
    scope: 'runtime (servidor)',
    secret: true,
    validate: (v) => v.startsWith('re_'),
  },
  {
    key: 'EMAIL_FROM',
    scope: 'runtime (servidor)',
    validate: (v) => v.includes('@'),
  },
  {
    key: 'UPSTASH_REDIS_REST_URL',
    scope: 'runtime (servidor)',
    validate: (v) => v.startsWith('https://'),
  },
  {
    key: 'UPSTASH_REDIS_REST_TOKEN',
    scope: 'runtime (servidor)',
    secret: true,
    validate: (v) => v.length >= 16,
  },
];

const env = loadEnv();
let ok = true;
let warnings = 0;

function checkEntry(entry, required) {
  const value = env[entry.key] || (entry.alt ? env[entry.alt] : undefined);
  const label = entry.alt && !env[entry.key] ? `${entry.key} (vía ${entry.alt})` : entry.key;

  if (!value) {
    console.error(`✗ ${label}: FALTA (${entry.scope})`);
    if (required) ok = false;
    else warnings += 1;
    return;
  }

  if (isPlaceholder(value)) {
    console.error(`✗ ${label}: PLACEHOLDER — configurar en Netlify (${entry.scope})`);
    if (required) ok = false;
    else warnings += 1;
    return;
  }

  if (entry.validate && !entry.validate(value)) {
    console.error(`✗ ${label}: formato inválido (${entry.scope})`);
    if (required) ok = false;
    else warnings += 1;
    return;
  }

  const display = entry.secret ? maskSecret(value) : value;
  console.log(`✓ ${label}: OK (${display})`);
}

console.log('── Variables requeridas (Netlify production) ──');
for (const entry of REQUIRED) checkEntry(entry, true);

console.log('\n── Variables recomendadas ──');
for (const entry of RECOMMENDED) checkEntry(entry, false);

const hasUpstash = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN;
if (!hasUpstash) {
  console.warn(
    '\n⚠ Upstash no configurado. Rate limiting usará fallback Supabase (migración 005).'
  );
  warnings += 1;
}

if (!env.RESEND_API_KEY || isPlaceholder(env.RESEND_API_KEY)) {
  console.warn('\n⚠ RESEND_API_KEY ausente: formularios guardan en BD pero no envían email.');
  warnings += 1;
}

console.log(
  ok
    ? `\nVariables críticas OK.${warnings ? ` (${warnings} advertencia(s))` : ''}`
    : '\nFaltan variables críticas. Revise Netlify → Site settings → Environment variables.'
);
process.exit(ok ? 0 : 1);
