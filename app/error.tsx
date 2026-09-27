'use client';

import { useEffect } from 'react';
import { SiteStatusPage } from '@/components/layout/site-status-page';

export default function AppError({
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
    <SiteStatusPage
      code="Error"
      title="No pudimos mostrar esta página"
      description="Hubo un problema al cargarla. Puedes intentarlo de nuevo o volver al inicio."
      onRetry={reset}
    />
  );
}
