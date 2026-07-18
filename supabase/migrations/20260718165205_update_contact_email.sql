-- Align public contact and private sales inboxes with the CCS Tornitech domain.
UPDATE public.site_config
SET value = 'info@ccstornitech.com'
WHERE key IN ('contact_email', 'sales_email');
