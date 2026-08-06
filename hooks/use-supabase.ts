'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Tables } from '@/types/database';
import type { ProductItem } from '@/types/product';
import type { CatalogItem } from '@/types/catalog';

type ProductRow = Tables<'products'>;

export function useProducts(options?: { featured?: boolean; limit?: number }) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        let query = supabase
          .from('products')
          .select(
            'id, sku, name, short_description, description, image_url, material, grade, standard, applications, sectors, is_featured, is_active, display_order'
          )
          .eq('is_active', true)
          .order('display_order');

        if (options?.featured) {
          query = query.eq('is_featured', true);
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;

        setProducts(
          ((data ?? []) as ProductRow[]).map((row) => {
            const specs = [row.standard, row.grade, row.material].filter(Boolean).join(' · ') || undefined;

            return {
              id: row.id,
              sku: row.sku,
              name: row.name,
              short_description: row.short_description,
              description: row.description,
              image_url: row.image_url,
              image: row.image_url,
              applications: row.applications ?? undefined,
              sectors: row.sectors ?? undefined,
              specs,
              is_featured: row.is_featured,
              is_active: row.is_active,
            };
          })
        );
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
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCatalogs() {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        let query = supabase
          .from('catalogs')
          .select(
            'id, title, slug, description, cover_image_url, version, is_featured, is_active, display_order, download_count'
          )
          .eq('is_active', true)
          .order('display_order');

        if (options?.featured) {
          query = query.eq('is_featured', true);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;
        setCatalogs((data ?? []) as CatalogItem[]);
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
