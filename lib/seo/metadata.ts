import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { fetchSiteConfigValues } from '@/services/configuracion';

/** Builds root metadata, preferring public `site_config` values when available. */
export async function buildSiteMetadata(): Promise<Metadata> {
  const config = await fetchSiteConfigValues();
  const name = config.company_name || SITE_CONFIG.name;
  const description = config.company_description || SITE_CONFIG.seo.description;
  const title = config.company_tagline
    ? `${name} | ${config.company_tagline}`
    : `${name} | ${SITE_CONFIG.seo.title}`;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description,
    keywords: SITE_CONFIG.seo.keywords,
    authors: [{ name }],
    creator: name,
    publisher: name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: '/',
      siteName: name,
      title,
      description,
      images: [
        {
          url: ASSETS.logo.color,
          width: 1200,
          height: 630,
          alt: `${name} — Tornillería y fijación industrial`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ASSETS.logo.color],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
      languages: {
        'es-VE': '/',
      },
    },
    themeColor: '#052042',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  };
}
