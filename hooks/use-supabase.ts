'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useProducts(options?: { featured?: boolean; limit?: number }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (options?.featured) {
          query = query.eq('is_featured', true);
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options?.featured, options?.limit]);

  return { products, loading, error };
}

export function useCatalogs(options?: { featured?: boolean }) {
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCatalogs() {
      try {
        let query = supabase
          .from('catalogs')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (options?.featured) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setCatalogs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch catalogs'));
      } finally {
        setLoading(false);
      }
    }

    fetchCatalogs();
  }, [options?.featured]);

  return { catalogs, loading, error };
}
