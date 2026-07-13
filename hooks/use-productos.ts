'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  filterProductos,
  getConfiguracionProductos,
  getProductos,
  groupProductosByCategoria,
} from '@/lib/productos';
import type { Producto, ProductoCategoria } from '@/types/producto';

type UseProductosResult = {
  productos: Producto[];
  categorias: ProductoCategoria[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  mostrarSeccion: boolean;
  loading: boolean;
  error: Error | null;
};

export function useProductos(): UseProductosResult {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarProductos, setMostrarProductos] = useState(false);
  const [searchQuery, setSearchQueryState] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [config, rows] = await Promise.all([
          getConfiguracionProductos(),
          getProductos(),
        ]);

        if (cancelled) return;

        setMostrarProductos(Boolean(config?.mostrar_productos));
        setProductos(rows);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setMostrarProductos(false);
        setProductos([]);
        setError(err instanceof Error ? err : new Error('Error al cargar productos'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value);
  }, []);

  const filtered = useMemo(
    () => filterProductos(productos, searchQuery),
    [productos, searchQuery]
  );

  const categorias = useMemo(() => groupProductosByCategoria(filtered), [filtered]);

  const mostrarSeccion = mostrarProductos && !loading && !error && productos.length > 0;

  return {
    productos: filtered,
    categorias,
    searchQuery,
    setSearchQuery,
    mostrarSeccion,
    loading,
    error,
  };
}
