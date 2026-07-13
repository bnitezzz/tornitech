'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { getDefaultSiteContact } from '@/lib/site-contact-defaults';
import type { SiteContactConfig } from '@/types/site-contact';

const SiteContactContext = createContext<SiteContactConfig>(getDefaultSiteContact());

export function SiteContactProvider({
  value,
  children,
}: {
  value: SiteContactConfig;
  children: ReactNode;
}) {
  return (
    <SiteContactContext.Provider value={value}>{children}</SiteContactContext.Provider>
  );
}

/** Contact fields from Supabase (or constants fallback). */
export function useSiteContact(): SiteContactConfig {
  return useContext(SiteContactContext);
}
