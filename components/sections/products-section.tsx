'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { useProducts } from '@/hooks/use-supabase';
import { DEFAULT_PRODUCTS, PRODUCTS_CONTENT } from '@/constants/content';
import type { ProductItem } from '@/types/product';

const INITIAL_VISIBLE_COUNT = 4;

function getProductImage(product: ProductItem): string {
  return (
    product.image ||
    product.image_url ||
    'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600'
  );
}

export function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const { products } = useProducts({ featured: true, limit: 8 });
  const displayProducts: ProductItem[] = products.length > 0 ? products : DEFAULT_PRODUCTS;
  const visibleProducts = showAll ? displayProducts : displayProducts.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = displayProducts.length > INITIAL_VISIBLE_COUNT;

  return (
    <section id="productos" className="section-padding section-bg-ffffff w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTS_CONTENT.heading}
          subheading={PRODUCTS_CONTENT.subheading}
          className="mb-8 md:mb-10"
        />

        <motion.div
          layout
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProducts.map((product, index) => (
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
                <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white">
                  <div className="relative mx-3 mt-3 aspect-[245/158] overflow-hidden rounded-lg">
                    <Image
                      className="img-zoom object-cover"
                      alt={product.name}
                      src={getProductImage(product)}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#316d92]">
                      {product.sku}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-[#052042]">
                      {product.name}
                    </h3>

                    {product.specs && (
                      <p className="mt-2 line-clamp-1 text-[11px] font-medium text-[#6b7280]">
                        {product.specs}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#3c4456]/75">
                      {product.short_description || product.description}
                    </p>

                    <div className="mt-auto flex justify-end pt-3">
                      <WhatsAppLink
                        messageType="product_quote"
                        product={product}
                        className="btn-yellow focus-ring min-w-[100px] px-5 py-2 text-sm"
                      >
                        Cotizar
                      </WhatsAppLink>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-8 flex w-full justify-center">
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
