'use client';

import { useEffect } from 'react';
import { SiteStatusPage } from '@/components/layout/site-status-page';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es-VE">
      <body className="min-h-screen bg-white font-sans text-[#3c4456] antialiased">
        <SiteStatusPage
          code="Error"
          title="No pudimos mostrar esta página"
          description="Hubo un problema al cargarla. Puedes intentarlo de nuevo o volver al inicio."
          withChrome={false}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
