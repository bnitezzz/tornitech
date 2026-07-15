'use client';

import { AnimatePresence } from 'framer-motion';
import { ProductosCard } from './ProductosCard';
import { HorizontalScroll } from '@/components/ui/horizontal-scroll';
import type { ProductoCategoria } from '@/types/producto';

type ProductosGridProps = {
  categorias: ProductoCategoria[];
  emptyMessage?: string;
};

export function ProductosGrid({
  categorias,
  emptyMessage = 'No se encontraron productos con ese criterio.',
}: ProductosGridProps) {
  if (categorias.length === 0) {
    return (
      <p role="status" className="py-8 text-center text-sm text-[#6b7280]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <HorizontalScroll ariaLabel="Categorías de productos" className="w-full">
      <AnimatePresence initial={false}>
        {categorias.map((group, index) => (
          <ProductosCard key={group.categoria} group={group} index={index} />
        ))}
      </AnimatePresence>
    </HorizontalScroll>
  );
}
