export type ProductItem = {
  id: string;
  sku: string;
  name: string;
  short_description?: string | null;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  applications?: string;
  benefits?: string;
  sectors?: string;
  specs?: string;
  is_featured?: boolean;
  is_active?: boolean;
};
