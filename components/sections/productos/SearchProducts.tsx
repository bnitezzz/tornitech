'use client';

import { Package } from 'lucide-react';
import { ProductosSearch } from './ProductosSearch';
import { ProductModal } from './ProductModal';
import { ProductImage } from './ProductImage';
import { PRODUCTOS_CATALOG_CONTENT } from '@/constants/content';
import { PRODUCT_SEARCH_MIN_CHARS } from '@/lib/productos';
import type { ProductoDetail, ProductoListItem } from '@/types/producto';

type SearchProductsProps = {
  query: string;
  onQueryChange: (value: string) => void;
  results: ProductoListItem[];
  searching: boolean;
  idle: boolean;
  empty: boolean;
  error: string | null;
  selected: ProductoDetail | null;
  detailLoading: boolean;
  onSelect: (id: string) => void;
  onCloseModal: () => void;
};

function ResultSkeleton() {
  return (
    <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse gap-3 rounded-xl border border-slate-100 bg-white p-3"
        >
          <div className="h-20 w-20 shrink-0 rounded-lg bg-slate-100" />
          <div className="flex flex-1 flex-col justify-center gap-2">
            <div className="h-4 w-4/5 rounded bg-slate-100" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
            <div className="h-3 w-2/3 rounded bg-slate-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SearchProducts({
  query,
  onQueryChange,
  results,
  searching,
  idle,
  empty,
  error,
  selected,
  detailLoading,
  onSelect,
  onCloseModal,
}: SearchProductsProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="w-full">
        <ProductosSearch
          value={query}
          onChange={onQueryChange}
          placeholder={PRODUCTOS_CATALOG_CONTENT.searchPlaceholder}
        />
        <p className="mt-2 text-center text-xs text-[#6b7280]">
          {PRODUCTOS_CATALOG_CONTENT.searchHint.replace(
            '{min}',
            String(PRODUCT_SEARCH_MIN_CHARS)
          )}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="w-full max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {searching && <ResultSkeleton />}

      {!searching && idle && (
        <div
          role="status"
          className="flex flex-col items-center gap-3 py-10 text-center text-[#6b7280]"
        >
          <Package className="h-10 w-10 text-[#316d92]/50" strokeWidth={1.75} aria-hidden />
          <p className="text-sm">{PRODUCTOS_CATALOG_CONTENT.idleMessage}</p>
        </div>
      )}

      {!searching && empty && (
        <p role="status" className="py-10 text-center text-sm text-[#6b7280]">
          {PRODUCTOS_CATALOG_CONTENT.emptyMessage}
        </p>
      )}

      {!searching && results.length > 0 && (
        <ul
          className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Resultados de búsqueda"
        >
          {results.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => onSelect(product.id)}
                className="focus-ring group flex w-full gap-3 rounded-xl border border-slate-200/80 bg-white p-3 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-[#316d92]/40 hover:shadow-md"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                  <ProductImage
                    src={product.url_fotografia}
                    alt={product.nombre}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold text-[#052042] group-hover:text-[#316d92]">
                    {product.nombre}
                  </p>
                  {product.brand && (
                    <p className="mt-1 truncate text-xs text-[#316d92]">{product.brand}</p>
                  )}
                  <p className="mt-0.5 truncate text-xs text-[#6b7280]">{product.categoria}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ProductModal
        product={selected}
        open={Boolean(selected) || detailLoading}
        loading={detailLoading}
        onClose={onCloseModal}
      />
    </div>
  );
}
