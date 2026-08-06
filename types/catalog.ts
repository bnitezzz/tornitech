export type CatalogItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  version?: string;
  is_featured?: boolean;
  is_active?: boolean;
  display_order?: number;
  download_count?: number;
};
