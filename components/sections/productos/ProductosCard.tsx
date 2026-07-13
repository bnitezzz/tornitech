'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { ProductosItem } from './ProductosItem';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { ProductoCategoria } from '@/types/producto';

const PREVIEW_LIMIT = 5;

type ProductosCardProps = {
  group: ProductoCategoria;
  index: number;
};

export function ProductosCard({ group, index }: ProductosCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const hasMore = group.productos.length > PREVIEW_LIMIT;
  const visible = expanded ? group.productos : group.productos.slice(0, PREVIEW_LIMIT);

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
      className="h-full"
    >
      <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white p-4 sm:rounded-xl sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#316d92]/10 text-[#316d92]">
            <Package className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="truncate text-sm font-bold uppercase tracking-wide text-[#052042] sm:text-base">
            {group.categoria}
          </h3>
        </div>

        <ul className="mt-3.5 flex flex-1 flex-col gap-2" role="list">
          {visible.map((producto) => (
            <ProductosItem key={producto.id} nombre={producto.nombre} />
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="focus-ring mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[#316d92] transition-colors hover:text-[#052042]"
          >
            {expanded ? 'Ver menos' : 'Ver todos'}
            <ArrowRight
              strokeWidth={1.75}
              className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover:translate-x-0.5'}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </motion.article>
  );
}
