#!/usr/bin/env node
/**
 * Actualiza catálogos PDF en Supabase producción.
 * Uso: npm run update:catalogs
 */
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv } from './lib/load-env.mjs';

const CATALOGS = [
  {
    title: 'Catálogo general',
    slug: 'catalogo-general',
    description:
      'Referencia completa de tornillería y fijación industrial — Volumen 1, 2025.',
    file_url: '/catalogs/catalogo-general-vol1-2025.pdf',
    version: '2025',
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    title: 'Catálogo Automotriz',
    slug: 'catalogo-automotriz',
    description:
      'Tornillería y elementos de fijación para el sector automotriz — Volumen 1, 2025.',
    file_url: '/catalogs/catalogo-automotriz-vol1-2025.pdf',
    version: '2025',
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
];

const LEGACY_SLUGS = ['catalogo-tornilleria-general', 'catalogo-fijacion-estructural'];

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Faltan credenciales Supabase en .env.local');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws },
});

let ok = true;

for (const catalog of CATALOGS) {
  const { error } = await admin.from('catalogs').upsert(catalog, { onConflict: 'slug' });
  if (error) {
    console.error(`✗ ${catalog.slug}: ${error.message}`);
    ok = false;
  } else {
    console.log(`✓ ${catalog.slug}: actualizado (${catalog.title})`);
  }
}

const { error: deactivateError } = await admin
  .from('catalogs')
  .update({ is_active: false })
  .in('slug', LEGACY_SLUGS);

if (deactivateError) {
  console.warn('⚠ No se pudieron desactivar catálogos legacy:', deactivateError.message);
} else {
  console.log('✓ Catálogos legacy desactivados');
}

console.log(ok ? '\nCatálogos actualizados en Supabase.' : '\nHubo errores al actualizar catálogos.');
process.exit(ok ? 0 : 1);
