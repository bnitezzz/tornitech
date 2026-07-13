'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ProductosCard } from './ProductosCard';
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
      <p role="status" className="py-10 text-center text-sm text-[#6b7280]">
        {emptyMessage}
      </p>
    );
  }

  return (
    <motion.div
      layout
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {categorias.map((group, index) => (
          <ProductosCard key={group.categoria} group={group} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
