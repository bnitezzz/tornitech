import { SiteStatusPage } from '@/components/layout/site-status-page';

export default function NotFound() {
  return (
    <SiteStatusPage
      code="404"
      title="Página no encontrada"
      description="Esa dirección no existe en CCS Tornitech. Vuelve al inicio o escríbenos si buscabas un producto o un catálogo."
    />
  );
}
