'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { ProductosSearch } from './ProductosSearch';
import { ProductosGrid } from './ProductosGrid';
import { useProductos } from '@/hooks/use-productos';
import { PRODUCTOS_CATALOG_CONTENT, PRODUCTOS_HOME_LIMIT } from '@/constants/content';
import { useMemo } from 'react';

export function Productos() {
  const {
    categorias,
    searchQuery,
    setSearchQuery,
    mostrarSeccion,
    loading,
  } = useProductos();

  const limitedCategorias = useMemo(
    () => categorias.slice(0, PRODUCTOS_HOME_LIMIT),
    [categorias]
  );

  if (loading || !mostrarSeccion) {
    return null;
  }

  return (
    <section id="lista-productos" className="section-padding-tight section-bg-soft-solid w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTOS_CATALOG_CONTENT.heading}
          subheading={PRODUCTOS_CATALOG_CONTENT.subheading}
          className="mb-6 md:mb-8"
        />

        <div className="mb-6 w-full md:mb-8">
          <ProductosSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={PRODUCTOS_CATALOG_CONTENT.searchPlaceholder}
          />
        </div>

        <ProductosGrid
          categorias={limitedCategorias}
          emptyMessage={PRODUCTOS_CATALOG_CONTENT.emptyMessage}
        />

        {categorias.length > PRODUCTOS_HOME_LIMIT && !searchQuery.trim() && (
          <p className="mt-5 text-center text-xs text-[#6b7280] md:text-sm">
            {PRODUCTOS_CATALOG_CONTENT.homeLimitNote}
          </p>
        )}
      </div>
    </section>
  );
}
