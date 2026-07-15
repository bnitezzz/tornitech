#!/usr/bin/env node
/**
 * Verifica si la migración 005 (rate limiting) está aplicada.
 * Si falta, muestra instrucciones para aplicarla en Supabase SQL Editor.
 * Uso: npm run apply:rate-limit-migration
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv, PROJECT_ROOT } from './lib/load-env.mjs';

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

const { data, error } = await admin.rpc('check_rate_limit', {
  p_bucket_key: 'migration-check',
  p_limit: 10,
  p_window_seconds: 60,
});

if (!error && data?.allowed !== undefined) {
  console.log('✓ Migración 005 ya aplicada (RPC check_rate_limit disponible).');
  await admin.from('rate_limit_buckets').delete().eq('bucket_key', 'migration-check');
  process.exit(0);
}

const sqlPath = resolve(
  PROJECT_ROOT,
  'supabase/migrations/20260715160000_005_rate_limits.sql'
);

console.error('✗ Migración 005 no aplicada en Supabase producción.');
console.error('\nPasos:');
console.error('1. Abra Supabase Dashboard → SQL Editor');
console.error('2. Ejecute el archivo completo:');
console.error(`   ${sqlPath}`);
console.error('3. Vuelva a ejecutar: npm run verify:forms\n');

if (error) {
  console.error('Detalle:', error.message);
}

process.exit(1);
