import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { resolveCatalogForDownload } from '@/lib/catalogs';
import { verifyCatalogDownloadToken } from '@/lib/catalog-download-token';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRIVATE_CATALOG_DIRECTORY = path.join(
  process.cwd(),
  'private-catalogs'
);

function notFoundResponse() {
  return NextResponse.json(
    { message: 'El enlace de descarga no es válido o expiró.' },
    {
      status: 404,
      headers: { 'Cache-Control': 'private, no-store, max-age=0' },
    }
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const claims = verifyCatalogDownloadToken(token);
  if (!claims) return notFoundResponse();

  const catalog = await resolveCatalogForDownload(claims.catalogId);
  if (!catalog) return notFoundResponse();

  try {
    const fileName = path.basename(catalog.fileUrl);
    if (!fileName.toLowerCase().endsWith('.pdf')) {
      return notFoundResponse();
    }

    const file = await readFile(
      path.join(PRIVATE_CATALOG_DIRECTORY, fileName)
    );
    const encodedTitle = encodeURIComponent(`${catalog.title}.pdf`);

    return new Response(new Uint8Array(file), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodedTitle}`,
        'Content-Length': String(file.byteLength),
        'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[catalog-download] Failed to read catalog PDF', error);
    return notFoundResponse();
  }
}
