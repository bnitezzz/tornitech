import type { ComponentProps } from 'react';
import { useSiteContact } from '@/components/providers/site-contact-provider';
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
 * Phone number comes from site_config (Supabase) via SiteContactProvider.
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
  const { whatsapp } = useSiteContact();
  const linkHref =
    href ??
    getWhatsAppLink(
      messageType,
      {
        name: product?.name ?? params?.name,
        sku: product?.sku ?? params?.sku,
        quantity: params?.quantity,
        company: params?.company,
      },
      whatsapp
    );

  return (
    <a href={linkHref} target={target} rel={rel} {...props}>
      {children}
    </a>
  );
}
