'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { useProducts } from '@/hooks/use-supabase';
import { DEFAULT_PRODUCTS, PRODUCTS_CONTENT } from '@/constants/content';
import { SITE_CONFIG } from '@/constants/site';

const INITIAL_VISIBLE_COUNT = 4;

type ProductItem = (typeof DEFAULT_PRODUCTS)[number] & {
  applications?: string;
  benefits?: string;
  sectors?: string;
  specs?: string;
};

export function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const { products } = useProducts({ featured: true, limit: 8 });
  const displayProducts: ProductItem[] = products.length > 0 ? products : DEFAULT_PRODUCTS;
  const visibleProducts = showAll ? displayProducts : displayProducts.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = displayProducts.length > INITIAL_VISIBLE_COUNT;

  const buildWhatsAppLink = (product: ProductItem) => {
    const message = `Hola.

Deseo cotizar el siguiente producto.

Producto: ${product.name}
Código: ${product.sku}
Cantidad:
Empresa:

Gracias.`;
    return `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="productos" className="w-full bg-[#f8fafc] py-16 md:py-24">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTS_CONTENT.heading}
          subheading={PRODUCTS_CONTENT.subheading}
          className="mb-10 md:mb-12"
        />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <AnimatePresence initial={false}>
            {visibleProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true }}
                transition={{
                  delay: index < INITIAL_VISIBLE_COUNT ? index * 0.07 : (index - INITIAL_VISIBLE_COUNT) * 0.07,
                  duration: 0.35,
                }}
                className="h-full"
              >
                <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-[16px] border border-slate-100 bg-white">
                  <div className="relative mx-3 mt-3 aspect-[245/158] overflow-hidden rounded-[10px]">
                    <Image
                      className="img-zoom object-cover"
                      alt={product.name}
                      src={product.image || 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#316d92]">
                      {product.sku}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-[#052042] line-clamp-2">
                      {product.name}
                    </h3>

                    {(product as ProductItem).specs && (
                      <p className="mt-2 text-[11px] font-medium text-[#6b7280] line-clamp-1">
                        {(product as ProductItem).specs}
                      </p>
                    )}

                    <p className="mt-2 text-xs leading-relaxed text-[#3c4456]/75 line-clamp-2">
                      {product.short_description || product.description}
                    </p>

                    {(product as ProductItem).applications && (
                      <p className="mt-2 text-[11px] leading-snug text-[#6b7280] line-clamp-2">
                        <span className="font-semibold text-[#3c4456]/60">Aplicación: </span>
                        {(product as ProductItem).applications}
                      </p>
                    )}

                    {(product as ProductItem).sectors && (
                      <p className="mt-1 text-[11px] text-[#6b7280] line-clamp-1">
                        <span className="font-semibold text-[#3c4456]/60">Sectores: </span>
                        {(product as ProductItem).sectors}
                      </p>
                    )}

                    <div className="mt-auto flex justify-end pt-4">
                      <a
                        href={buildWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-yellow focus-ring min-w-[100px] px-5 py-2 text-sm"
                      >
                        Cotizar
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-10 flex w-full justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#316d92]/25 bg-white px-6 py-2.5 text-sm font-semibold text-[#316d92] shadow-[0_1px_2px_rgba(5,32,66,0.06)] transition-all duration-200 hover:border-[#316d92]/40 hover:bg-[#316d92]/5"
            >
              {showAll ? 'Ver menos productos' : 'Ver más productos'}
              <ChevronDown
                strokeWidth={1.75}
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}

        <div className="mt-8 flex w-full justify-center">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo consultar el catálogo completo de productos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-base font-medium text-[#316d92] underline-offset-4 transition-opacity hover:underline hover:opacity-80"
          >
            Consultar catálogo completo
          </a>
        </div>
      </div>
    </section>
  );
}
