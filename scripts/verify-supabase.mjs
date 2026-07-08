#!/usr/bin/env node
/**
 * Verifica conexión a Supabase y permisos de escritura para formularios.
 * Uso: npm run verify:supabase
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env.local');

function loadEnv(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
  );
}

const env = loadEnv(envPath);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const missing = [
  !url && 'NEXT_PUBLIC_SUPABASE_URL',
  !serviceKey && 'SUPABASE_SERVICE_ROLE_KEY',
  !anonKey && 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
].filter(Boolean);

if (missing.length) {
  console.error('Faltan variables en .env.local:', missing.join(', '));
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tables = ['leads', 'contact_submissions', 'catalog_downloads', 'newsletter_subscribers', 'catalogs', 'products'];
let ok = true;

for (const table of tables) {
  const { error } = await admin.from(table).select('id', { head: true, count: 'exact' });
  if (error) {
    console.error(`✗ ${table}: ${error.message}`);
    ok = false;
  } else {
    console.log(`✓ ${table}: lectura OK`);
  }
}

const probeEmail = `verify-${Date.now()}@tornitech.local`;
const { data: lead, error: leadError } = await admin
  .from('leads')
  .insert({
    name: 'Verificación',
    email: probeEmail,
    company: 'Tornitech QA',
    source: 'contact_form',
  })
  .select('id')
  .single();

if (leadError || !lead?.id) {
  console.error('✗ Escritura leads (service role):', leadError?.message ?? 'sin id');
  ok = false;
} else {
  console.log('✓ Escritura leads (service role): OK');

  const { error: contactError } = await admin.from('contact_submissions').insert({
    name: 'Verificación',
    email: probeEmail,
    message: 'Mensaje de verificación automática del sistema.',
    status: 'new',
    lead_id: lead.id,
  });

  if (contactError) {
    console.error('✗ Escritura contact_submissions:', contactError.message);
    ok = false;
  } else {
    console.log('✓ Escritura contact_submissions: OK');
  }

  await admin.from('contact_submissions').delete().eq('email', probeEmail);
  await admin.from('leads').delete().eq('id', lead.id);
}

const { data: catalog } = await admin.from('catalogs').select('id, slug, title').limit(1).maybeSingle();
if (!catalog) {
  console.warn('⚠ No hay catálogos en la base de datos. Ejecute el seed en supabase/schema.sql.');
} else {
  console.log(`✓ Catálogo disponible: ${catalog.title} (${catalog.slug})`);
}

const anon = createClient(url, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: anonCatalogs, error: anonCatalogError } = await anon
  .from('catalogs')
  .select('id, slug')
  .eq('is_active', true);

if (anonCatalogError) {
  console.error('✗ Lectura catalogs (anon / formularios en cliente):', anonCatalogError.message);
  ok = false;
} else {
  console.log(`✓ Lectura catalogs (anon): ${anonCatalogs?.length ?? 0} catálogo(s)`);
}

const { error: anonLeadError } = await anon.from('leads').insert({
  name: 'Test',
  email: 'anon-test@tornitech.local',
  company: 'Test',
  source: 'contact_form',
});

if (anonLeadError) {
  console.log('ℹ Escritura leads (anon): bloqueada por RLS (esperado; los formularios usan server actions)');
} else {
  console.warn('⚠ Escritura leads (anon): permitida — los formularios deben usar solo server actions');
}

const { error: rpcError } = await admin.rpc('increment_download_count', {
  catalog_id: catalog?.id,
});

if (catalog && rpcError) {
  console.error('✗ RPC increment_download_count:', rpcError.message);
  ok = false;
} else if (catalog) {
  console.log('✓ RPC increment_download_count: OK');
}

console.log(ok ? '\nSupabase listo para formularios.' : '\nHay problemas que corregir antes de producción.');
process.exit(ok ? 0 : 1);
