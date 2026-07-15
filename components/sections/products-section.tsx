'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { HorizontalScroll } from '@/components/ui/horizontal-scroll';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { useProducts } from '@/hooks/use-supabase';
import { DEFAULT_PRODUCTS, PRODUCTS_CONTENT } from '@/constants/content';
import type { ProductItem } from '@/types/product';

const HOME_VISIBLE_COUNT = 5;

function getProductImage(product: ProductItem): string {
  return (
    product.image ||
    product.image_url ||
    'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600'
  );
}

export function ProductsSection() {
  const { products } = useProducts({ featured: true, limit: HOME_VISIBLE_COUNT });
  const displayProducts: ProductItem[] =
    products.length > 0 ? products.slice(0, HOME_VISIBLE_COUNT) : DEFAULT_PRODUCTS.slice(0, HOME_VISIBLE_COUNT);

  return (
    <section id="productos" className="section-padding-tight section-bg-fade-bottom w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTS_CONTENT.heading}
          subheading={PRODUCTS_CONTENT.subheading}
          className="mb-6 md:mb-8"
        />

        <HorizontalScroll ariaLabel="Productos especiales destacados" className="w-full">
          <AnimatePresence initial={false}>
            {displayProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.35 }}
                className="w-[min(78vw,260px)] shrink-0 snap-start sm:w-[240px] lg:w-[248px]"
              >
                <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white">
                  <div className="relative mx-2 mt-2 aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      className="img-zoom object-cover"
                      alt={product.name}
                      src={getProductImage(product)}
                      fill
                      sizes="260px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-2">
                    <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#316d92]">
                      {product.sku}
                    </p>
                    <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-[#052042]">
                      {product.name}
                    </h3>
                    {product.specs && (
                      <p className="mt-1 line-clamp-1 text-[11px] font-medium text-[#6b7280]">
                        {product.specs}
                      </p>
                    )}
                    <div className="mt-auto flex pt-2.5">
                      <WhatsAppLink
                        messageType="product_quote"
                        product={product}
                        className="btn-yellow focus-ring w-full px-3 py-1.5 text-xs"
                      >
                        Cotizar
                      </WhatsAppLink>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </HorizontalScroll>
      </div>
    </section>
  );
}
