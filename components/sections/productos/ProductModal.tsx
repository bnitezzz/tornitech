'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, X, Loader2, Package } from 'lucide-react';
import { ProductImage, PLACEHOLDER_SRC } from './ProductImage';
import { safeHttpUrl } from '@/lib/security';
import type { ProductoDetail } from '@/types/producto';

type ProductModalProps = {
  product: ProductoDetail | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
};

function SpecBlock({ label, value }: { label: string; value?: string | null }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[#316d92]">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm text-[#3c4456]">{value}</dd>
    </div>
  );
}

export function ProductModal({ product, open, loading, onClose }: ProductModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  const datasheet = safeHttpUrl(product?.datasheet_url);
  const imageSrc = product?.url_fotografia || PLACEHOLDER_SRC;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            aria-busy={loading || undefined}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-6">
              <h3
                id="product-modal-title"
                className="pr-2 text-base font-bold uppercase tracking-wide text-[#052042] sm:text-lg"
              >
                {loading ? 'Cargando…' : product?.nombre ?? 'Producto'}
              </h3>
              <button
                type="button"
                ref={closeRef}
                onClick={onClose}
                aria-label="Cerrar"
                className="focus-ring shrink-0 rounded-md p-1.5 transition-colors hover:bg-slate-100"
              >
                <X className="h-5 w-5 text-[#3c4456]" strokeWidth={1.75} />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              {loading && (
                <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
                  <Loader2
                    className="h-8 w-8 animate-spin text-[#316d92]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <p className="text-sm text-[#6b7280]">Cargando producto…</p>
                </div>
              )}

              {!loading && product && (
                <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_1fr]">
                  <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-xl bg-slate-50">
                    <ProductImage
                      src={imageSrc}
                      alt={product.nombre}
                      sizes="(max-width: 768px) 90vw, 240px"
                      priority
                    />
                  </div>

                  <div className="space-y-4">
                    <dl className="grid gap-3 sm:grid-cols-2">
                      <SpecBlock label="SKU" value={product.sku} />
                      <SpecBlock label="Marca" value={product.brand} />
                      <SpecBlock label="Categoría" value={product.categoria} />
                      <SpecBlock label="Subcategoría" value={product.subcategory} />
                    </dl>

                    <SpecBlock
                      label="Especificaciones"
                      value={
                        [
                          product.especificacion_tecnica,
                          product.medidas ? `Medidas: ${product.medidas}` : null,
                          product.acabado ? `Acabado: ${product.acabado}` : null,
                          product.presentacion
                            ? `Presentación: ${product.presentacion}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join('\n') || null
                      }
                    />

                    <div className="flex flex-wrap gap-3 pt-2">
                      {datasheet && (
                        <a
                          href={datasheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-yellow inline-flex items-center gap-2 px-4 py-2 text-sm"
                        >
                          <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                          Descargar ficha técnica
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={onClose}
                        className="btn-navy inline-flex items-center px-4 py-2 text-sm"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !product && (
                <div className="flex flex-col items-center gap-2 py-12 text-[#6b7280]" role="status">
                  <Package className="h-8 w-8" strokeWidth={1.75} aria-hidden />
                  <p className="text-sm">No se pudo mostrar el producto.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
