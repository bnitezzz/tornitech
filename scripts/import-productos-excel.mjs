#!/usr/bin/env node
/**
 * Importa productos desde el Excel de Panama Fasteners a Supabase.
 *
 * Uso:
 *   node scripts/import-productos-excel.mjs [ruta.xlsx]
 *
 * Requiere:
 *   - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY en .env.local
 *   - Python 3 + openpyxl (solo para leer el .xlsx)
 *
 * Deduplicación: upsert por source_id (id del Excel); si falta, por nombre.
 */
import { createClient } from '@supabase/supabase-js';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import ws from 'ws';
import { loadEnv, PROJECT_ROOT } from './lib/load-env.mjs';

const DEFAULT_XLSX = resolve(
  PROJECT_ROOT,
  '..',
  'productos-panamafasteners-supabase.xlsx'
);

const xlsxPath = resolve(process.argv[2] || DEFAULT_XLSX);
const BATCH_SIZE = 100;

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

if (!existsSync(xlsxPath)) {
  console.error(`No se encontró el Excel: ${xlsxPath}`);
  process.exit(1);
}

const PARSE_PY = `
import json, sys
try:
    import openpyxl
except ImportError:
    print("ERROR: instala openpyxl (pip3 install openpyxl)", file=sys.stderr)
    sys.exit(2)

path = sys.argv[1]
wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
ws = wb.active
rows = list(ws.iter_rows(values_only=True))
wb.close()
if not rows:
    print("[]")
    raise SystemExit(0)
headers = [str(h).strip() if h is not None else "" for h in rows[0]]
out = []
for row in rows[1:]:
    item = {}
    for h, v in zip(headers, row):
        if not h:
            continue
        if v is None:
            item[h] = None
        elif isinstance(v, float) and v.is_integer():
            item[h] = int(v)
        else:
            item[h] = v
    if item.get("nombre"):
        out.append(item)
print(json.dumps(out, ensure_ascii=False, default=str))
`;

function parseExcel(path) {
  const result = spawnSync('python3', ['-c', PARSE_PY, path], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.status !== 0) {
    console.error(result.stderr || 'Error al leer el Excel con Python');
    process.exit(result.status || 1);
  }
  return JSON.parse(result.stdout);
}

function asText(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
}

function asInt(value) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function asUrl(value) {
  const text = asText(value);
  if (!text) return null;
  try {
    const u = new URL(text);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return text;
  } catch {
    return null;
  }
}

function buildSpecs(row) {
  const parts = [
    asText(row.especificacion_tecnica),
    asText(row.medidas) ? `Medidas: ${asText(row.medidas)}` : null,
    asText(row.acabado) ? `Acabado: ${asText(row.acabado)}` : null,
    asText(row.presentacion) ? `Presentación: ${asText(row.presentacion)}` : null,
  ].filter(Boolean);
  return parts.length ? parts.join('\n') : null;
}

function mapRow(row, index) {
  const nombre = asText(row.nombre);
  if (!nombre) return null;

  const categoria = asText(row.categoria) || 'Sin categoría';
  const sourceId = asInt(row.id);
  const especificacion = asText(row.especificacion_tecnica);
  const contenido = asText(row.contenido);
  const descripcion = contenido || buildSpecs(row);

  return {
    source_id: sourceId,
    nombre,
    sku: asText(row.sku),
    brand: asText(row.brand) || asText(row.marca) || null,
    categoria,
    subcategory: asText(row.subcategory) || asText(row.subcategoria) || null,
    descripcion,
    especificacion_tecnica: especificacion,
    medidas: asText(row.medidas),
    acabado: asText(row.acabado),
    presentacion: asText(row.presentacion),
    grupo: asInt(row.grupo),
    familia: asInt(row.familia),
    url_fotografia: asUrl(row.url_fotografia),
    url_producto: asUrl(row.url_producto),
    contenido,
    datasheet_url: asUrl(row.datasheet_url) || asUrl(row.ficha_tecnica),
    stock: asInt(row.stock),
    price: row.price != null && row.price !== '' ? Number(row.price) : null,
    orden: sourceId ?? index + 1,
    activo: true,
  };
}

const rawRows = parseExcel(xlsxPath);
console.log(`Excel leído: ${rawRows.length} filas con nombre (${xlsxPath})`);

const mapped = [];
const seenSource = new Set();
const seenNombre = new Set();
let skippedDup = 0;

for (let i = 0; i < rawRows.length; i++) {
  const row = mapRow(rawRows[i], i);
  if (!row) continue;

  const nombreKey = row.nombre.toLowerCase();
  if (row.sku) {
    // reserved for future SKU-based dedupe within batch
  }
  if (row.source_id != null) {
    if (seenSource.has(row.source_id)) {
      skippedDup += 1;
      continue;
    }
    seenSource.add(row.source_id);
  } else if (seenNombre.has(nombreKey)) {
    skippedDup += 1;
    continue;
  }
  seenNombre.add(nombreKey);
  mapped.push(row);
}

console.log(`A importar: ${mapped.length} (duplicados en Excel omitidos: ${skippedDup})`);

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws },
});

let upserted = 0;
let failed = 0;

for (let i = 0; i < mapped.length; i += BATCH_SIZE) {
  const batch = mapped.slice(i, i + BATCH_SIZE);
  const withSource = batch.filter((r) => r.source_id != null);
  const withoutSource = batch.filter((r) => r.source_id == null);

  if (withSource.length) {
    const { error } = await admin.from('productos').upsert(withSource, {
      onConflict: 'source_id',
      ignoreDuplicates: false,
    });
    if (error) {
      console.error(`✗ Lote source_id ${i}-${i + withSource.length}: ${error.message}`);
      failed += withSource.length;
    } else {
      upserted += withSource.length;
      console.log(`✓ Upsert source_id ${upserted}/${mapped.length}`);
    }
  }

  for (const row of withoutSource) {
    const { data: existing, error: findError } = await admin
      .from('productos')
      .select('id')
      .ilike('nombre', row.nombre)
      .maybeSingle();

    if (findError) {
      console.error(`✗ Buscar ${row.nombre}: ${findError.message}`);
      failed += 1;
      continue;
    }

    const { error } = existing
      ? await admin.from('productos').update(row).eq('id', existing.id)
      : await admin.from('productos').insert(row);

    if (error) {
      console.error(`✗ ${row.nombre}: ${error.message}`);
      failed += 1;
    } else {
      upserted += 1;
    }
  }
}

const { count } = await admin
  .from('productos')
  .select('id', { count: 'exact', head: true })
  .eq('activo', true);

console.log(`\nImportación terminada. Upserts OK: ${upserted}, fallos: ${failed}`);
console.log(`Total activos en productos: ${count ?? '?'}`);
process.exit(failed ? 1 : 0);
