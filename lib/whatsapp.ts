import { SITE_CONFIG } from '@/constants/site';

const DEFAULT_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ||
  SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '');

export type WhatsAppMessageType =
  | 'general_quote'
  | 'product_quote'
  | 'catalog_inquiry'
  | 'full_catalog'
  | 'distributor';

type ProductQuoteParams = {
  name: string;
  sku: string;
  quantity?: string;
  company?: string;
};

/** Builds a pre-filled WhatsApp message by context. */
export function buildWhatsAppMessage(
  type: WhatsAppMessageType,
  params?: Partial<ProductQuoteParams>
): string {
  switch (type) {
    case 'general_quote':
      return [
        'Hola.',
        '',
        'Deseo solicitar una cotización.',
        '',
        'Empresa:',
        '',
        'Detalle del requerimiento:',
        '',
        'Gracias.',
      ].join('\n');

    case 'product_quote':
      return [
        'Hola.',
        '',
        'Deseo cotizar el siguiente producto.',
        '',
        `Producto: ${params?.name ?? ''}`,
        `Código: ${params?.sku ?? ''}`,
        `Cantidad: ${params?.quantity ?? ''}`,
        `Empresa: ${params?.company ?? ''}`,
        '',
        'Gracias.',
      ].join('\n');

    case 'catalog_inquiry':
      return 'Hola. Deseo consultar el catálogo de productos disponibles.';

    case 'full_catalog':
      return 'Hola. Deseo consultar el catálogo completo de productos y referencias técnicas.';

    case 'distributor':
      return 'Hola. Deseo información sobre el programa de distribuidores.';

    default:
      return 'Hola. Deseo información sobre sus productos industriales.';
  }
}

/** Returns a wa.me URL with encoded message text. */
export function buildWhatsAppUrl(message: string, phone?: string): string {
  const normalizedPhone = (phone ?? DEFAULT_WHATSAPP).replace(/[^0-9]/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

/** Convenience helper: type + params → full WhatsApp URL. */
export function getWhatsAppLink(
  type: WhatsAppMessageType,
  params?: Partial<ProductQuoteParams>
): string {
  return buildWhatsAppUrl(buildWhatsAppMessage(type, params));
}

export function getWhatsAppPhone(): string {
  return DEFAULT_WHATSAPP;
}
