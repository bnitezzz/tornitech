'use client';

import Link from 'next/link';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SkipLink } from '@/components/layout/skip-link';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';

type SiteStatusPageProps = {
  code: string;
  title: string;
  description: string;
  withChrome?: boolean;
  onRetry?: () => void;
};

export function SiteStatusPage({
  code,
  title,
  description,
  withChrome = true,
  onRetry,
}: SiteStatusPageProps) {
  const content = (
    <main id="contenido-principal" className="flex min-h-[70vh] items-center bg-white">
      <div className="section-container py-16 text-center sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#316d92]">{code}</p>
        <h1 className="section-heading mx-auto mt-3 max-w-xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#3c4456]/80">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {onRetry ? (
            <button type="button" onClick={onRetry} className="btn-yellow focus-ring h-11 px-6 text-sm">
              Reintentar
            </button>
          ) : (
            <Link href="/" className="btn-yellow focus-ring h-11 px-6 text-sm">
              Volver al inicio
            </Link>
          )}
          <Link
            href={onRetry ? '/' : '/#contacto'}
            className="focus-ring inline-flex h-11 items-center justify-center rounded-[10px] border border-[#052042]/15 px-6 text-sm font-medium text-[#052042] transition-colors hover:bg-[#052042]/5"
          >
            {onRetry ? 'Volver al inicio' : 'Contacto'}
          </Link>
        </div>
      </div>
    </main>
  );

  if (!withChrome) {
    return content;
  }

  return (
    <>
      <SkipLink />
      <Header />
      {content}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
