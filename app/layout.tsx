import './globals.css';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { ASSETS } from '@/constants/assets';
import { AppProviders } from '@/components/providers/app-providers';
import { buildSiteMetadata } from '@/lib/seo/metadata';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-VE" className={sora.variable}>
      <head>
        <link rel="icon" href={ASSETS.isotipo.color} sizes="any" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
