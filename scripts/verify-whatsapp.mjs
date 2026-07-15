#!/usr/bin/env node
/**
 * Verifica número de WhatsApp en env, constants y site_config.
 * Uso: npm run verify:whatsapp
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv, PROJECT_ROOT } from './lib/load-env.mjs';

const EXPECTED_DIGITS = '584242818062';

function normalizePhone(value) {
  return (value ?? '').replace(/[^0-9]/g, '');
}

function buildWaUrl(phone) {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent('Hola.')}`;
}

const env = loadEnv();
const envPhone = env.NEXT_PUBLIC_WHATSAPP;
let ok = true;

if (normalizePhone(envPhone) === EXPECTED_DIGITS) {
  console.log(`✓ NEXT_PUBLIC_WHATSAPP: ${envPhone}`);
} else {
  console.error(`✗ NEXT_PUBLIC_WHATSAPP: esperado ${EXPECTED_DIGITS}, actual ${envPhone || '(vacío)'}`);
  ok = false;
}

const siteConstants = readFileSync(resolve(PROJECT_ROOT, 'constants/site.ts'), 'utf8');
if (siteConstants.includes(`'+${EXPECTED_DIGITS}'`) || siteConstants.includes(`'${EXPECTED_DIGITS}'`)) {
  console.log('✓ constants/site.ts: número correcto');
} else {
  console.error('✗ constants/site.ts: número de WhatsApp no coincide');
  ok = false;
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (url && serviceKey) {
  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    realtime: { transport: ws },
  });

  const { data, error } = await admin
    .from('site_config')
    .select('value')
    .eq('key', 'whatsapp_number')
    .maybeSingle();

  if (error) {
    console.error('✗ site_config whatsapp_number:', error.message);
    ok = false;
  } else if (normalizePhone(data?.value) === EXPECTED_DIGITS) {
    console.log(`✓ site_config whatsapp_number: ${data.value}`);
  } else {
    console.error(
      `✗ site_config whatsapp_number: esperado ${EXPECTED_DIGITS}, actual ${data?.value || '(vacío)'}`
    );
    ok = false;
  }
}

const waUrl = buildWaUrl(envPhone || EXPECTED_DIGITS);
if (waUrl.startsWith(`https://wa.me/${EXPECTED_DIGITS}`)) {
  console.log(`✓ URL wa.me generada: ${waUrl.slice(0, 48)}...`);
} else {
  console.error('✗ URL wa.me incorrecta');
  ok = false;
}

console.log(ok ? '\nWhatsApp configurado correctamente.' : '\nRevise variables y site_config.');
process.exit(ok ? 0 : 1);
