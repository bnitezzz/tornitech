import { getCachedSiteContactConfig } from '@/lib/site-config';
import { SiteContactProvider } from '@/components/providers/site-contact-provider';

/** Server bridge: loads site_config once and hydrates the client provider. */
export async function SiteContactBridge({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getCachedSiteContactConfig();
  return <SiteContactProvider value={contact}>{children}</SiteContactProvider>;
}
