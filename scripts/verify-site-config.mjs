#!/usr/bin/env node
/**
 * Verifica que site_config en Supabase tenga los datos de contacto correctos.
 * Uso: npm run verify:site-config
 */
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv } from './lib/load-env.mjs';

const EXPECTED = {
  whatsapp_number: '584242818062',
  contact_email: 'info@tornitech.com',
  phone: '0212-2398501 / 0212-2358456',
  address: 'Av. tercera transversal de Montecristo entre 1era y 2da Av., Caracas 1071',
  business_hours: 'Lunes a Viernes 8:00am – 5:00pm · Sábado 9:00am – 2:00pm',
};

const EXPECTED_SOCIAL = {
  instagram: 'https://www.instagram.com/ccstornitech/',
};

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws },
});

const { data, error } = await admin
  .from('site_config')
  .select('key, value, value_json')
  .in('key', [...Object.keys(EXPECTED), 'social_links']);

if (error) {
  console.error('✗ No se pudo leer site_config:', error.message);
  process.exit(1);
}

let ok = true;

for (const [key, expected] of Object.entries(EXPECTED)) {
  const row = data.find((item) => item.key === key);
  const actual = row?.value?.trim() ?? '';
  if (actual === expected) {
    console.log(`✓ ${key}: OK`);
  } else {
    console.error(`✗ ${key}: esperado "${expected}", actual "${actual || '(vacío)'}"`);
    ok = false;
  }
}

const socialRow = data.find((item) => item.key === 'social_links');
let social = socialRow?.value_json;
if (!social && socialRow?.value) {
  try {
    social = JSON.parse(socialRow.value);
  } catch {
    social = null;
  }
}

const instagram =
  typeof social?.instagram === 'string' ? social.instagram.trim() : '';

if (instagram === EXPECTED_SOCIAL.instagram) {
  console.log('✓ social_links.instagram: OK');
} else {
  console.error(
    `✗ social_links.instagram: esperado "${EXPECTED_SOCIAL.instagram}", actual "${instagram || '(vacío)'}"`
  );
  ok = false;
}

console.log(ok ? '\nsite_config alineado con producción.' : '\nEjecute: npm run update:site-config');
process.exit(ok ? 0 : 1);
