/*
  007 — Revoke EXECUTE on trigger helper from API roles (defense in depth).
  SECURITY DEFINER RPCs and PII view remain locked to service_role.
*/

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_updated_at() TO postgres, service_role;

REVOKE ALL ON FUNCTION public.increment_download_count(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.increment_download_count(uuid) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_download_count(uuid) TO service_role;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

REVOKE ALL ON TABLE public.v_leads_with_downloads FROM PUBLIC;
REVOKE ALL ON TABLE public.v_leads_with_downloads FROM anon, authenticated;
GRANT SELECT ON TABLE public.v_leads_with_downloads TO service_role;
