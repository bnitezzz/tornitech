'use client';

import type { RefObject } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import type { CatalogItem } from '@/types/catalog';

const catalogPreviews = [
  { src: ASSETS.catalogs.general, alt: 'Catálogo general' },
  { src: ASSETS.catalogs.automotriz, alt: 'Catálogo Automotriz' },
];

type CatalogListProps = {
  catalogs: CatalogItem[];
  onDownload: (catalog: CatalogItem) => void;
  firstDownloadRef?: RefObject<HTMLButtonElement | null>;
};

export function CatalogList({ catalogs, onDownload, firstDownloadRef }: CatalogListProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2.5">
      {catalogPreviews.map((img, index) => {
        const catalog = catalogs[index];
        if (!catalog) return null;
        const title = catalog.title ?? img.alt;

        return (
          <motion.article
            key={catalog.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="card-elevated card-elevated-hover group flex w-full items-stretch overflow-hidden rounded-lg border border-slate-100"
          >
            <div className="relative h-[72px] w-[88px] shrink-0 overflow-hidden sm:h-[80px] sm:w-[104px]">
              <Image
                className="img-zoom object-cover"
                alt={img.alt}
                src={img.src}
                fill
                sizes="104px"
              />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#316d92]">
                  Catálogo PDF{catalog.version ? ` · ${catalog.version}` : ''}
                </p>
                <h3 className="mt-0.5 line-clamp-1 text-sm font-bold leading-snug text-[#052042] sm:text-[15px]">
                  {title}
                </h3>
                {catalog.description && (
                  <p className="mt-0.5 hidden line-clamp-1 text-xs text-[#6b7280] sm:block">
                    {catalog.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                ref={index === 0 ? firstDownloadRef : undefined}
                onClick={() => onDownload(catalog)}
                className="btn-yellow focus-ring shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:text-sm"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="hidden sm:inline">Descargar</span>
              </button>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
