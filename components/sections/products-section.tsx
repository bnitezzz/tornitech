'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { ProductCard } from '@/components/products/product-card';
import { useProductos } from '@/hooks/use-productos';
import type { Producto } from '@/types/producto';
import { useConfigSection } from '@/hooks/use-configuracion';

const INITIAL_VISIBLE_COUNT = 4;

export function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const config = useConfigSection('products_section', {
    heading: 'PRODUCTOS ESPECIALES',
    subheading: 'Componentes con norma técnica identificada, disponibles para cotización inmediata.',
  });
  const { data: productos = [], isLoading } = useProductos({ featured: true, limit: 8 });

  if (isLoading || !productos.length) return null;

  const visible = showAll ? productos : productos.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = productos.length > INITIAL_VISIBLE_COUNT;

  return (
    <section id="productos" className="section-padding w-full bg-[#f8fafc]">
      <div className="section-container flex flex-col items-center">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8 md:mb-10" />
        <motion.div layout className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((producto: Producto, index: number) => (
              <ProductCard key={producto.id} producto={producto} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#316d92]"
          >
            {showAll ? 'Ver menos' : 'Ver todos los productos'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </section>
  );
}
