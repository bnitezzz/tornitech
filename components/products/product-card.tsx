'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Producto } from '@/types/producto';
import { buildProductQuoteUrl } from '@/lib/whatsapp';

type ProductCardProps = {
  producto: Producto;
  index?: number;
};

export function ProductCard({ producto, index = 0 }: ProductCardProps) {
  const imageSrc = producto.imagen || '/images/img-producto-placeholder.png';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white"
    >
      <div className="relative mx-3 mt-3 aspect-[245/158] overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={imageSrc}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 90vw, 280px"
          className="img-zoom object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#316d92]">{producto.sku}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-bold text-[#052042]">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="mt-2 line-clamp-2 text-sm text-[#6b7280]">{producto.descripcion}</p>
        )}
        <dl className="mt-3 space-y-1 text-xs text-[#6b7280]">
          {producto.din && (
            <div className="flex gap-2">
              <dt className="font-semibold text-[#052042]">DIN</dt>
              <dd>{producto.din}</dd>
            </div>
          )}
          {producto.material && (
            <div className="flex gap-2">
              <dt className="font-semibold text-[#052042]">Material</dt>
              <dd>{producto.material}</dd>
            </div>
          )}
          {producto.grado && (
            <div className="flex gap-2">
              <dt className="font-semibold text-[#052042]">Grado</dt>
              <dd>{producto.grado}</dd>
            </div>
          )}
        </dl>
        <a
          href={buildProductQuoteUrl(producto)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline focus-ring mt-4 w-full py-2.5 text-center text-sm font-semibold"
        >
          Cotizar
        </a>
      </div>
    </motion.article>
  );
}
