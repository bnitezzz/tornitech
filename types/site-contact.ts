export type SiteSocialLinks = {
  linkedin: string;
  facebook: string;
  instagram: string;
};

/** Contact / presence data editable via public.site_config in Supabase. */
export type SiteContactConfig = {
  phone: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  social: SiteSocialLinks;
};
