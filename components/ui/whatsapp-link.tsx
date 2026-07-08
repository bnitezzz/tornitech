import type { ComponentProps } from 'react';
import { getWhatsAppLink, type WhatsAppMessageType } from '@/lib/whatsapp';
import type { ProductItem } from '@/types/product';

type ProductQuoteParams = {
  name: string;
  sku: string;
  quantity?: string;
  company?: string;
};

type WhatsAppLinkProps = ComponentProps<'a'> & {
  messageType: WhatsAppMessageType;
  product?: Pick<ProductItem, 'name' | 'sku'>;
  params?: Partial<ProductQuoteParams>;
};

/**
 * Accessible anchor that opens WhatsApp with a pre-filled message.
 */
export function WhatsAppLink({
  messageType,
  product,
  params,
  href,
  children,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props
}: WhatsAppLinkProps) {
  const linkHref =
    href ??
    getWhatsAppLink(messageType, {
      name: product?.name ?? params?.name,
      sku: product?.sku ?? params?.sku,
      quantity: params?.quantity,
      company: params?.company,
    });

  return (
    <a href={linkHref} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
}
