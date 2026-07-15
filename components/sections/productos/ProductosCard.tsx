'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Package } from 'lucide-react';
import { ProductosItem } from './ProductosItem';
import { PRODUCTOS_PREVIEW_LIMIT } from '@/constants/content';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { ProductoCategoria } from '@/types/producto';

type ProductosCardProps = {
  group: ProductoCategoria;
  index: number;
};

export function ProductosCard({ group, index }: ProductosCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const visible = group.productos.slice(0, PRODUCTOS_PREVIEW_LIMIT);
  const remaining = Math.max(0, group.productos.length - PRODUCTOS_PREVIEW_LIMIT);

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.35),
        duration: 0.4,
        ease: EASE_PREMIUM,
      }}
      className="h-full w-[min(78vw,280px)] shrink-0 snap-start sm:w-[260px]"
    >
      <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white p-4 sm:rounded-xl">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#316d92]/10 text-[#316d92]">
            <Package className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="truncate text-sm font-bold uppercase tracking-wide text-[#052042]">
            {group.categoria}
          </h3>
        </div>

        <ul className="mt-3 flex flex-1 flex-col gap-1.5" role="list">
          {visible.map((producto) => (
            <ProductosItem key={producto.id} nombre={producto.nombre} />
          ))}
        </ul>

        {remaining > 0 && (
          <p className="mt-3 text-xs font-medium text-[#6b7280]">
            +{remaining} referencias más en esta categoría
          </p>
        )}
      </div>
    </motion.article>
  );
}
