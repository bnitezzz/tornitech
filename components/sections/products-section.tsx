'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
];

export function ProductsSection() {
  const { products } = useProducts({ featured: true, limit: 8 });
  const displayProducts = products.length > 0 ? products : defaultProducts;

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
    <section id="productos" className="w-full bg-white px-4 pb-12 pt-6 md:px-8 lg:px-[135px]">
      <div className="mx-auto flex w-full max-w-[1170px] flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 w-full"
        >
          <h2 className="text-center text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
            PRODUCTOS ESPECIALES
          </h2>
        </motion.header>

        <div className="w-full">
          <div className="relative shadow-[0px_2px_4px_rgba(0,0,0,0.25),inset_0px_1px_3px_rgba(0,0,0,0.08)]">
            <ScrollArea className="w-full">
              <div className="flex w-max min-w-full items-stretch gap-[27px] px-1 py-1">
                {displayProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="shrink-0"
                  >
                    <div
                      className="w-[271px] rounded-[20px] bg-white overflow-hidden"
                      style={{
                        boxShadow:
                          '0px 4px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.40), inset 1px 0 0 rgba(255,255,255,0.32), inset 0 -1px 1px rgba(0,0,0,0.13), inset -1px 0 1px rgba(0,0,0,0.11)',
                      }}
                    >
                      <div className="flex h-[297px] flex-col">
                        <Image
                          className="mx-[13px] mt-3 h-[137px] w-[245px] rounded-none object-cover"
                          alt={product.name}
                          src={(product as any).image || 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600'}
                          width={245}
                          height={137}
                        />
                        <div className="flex flex-1 flex-col px-[13px] pb-[17px] pt-5">
                          <div className="space-y-[7px]">
                            <h3 className="text-lg font-extrabold text-[#316d92]">
                              {product.name}
                            </h3>
                            <p className="text-base font-normal text-[#316d92]">
                              {product.sku}
                            </p>
                          </div>
                          <p className="mt-[2px] max-w-[237px] text-xs text-[#316d92] line-clamp-2">
                            {product.short_description || product.description || 'Producto de alta calidad'}
                          </p>
                          <div className="mt-auto flex justify-end">
                            <a
                              href={buildWhatsAppLink(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center min-w-[115px] rounded-[10px] bg-[#fab43a] px-6 py-[5px] text-base font-normal text-[#316d92] hover:bg-[#f0a52a] transition-colors"
                            >
                              Cotizar
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

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
            className="inline-flex items-center gap-2 text-lg font-normal text-[#316d92] hover:opacity-75 transition-opacity"
          >
            <span>Ver todos los productos</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#316d92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
