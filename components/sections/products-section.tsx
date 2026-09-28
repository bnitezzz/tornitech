'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { useProducts } from '@/hooks/use-supabase';
import { DEFAULT_PRODUCTS, PRODUCTS_CONTENT } from '@/constants/content';
import { isSafeHttpUrl } from '@/lib/security';
import type { ProductItem } from '@/types/product';

const INITIAL_VISIBLE_COUNT = 4;

const FALLBACK_PRODUCT_IMAGE = '/images/isotipo-color.png';

function getProductImage(product: ProductItem): string {
  const src = product.image || product.image_url || '';
  if (!src || !isSafeHttpUrl(src) || /panama\s*fasteners|panamafasteners/i.test(src)) {
    return FALLBACK_PRODUCT_IMAGE;
  }
  return src;
}

function isLocalProductPhoto(src: string): boolean {
  return src.startsWith('/images/products/');
}

export function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const { products } = useProducts({ featured: true, limit: 8 });
  const displayProducts: ProductItem[] = products.length > 0 ? products : DEFAULT_PRODUCTS;
  const visibleProducts = showAll ? displayProducts : displayProducts.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = displayProducts.length > INITIAL_VISIBLE_COUNT;

  return (
    <section id="productos" className="section-padding-tight section-bg-fade-bottom w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTS_CONTENT.heading}
          subheading={PRODUCTS_CONTENT.subheading}
          className="mb-5 md:mb-7"
        />

        <motion.div
          layout
          className="grid w-full grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProducts.map((product, index) => {
              const imageSrc = getProductImage(product);

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    delay: index >= INITIAL_VISIBLE_COUNT ? (index - INITIAL_VISIBLE_COUNT) * 0.06 : 0,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white sm:rounded-xl">
                    <div className="relative mx-2 mt-2 aspect-[4/3] overflow-hidden rounded-md bg-white sm:mx-3 sm:mt-3 sm:aspect-[245/158] sm:rounded-lg">
                      <Image
                        className={`img-zoom ${
                          isLocalProductPhoto(imageSrc)
                            ? 'object-contain p-2 sm:p-3'
                            : 'object-cover'
                        }`}
                        alt={product.name}
                        src={imageSrc}
                        fill
                        quality={70}
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 280px"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
                      <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#316d92] sm:text-[11px]">
                        {product.sku}
                      </p>
                      <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-[#052042] sm:mt-1 sm:text-base">
                        {product.name}
                      </h3>

                      {product.specs && (
                        <p className="mt-1.5 hidden line-clamp-1 text-[11px] font-medium text-[#6b7280] sm:mt-2 sm:block">
                          {product.specs}
                        </p>
                      )}

                      <p className="mt-1.5 hidden line-clamp-2 text-xs leading-relaxed text-[#3c4456]/75 sm:mt-2 sm:block">
                        {product.short_description || product.description}
                      </p>

                      <div className="mt-auto flex justify-stretch pt-2 sm:justify-end sm:pt-3">
                        <WhatsAppLink
                          messageType="product_quote"
                          product={product}
                          className="btn-yellow focus-ring w-full px-3 py-1.5 text-xs sm:w-auto sm:min-w-[100px] sm:px-5 sm:py-2 sm:text-sm"
                        >
                          Cotizar
                        </WhatsAppLink>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-6 flex w-full justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="focus-ring group inline-flex items-center gap-2 text-sm font-semibold text-[#316d92] transition-colors hover:text-[#052042]"
            >
              {showAll ? 'Ver menos productos' : 'Ver más productos'}
              <ChevronDown
                strokeWidth={1.75}
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
