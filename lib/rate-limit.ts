import { headers } from 'next/headers';
import { getSupabaseServer } from '@/lib/supabase/server';

export type RateLimitScope = 'contact' | 'catalog';

export type RateLimitResult = {
  allowed: boolean;
  message?: string;
};

type RateLimitRule = {
  limit: number;
  windowSeconds: number;
};

const RULES: Record<RateLimitScope, { ip: RateLimitRule; email: RateLimitRule }> = {
  contact: {
    ip: { limit: 5, windowSeconds: 10 * 60 },
    email: { limit: 3, windowSeconds: 60 * 60 },
  },
  catalog: {
    ip: { limit: 5, windowSeconds: 10 * 60 },
    email: { limit: 3, windowSeconds: 60 * 60 },
  },
};

const RATE_LIMIT_MESSAGE =
  'Ha enviado demasiadas solicitudes. Espere unos minutos e intente de nuevo.';

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

/** Best-effort client IP for Netlify / reverse proxies. */
export function getRequestIp(): string {
  const headerList = headers();
  const candidates = [
    headerList.get('x-nf-client-connection-ip'),
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim(),
    headerList.get('x-real-ip'),
  ];

  for (const candidate of candidates) {
    const normalized = candidate?.trim();
    if (normalized) return normalized.slice(0, 128);
  }

  return 'unknown';
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 320);
}

function buildBucketKey(scope: RateLimitScope, dimension: 'ip' | 'email', value: string): string {
  return `${scope}:${dimension}:${value}`;
}

async function checkUpstashLimit(
  bucketKey: string,
  rule: RateLimitRule
): Promise<RateLimitResult | null> {
  const config = getUpstashConfig();
  if (!config) return null;

  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', bucketKey],
        ['TTL', bucketKey],
      ]),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[rate-limit] Upstash error:', response.status);
      return null;
    }

    const payload = (await response.json()) as Array<{ result: number }>;
    const count = Number(payload[0]?.result ?? 0);
    const ttl = Number(payload[1]?.result ?? -1);

    if (ttl === -1) {
      await fetch(`${config.url}/expire/${encodeURIComponent(bucketKey)}/${rule.windowSeconds}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.token}` },
        cache: 'no-store',
      });
    }

    if (count > rule.limit) {
      return { allowed: false, message: RATE_LIMIT_MESSAGE };
    }

    return { allowed: true };
  } catch (error) {
    console.error('[rate-limit] Upstash request failed:', error);
    return null;
  }
}

async function checkSupabaseLimit(
  bucketKey: string,
  rule: RateLimitRule
): Promise<RateLimitResult | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_bucket_key: bucketKey,
      p_limit: rule.limit,
      p_window_seconds: rule.windowSeconds,
    });

    if (error) {
      if (error.code === '42883' || error.message.includes('check_rate_limit')) {
        return null;
      }
      console.error('[rate-limit] Supabase RPC error:', error.message);
      return null;
    }

    const payload = data as { allowed?: boolean } | null;
    const allowed = Boolean(payload?.allowed);
    if (!allowed) {
      return { allowed: false, message: RATE_LIMIT_MESSAGE };
    }

    return { allowed: true };
  } catch (error) {
    console.error('[rate-limit] Supabase fallback failed:', error);
    return null;
  }
}

async function checkEmailLeadsFallback(
  email: string,
  scope: RateLimitScope,
  rule: RateLimitRule
): Promise<RateLimitResult | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const since = new Date(Date.now() - rule.windowSeconds * 1000).toISOString();
  const source = scope === 'contact' ? 'contact_form' : 'catalog_download';

  try {
    const { count, error } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .eq('source', source)
      .gte('created_at', since);

    if (error) {
      console.error('[rate-limit] Email fallback error:', error.message);
      return null;
    }

    if ((count ?? 0) >= rule.limit) {
      return { allowed: false, message: RATE_LIMIT_MESSAGE };
    }

    return { allowed: true };
  } catch (error) {
    console.error('[rate-limit] Email fallback failed:', error);
    return null;
  }
}

async function checkLimit(
  bucketKey: string,
  rule: RateLimitRule,
  emailFallback?: { email: string; scope: RateLimitScope }
): Promise<RateLimitResult | null> {
  const upstashResult = await checkUpstashLimit(bucketKey, rule);
  if (upstashResult) return upstashResult;

  const supabaseResult = await checkSupabaseLimit(bucketKey, rule);
  if (supabaseResult) return supabaseResult;

  if (emailFallback && bucketKey.includes(':email:')) {
    return checkEmailLeadsFallback(emailFallback.email, emailFallback.scope, rule);
  }

  return null;
}

/**
 * Enforces per-IP and per-email limits before form persistence.
 * Uses Upstash Redis when configured; otherwise falls back to Supabase RPC.
 */
export async function enforceFormRateLimit(options: {
  scope: RateLimitScope;
  email: string;
  ip?: string;
}): Promise<RateLimitResult> {
  const rules = RULES[options.scope];
  const ip = options.ip ?? getRequestIp();
  const email = normalizeEmail(options.email);

  const checks = [
    ip !== 'unknown'
      ? checkLimit(buildBucketKey(options.scope, 'ip', ip), rules.ip)
      : Promise.resolve(null),
    checkLimit(buildBucketKey(options.scope, 'email', email), rules.email, {
      email,
      scope: options.scope,
    }),
  ];

  const results = await Promise.all(checks);

  for (const result of results) {
    if (result && !result.allowed) {
      return result;
    }
  }

  const hasBackend = Boolean(getUpstashConfig() || getSupabaseServer());
  if (!hasBackend) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[rate-limit] No rate-limit backend configured; rejecting submission.');
      return {
        allowed: false,
        message: RATE_LIMIT_MESSAGE,
      };
    }
    console.warn('[rate-limit] No backend in development; allowing request.');
  }

  return { allowed: true };
}
