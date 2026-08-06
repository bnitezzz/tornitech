import { createHmac, timingSafeEqual } from 'node:crypto';

const TOKEN_TTL_MS = 5 * 60 * 1_000;
const MAX_TOKEN_LENGTH = 2_048;

type CatalogDownloadClaims = {
  catalogId: string;
  expiresAt: number;
};

function getSigningSecret(): string {
  const secret =
    process.env.CATALOG_DOWNLOAD_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!secret || secret.length < 32) {
    throw new Error('Catalog download signing secret is not configured.');
  }

  return secret;
}

function signPayload(payload: string): string {
  return createHmac('sha256', getSigningSecret())
    .update(payload)
    .digest('base64url');
}

export function createCatalogDownloadToken(catalogId: string): string {
  const claims: CatalogDownloadClaims = {
    catalogId,
    expiresAt: Date.now() + TOKEN_TTL_MS,
  };
  const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
  return `${payload}.${signPayload(payload)}`;
}

export function verifyCatalogDownloadToken(
  token: string
): CatalogDownloadClaims | null {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null;

  const [payload, providedSignature, extra] = token.split('.');
  if (!payload || !providedSignature || extra) return null;

  try {
    const expectedSignature = signPayload(payload);
    const provided = Buffer.from(providedSignature);
    const expected = Buffer.from(expectedSignature);

    if (
      provided.length !== expected.length ||
      !timingSafeEqual(provided, expected)
    ) {
      return null;
    }

    const claims = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    ) as Partial<CatalogDownloadClaims>;

    if (
      typeof claims.catalogId !== 'string' ||
      claims.catalogId.length === 0 ||
      typeof claims.expiresAt !== 'number' ||
      !Number.isFinite(claims.expiresAt) ||
      claims.expiresAt <= Date.now()
    ) {
      return null;
    }

    return {
      catalogId: claims.catalogId,
      expiresAt: claims.expiresAt,
    };
  } catch {
    return null;
  }
}
