export type SectionHeading = {
  heading: string;
  subheading?: string;
};

export type HeroConfig = SectionHeading & {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  badges: string[];
};

export type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type StatsSectionConfig = {
  heading?: string;
  items: StatItem[];
};

export type ValueItem = {
  title: string;
  description: string;
};

export type PartnerConfig = {
  heading: string;
  name: string;
  description: string;
  highlights: string[];
  cta: string;
};

export type CtaFinalConfig = {
  heading: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
};

export type SiteConfigMap = Record<string, string>;
export type SiteConfigJsonMap = Record<string, unknown>;
