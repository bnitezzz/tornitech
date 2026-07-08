'use client';

import { useQuery } from '@tanstack/react-query';
import { getSupabaseClient } from '@/lib/supabase/client';
import { SITE_CONFIG } from '@/constants/site';

type SiteSettings = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  whatsapp: string;
};

async function loadSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      companyName: SITE_CONFIG.name,
      phone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address,
      businessHours: SITE_CONFIG.businessHours,
      whatsapp: SITE_CONFIG.whatsapp,
    };
  }

  const { data } = await supabase
    .from('site_config')
    .select('key, value')
    .eq('is_public', true)
    .in('key', ['company_name', 'phone', 'contact_email', 'business_hours']);

  const map = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));

  return {
    companyName: map.company_name || SITE_CONFIG.name,
    phone: map.phone || SITE_CONFIG.phone,
    email: map.contact_email || SITE_CONFIG.email,
    address: SITE_CONFIG.address,
    businessHours: map.business_hours || SITE_CONFIG.businessHours,
    whatsapp: SITE_CONFIG.whatsapp,
  };
}

export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: ['site_settings'],
    queryFn: loadSiteSettings,
    staleTime: 120_000,
  });

  return (
    data ?? {
      companyName: SITE_CONFIG.name,
      phone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: SITE_CONFIG.address,
      businessHours: SITE_CONFIG.businessHours,
      whatsapp: SITE_CONFIG.whatsapp,
    }
  );
}
