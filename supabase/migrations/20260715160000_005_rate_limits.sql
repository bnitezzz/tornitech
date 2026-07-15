-- Sprint 1 (P0): rate limiting fallback when Upstash Redis is not configured.
-- Service role / SECURITY DEFINER only — no public access.

CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  bucket_key text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0 CHECK (count >= 0),
  reset_at timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_buckets_reset_at
  ON public.rate_limit_buckets (reset_at);

ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.rate_limit_buckets IS
  'Sliding-window counters for server-side form rate limiting (fallback sin Upstash).';

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_bucket_key text,
  p_limit integer,
  p_window_seconds integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_count integer;
  v_reset_at timestamptz;
BEGIN
  IF p_bucket_key IS NULL OR length(trim(p_bucket_key)) = 0 THEN
    RETURN jsonb_build_object('allowed', true, 'remaining', p_limit);
  END IF;

  IF p_limit IS NULL OR p_limit < 1 OR p_window_seconds IS NULL OR p_window_seconds < 1 THEN
    RETURN jsonb_build_object('allowed', true, 'remaining', p_limit);
  END IF;

  SELECT count, reset_at
  INTO v_count, v_reset_at
  FROM public.rate_limit_buckets
  WHERE bucket_key = p_bucket_key
  FOR UPDATE;

  IF NOT FOUND OR v_reset_at <= v_now THEN
    INSERT INTO public.rate_limit_buckets (bucket_key, count, reset_at)
    VALUES (
      p_bucket_key,
      1,
      v_now + make_interval(secs => p_window_seconds)
    )
    ON CONFLICT (bucket_key) DO UPDATE
    SET
      count = 1,
      reset_at = EXCLUDED.reset_at;

    RETURN jsonb_build_object('allowed', true, 'remaining', greatest(p_limit - 1, 0));
  END IF;

  IF v_count >= p_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'remaining', 0,
      'retry_after', greatest(extract(epoch FROM (v_reset_at - v_now))::integer, 0)
    );
  END IF;

  UPDATE public.rate_limit_buckets
  SET count = count + 1
  WHERE bucket_key = p_bucket_key;

  RETURN jsonb_build_object('allowed', true, 'remaining', greatest(p_limit - v_count - 1, 0));
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;
