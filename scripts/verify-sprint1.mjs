#!/usr/bin/env node
/**
 * Orquestador Sprint 1 (P0) — ejecuta todas las verificaciones.
 * Uso: npm run verify:sprint1
 */
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const steps = [
  { name: 'Variables de entorno', script: 'verify-netlify-env.mjs', required: true },
  { name: 'Supabase', script: 'verify-supabase.mjs', required: true },
  { name: 'site_config', script: 'verify-site-config.mjs', required: true },
  { name: 'WhatsApp', script: 'verify-whatsapp.mjs', required: true },
  { name: 'Formularios', script: 'verify-forms.mjs', required: true },
  { name: 'Resend', script: 'verify-resend.mjs', required: false },
];

let failures = 0;

console.log('=== Sprint 1 (P0) — Verificaciones ===\n');

for (const step of steps) {
  console.log(`── ${step.name} ──`);
  const result = spawnSync('node', [resolve(root, 'scripts', step.script)], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    failures += 1;
    if (step.required) {
      console.error(`✗ ${step.name}: FALLÓ\n`);
    } else {
      console.warn(`⚠ ${step.name}: advertencia (no bloqueante)\n`);
    }
  } else {
    console.log(`✓ ${step.name}: OK\n`);
  }
}

if (failures > 0) {
  console.error(`Sprint 1 incompleto: ${failures} verificación(es) con problemas.`);
  process.exit(1);
}

console.log('Sprint 1 (P0): todas las verificaciones críticas pasaron.');
process.exit(0);
