'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { ProductosSearch } from './ProductosSearch';
import { ProductosGrid } from './ProductosGrid';
import { useProductos } from '@/hooks/use-productos';
import { PRODUCTOS_CATALOG_CONTENT } from '@/constants/content';

export function Productos() {
  const {
    categorias,
    searchQuery,
    setSearchQuery,
    mostrarSeccion,
    loading,
  } = useProductos();

  if (loading || !mostrarSeccion) {
    return null;
  }

  return (
    <section id="lista-productos" className="section-padding section-bg-soft-solid w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={PRODUCTOS_CATALOG_CONTENT.heading}
          subheading={PRODUCTOS_CATALOG_CONTENT.subheading}
          className="mb-8 md:mb-10"
        />

        <div className="mb-8 w-full md:mb-10">
          <ProductosSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={PRODUCTOS_CATALOG_CONTENT.searchPlaceholder}
          />
        </div>

        <ProductosGrid
          categorias={categorias}
          emptyMessage={PRODUCTOS_CATALOG_CONTENT.emptyMessage}
        />
      </div>
    </section>
  );
}
