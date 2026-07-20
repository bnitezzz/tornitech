'use client';

import { SectionHeader } from '@/components/ui/section-header';
import { SearchProducts } from './SearchProducts';
import { useProductSearch } from '@/hooks/use-product-search';
import { PRODUCTOS_CATALOG_CONTENT } from '@/constants/content';

export function Productos() {
  const {
    query,
    setQuery,
    results,
    searching,
    idle,
    empty,
    error,
    loading,
    mostrarSeccion,
    selected,
    detailLoading,
    openProduct,
    closeProduct,
  } = useProductSearch();

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

        <SearchProducts
          query={query}
          onQueryChange={setQuery}
          results={results}
          searching={searching}
          idle={idle}
          empty={empty}
          error={error}
          selected={selected}
          detailLoading={detailLoading}
          onSelect={openProduct}
          onCloseModal={closeProduct}
        />
      </div>
    </section>
  );
}
