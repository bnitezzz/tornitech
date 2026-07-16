import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { SiteContactBridge } from '@/components/providers/site-contact-bridge';

/** Refresh contact data from site_config periodically (ISR). */
export const revalidate = 60;

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.seo.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seo.description,
  keywords: SITE_CONFIG.seo.keywords,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: '/',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.seo.title}`,
    description: SITE_CONFIG.seo.description,
    images: [
      {
        url: ASSETS.social.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Tornillería y fijación industrial`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.seo.title}`,
    description: SITE_CONFIG.seo.description,
    images: [ASSETS.social.ogImage],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-VE" className={sora.variable}>
      <head>
        <link rel="icon" href={ASSETS.isotipo.color} sizes="any" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SiteContactBridge>{children}</SiteContactBridge>
      </body>
    </html>
  );
}
