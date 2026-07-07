'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useProducts } from '@/hooks/use-supabase';
import { SITE_CONFIG } from '@/constants/site';

const defaultProducts = [
  {
    id: '1',
    sku: '933-8.8-M12',
    name: 'Tornillo Hexagonal DIN 933',
    short_description: 'Tornillo hexagonal de cabeza completa',
    description: 'Norma DIN 933, acero grado 8.8, rosca métrica',
    image: 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    sku: '931-10.9-M16',
    name: 'Tornillo Hexagonal DIN 931',
    short_description: 'Tornillo hexagonal con cuello',
    description: 'Norma DIN 931, acero grado 10.9, alta resistencia',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    sku: 'ISO4014-M20',
    name: 'Perno Hexagonal ISO 4014',
    short_description: 'Perno hexagonal de alta resistencia',
    description: 'Conforme a ISO 4014, aplicaciones estructurales',
    image: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    sku: 'DIN985-M8',
    name: 'Tuerca Hexagonal DIN 985',
    short_description: 'Tuerca autoblocante con inserto nylon',
    description: 'DIN 985 autoblocante, resistente a vibraciones',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    sku: 'ASTM-A325',
    name: 'Perno Estructural ASTM A325',
    short_description: 'Perno de alta resistencia estructural',
    description: 'ASTM A325 para conexiones de acero estructural',
    image: 'https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '6',
    sku: 'DIN934-M10',
    name: 'Tuerca Hexagonal DIN 934',
    short_description: 'Tuerca hexagonal estándar',
    description: 'DIN 934, acero grado 8, rosca métrica estándar',
    image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '7',
    sku: 'DIN9021-M12',
    name: 'Arandela Plana DIN 9021',
    short_description: 'Arandela de gran diámetro exterior',
    description: 'DIN 9021, acero zincado, mayor área de apoyo',
    image: 'https://images.pexels.com/photos/4491900/pexels-photo-4491900.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '8',
    sku: 'HILTI-HIT-M16',
    name: 'Anclaje Químico HIT-HY',
    short_description: 'Anclaje químico de alta carga',
    description: 'Sistema de anclaje químico para concreto y mampostería',
    image: 'https://images.pexels.com/photos/8961459/pexels-photo-8961459.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '9',
    sku: 'DIN912-M8',
    name: 'Tornillo Allen DIN 912',
    short_description: 'Tornillo cabeza cilíndrica hexágono interior',
    description: 'DIN 912, acero grado 12.9, alta precisión',
    image: 'https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const INITIAL_VISIBLE_COUNT = 6;

export function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const { products } = useProducts({ featured: true, limit: 9 });
  const displayProducts = products.length > 0 ? products : defaultProducts;
  const visibleProducts = showAll ? displayProducts : displayProducts.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = displayProducts.length > INITIAL_VISIBLE_COUNT;

  const buildWhatsAppLink = (product: any) => {
    const message = `Hola.

Deseo cotizar el siguiente producto.

Producto:
${product.name}

Código:
${product.sku}

Cantidad:

Empresa:

Muchas gracias.`;
    return `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="productos" className="w-full bg-white px-4 pb-16 pt-8 md:px-8 md:pb-20 md:pt-10 lg:px-[135px]">
      <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex w-full flex-col items-center gap-3 md:mb-10"
        >
          <h2 className="section-heading text-center">PRODUCTOS ESPECIALES</h2>
          <span className="section-accent" />
        </motion.header>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visibleProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: index < INITIAL_VISIBLE_COUNT ? index * 0.07 : (index - INITIAL_VISIBLE_COUNT) * 0.07, duration: 0.35 }}
                className="h-full"
              >
                <div className="card-elevated card-elevated-hover group flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white">
                  <div className="relative mx-[13px] mt-3 aspect-[245/137] w-[calc(100%-26px)] overflow-hidden rounded-[8px]">
                    <Image
                      className="img-zoom object-cover"
                      alt={product.name}
                      src={(product as any).image || 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-[13px] pb-[17px] pt-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold leading-snug text-[#3c4456]">
                        {product.name}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#316d92]/70">
                        {product.sku}
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#3c4456]/70 line-clamp-2">
                      {product.short_description || product.description || 'Producto de alta calidad'}
                    </p>
                    <div className="mt-auto flex justify-end pt-3">
                      <a
                        href={buildWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-yellow focus-ring min-w-[115px] px-6 py-[5px] text-base"
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex w-full justify-center"
          >
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#316d92]/25 bg-white px-6 py-2.5 text-sm font-semibold text-[#316d92] shadow-[0_1px_2px_rgba(5,32,66,0.06)] transition-all duration-200 ease-out hover:border-[#316d92]/40 hover:bg-[#316d92]/5 hover:shadow-[0_4px_12px_rgba(5,32,66,0.1)] active:scale-[0.98]"
            >
              <span>{showAll ? 'Ver menos productos' : 'Ver más productos'}</span>
              <ChevronDown
                strokeWidth={1.75}
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex w-full justify-center"
        >
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo ver el catálogo completo de productos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring group inline-flex items-center gap-2 rounded-sm text-lg font-normal text-[#316d92] transition-opacity hover:opacity-75"
          >
            <span>Ver catálogo completo</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M1 1L5 5L9 1" stroke="#316d92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
