#!/usr/bin/env node
/**
 * Actualiza site_config en Supabase con los datos oficiales de CCS Tornitech.
 * Uso: npm run update:site-config
 */
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv } from './lib/load-env.mjs';

const CONTACT_ROWS = [
  {
    key: 'whatsapp_number',
    value: '584242818062',
    description: 'Número de WhatsApp con código de país (sin +)',
    is_public: true,
  },
  {
    key: 'contact_email',
    value: 'info@tornitech.com',
    description: 'Correo principal de contacto',
    is_public: true,
  },
  {
    key: 'sales_email',
    value: 'info@tornitech.com',
    description: 'Correo del equipo comercial',
    is_public: false,
  },
  {
    key: 'phone',
    value: '0212-2398501 / 0212-2358456',
    description: 'Teléfonos de la empresa (separados por /)',
    is_public: true,
  },
  {
    key: 'address',
    value: 'Av. tercera transversal de Montecristo entre 1era y 2da Av., Caracas 1071',
    description: 'Dirección comercial',
    is_public: true,
  },
  {
    key: 'business_hours',
    value: 'Lunes a Viernes 8:00am – 5:00pm · Sábado 9:00am – 2:00pm',
    description: 'Horario de atención',
    is_public: true,
  },
  {
    key: 'site_url',
    value: 'https://ccstornitech.com',
    description: 'URL del sitio web',
    is_public: true,
  },
];

const SOCIAL_ROW = {
  key: 'social_links',
  value_json: { instagram: 'https://www.instagram.com/ccstornitech/' },
  description: 'Redes sociales (JSON: instagram facebook linkedin)',
  is_public: true,
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

let ok = true;

for (const row of CONTACT_ROWS) {
  const { error } = await admin.from('site_config').upsert(row, { onConflict: 'key' });
  if (error) {
    console.error(`✗ ${row.key}: ${error.message}`);
    ok = false;
  } else {
    console.log(`✓ ${row.key}: actualizado`);
  }
}

const { error: socialError } = await admin.from('site_config').upsert(SOCIAL_ROW, {
  onConflict: 'key',
});

if (socialError) {
  console.error(`✗ social_links: ${socialError.message}`);
  ok = false;
} else {
  console.log('✓ social_links: actualizado');
}

console.log(ok ? '\nsite_config actualizado en Supabase.' : '\nHubo errores al actualizar site_config.');
process.exit(ok ? 0 : 1);
