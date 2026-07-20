'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import {
  getConfiguracionProductos,
  getProductoById,
  PRODUCT_SEARCH_MIN_CHARS,
  searchProductos,
} from '@/lib/productos';
import type { ProductoDetail, ProductoListItem } from '@/types/producto';

const SEARCH_DEBOUNCE_MS = 300;

type UseProductSearchResult = {
  query: string;
  setQuery: (value: string) => void;
  results: ProductoListItem[];
  loading: boolean;
  searching: boolean;
  error: string | null;
  empty: boolean;
  idle: boolean;
  mostrarSeccion: boolean;
  selected: ProductoDetail | null;
  detailLoading: boolean;
  openProduct: (id: string) => Promise<void>;
  closeProduct: () => void;
};

export function useProductSearch(): UseProductSearchResult {
  const [mostrarSeccion, setMostrarSeccion] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const [results, setResults] = useState<ProductoListItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ProductoDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const config = await getConfiguracionProductos();
        if (!cancelled) {
          setMostrarSeccion(Boolean(config?.mostrar_productos));
        }
      } catch {
        if (!cancelled) setMostrarSeccion(false);
      } finally {
        if (!cancelled) setConfigLoading(false);
      }
    }

    loadConfig();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const q = debouncedQuery.trim();

    if (q.length < PRODUCT_SEARCH_MIN_CHARS) {
      setResults([]);
      setSearching(false);
      setError(null);
      return;
    }

    async function runSearch() {
      setSearching(true);
      setError(null);
      try {
        const rows = await searchProductos(q);
        if (!cancelled) setResults(rows);
      } catch (err) {
        if (!cancelled) {
          setResults([]);
          setError(
            err instanceof Error ? err.message : 'No se pudo completar la búsqueda.'
          );
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }

    runSearch();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const openProduct = useCallback(async (id: string) => {
    setDetailLoading(true);
    setError(null);
    try {
      const detail = await getProductoById(id);
      setSelected(detail);
      if (!detail) {
        setError('No se encontró el producto.');
      }
    } catch (err) {
      setSelected(null);
      setError(err instanceof Error ? err.message : 'Error al cargar el producto.');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const closeProduct = useCallback(() => {
    setSelected(null);
  }, []);

  const idle = query.trim().length < PRODUCT_SEARCH_MIN_CHARS;
  const empty =
    !idle && !searching && !error && results.length === 0 && debouncedQuery.trim().length >= PRODUCT_SEARCH_MIN_CHARS;

  return {
    query,
    setQuery,
    results,
    loading: configLoading,
    searching,
    error,
    empty,
    idle,
    mostrarSeccion: mostrarSeccion && !configLoading,
    selected,
    detailLoading,
    openProduct,
    closeProduct,
  };
}
