#!/usr/bin/env node
/**
 * Verifica flujo completo de formularios (contacto + catálogo) contra Supabase.
 * No envía emails reales; valida persistencia y RPC.
 * Uso: npm run verify:forms
 */
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { loadEnv } from './lib/load-env.mjs';

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

const stamp = Date.now();
const probeEmail = `forms-verify-${stamp}@tornitech.local`;
let ok = true;

async function cleanup(ids) {
  if (ids.contactSubmissionId) {
    await admin.from('contact_submissions').delete().eq('id', ids.contactSubmissionId);
  }
  if (ids.catalogDownloadId) {
    await admin.from('catalog_downloads').delete().eq('id', ids.catalogDownloadId);
  }
  if (ids.leadIds?.length) {
    await admin.from('leads').delete().in('id', ids.leadIds);
  }
}

const ids = { leadIds: [] };

try {
  const { data: lead, error: leadError } = await admin
    .from('leads')
    .insert({
      name: 'Verificación formularios',
      email: probeEmail,
      company: 'Tornitech QA',
      source: 'contact_form',
      accepts_marketing: false,
    })
    .select('id')
    .single();

  if (leadError || !lead?.id) {
    console.error('✗ Flujo contacto — crear lead:', leadError?.message ?? 'sin id');
    ok = false;
  } else {
    ids.leadIds.push(lead.id);
    console.log('✓ Flujo contacto — crear lead: OK');

    const { data: submission, error: submissionError } = await admin
      .from('contact_submissions')
      .insert({
        name: 'Verificación formularios',
        email: probeEmail,
        message: 'Mensaje de verificación automática del Sprint 1.',
        status: 'new',
        lead_id: lead.id,
      })
      .select('id')
      .single();

    if (submissionError || !submission?.id) {
      console.error('✗ Flujo contacto — contact_submissions:', submissionError?.message);
      ok = false;
    } else {
      ids.contactSubmissionId = submission.id;
      console.log('✓ Flujo contacto — contact_submissions: OK');
    }
  }

  const { data: catalog, error: catalogError } = await admin
    .from('catalogs')
    .select('id, slug, title, file_url')
    .eq('is_active', true)
    .limit(1)
    .maybeSingle();

  if (catalogError || !catalog?.id) {
    console.error('✗ Flujo catálogo — sin catálogo activo:', catalogError?.message);
    ok = false;
  } else {
    console.log(`✓ Flujo catálogo — catálogo activo: ${catalog.title}`);

    const { data: catalogLead, error: catalogLeadError } = await admin
      .from('leads')
      .insert({
        name: 'Verificación catálogo',
        email: probeEmail,
        company: 'Tornitech QA',
        source: 'catalog_download',
        source_id: catalog.id,
        accepts_marketing: false,
        notes: `Catálogo: ${catalog.title}`,
      })
      .select('id')
      .single();

    if (catalogLeadError || !catalogLead?.id) {
      console.error('✗ Flujo catálogo — crear lead:', catalogLeadError?.message);
      ok = false;
    } else {
      ids.leadIds.push(catalogLead.id);
      console.log('✓ Flujo catálogo — crear lead: OK');

      const { data: download, error: downloadError } = await admin
        .from('catalog_downloads')
        .insert({
          catalog_id: catalog.id,
          lead_id: catalogLead.id,
          email: probeEmail,
        })
        .select('id')
        .single();

      if (downloadError || !download?.id) {
        console.error('✗ Flujo catálogo — catalog_downloads:', downloadError?.message);
        ok = false;
      } else {
        ids.catalogDownloadId = download.id;
        console.log('✓ Flujo catálogo — catalog_downloads: OK');
      }

      const { error: rpcError } = await admin.rpc('increment_download_count', {
        catalog_id: catalog.id,
      });

      if (rpcError) {
        console.error('✗ Flujo catálogo — increment_download_count:', rpcError.message);
        ok = false;
      } else {
        console.log('✓ Flujo catálogo — increment_download_count: OK');
      }

      if (catalog.file_url) {
        console.log(`✓ Flujo catálogo — file_url: ${catalog.file_url}`);
      } else {
        console.warn('⚠ Flujo catálogo — file_url vacío');
      }
    }
  }

  const { data: rateLimitData, error: rateLimitError } = await admin.rpc('check_rate_limit', {
    p_bucket_key: `verify:ip:forms-${stamp}`,
    p_limit: 5,
    p_window_seconds: 600,
  });

  if (rateLimitError) {
    if (rateLimitError.message.includes('check_rate_limit')) {
      console.warn('⚠ Rate limiting RPC no disponible — aplique migración 005_rate_limits.sql');
    } else {
      console.error('✗ Rate limiting RPC:', rateLimitError.message);
      ok = false;
    }
  } else if (rateLimitData?.allowed) {
    console.log('✓ Rate limiting RPC (Supabase fallback): OK');
    await admin.from('rate_limit_buckets').delete().eq('bucket_key', `verify:ip:forms-${stamp}`);
  } else {
    console.error('✗ Rate limiting RPC: respuesta inesperada');
    ok = false;
  }
} finally {
  await cleanup(ids);
}

console.log(ok ? '\nFormularios listos para producción.' : '\nHay problemas en el flujo de formularios.');
process.exit(ok ? 0 : 1);
