/**
 * Supabase database types — synced from supabase/schema.sql + migrations 002/003.
 * Regenerate remotely: npm run db:types (requires `supabase login`).
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          icon_name: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subcategories: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          website_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          code: string;
          description: string | null;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          description?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          description?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      sectors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon_name: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon_name?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon_name?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      product_sectors: {
        Row: {
          id: string;
          product_id: string;
          sector_id: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          sector_id: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          sector_id?: string;
        };
        Relationships: [];
      };
      product_certifications: {
        Row: {
          id: string;
          product_id: string;
          certification_id: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          certification_id: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          certification_id?: string;
        };
        Relationships: [];
      };

      products: {
        Row: {
          id: string;
          sku: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          category_id: string | null;
          subcategory_id: string | null;
          brand_id: string | null;
          specifications: Json;
          material: string | null;
          grade: string | null;
          standard: string | null;
          diameter: string | null;
          length: string | null;
          weight: string | null;
          unit: string;
          min_order_qty: number;
          image_url: string | null;
          datasheet_url: string | null;
          is_featured: boolean;
          is_active: boolean;
          applications: string | null;
          sectors: string | null;
          din: string | null;
          astm: string | null;
          stock: number;
          pdf_url: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          category_id?: string | null;
          subcategory_id?: string | null;
          brand_id?: string | null;
          specifications?: Json;
          material?: string | null;
          grade?: string | null;
          standard?: string | null;
          diameter?: string | null;
          length?: string | null;
          weight?: string | null;
          unit?: string;
          min_order_qty?: number;
          image_url?: string | null;
          datasheet_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          applications?: string | null;
          sectors?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
                  din?: string | null;
          astm?: string | null;
          stock?: number;
          pdf_url?: string | null;
};
        Update: {
          id?: string;
          sku?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          category_id?: string | null;
          subcategory_id?: string | null;
          brand_id?: string | null;
          specifications?: Json;
          material?: string | null;
          grade?: string | null;
          standard?: string | null;
          diameter?: string | null;
          length?: string | null;
          weight?: string | null;
          unit?: string;
          min_order_qty?: number;
          image_url?: string | null;
          datasheet_url?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
          applications?: string | null;
          sectors?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
                  din?: string | null;
          astm?: string | null;
          stock?: number;
          pdf_url?: string | null;
};
        Relationships: [];
      };
      catalogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          category_id: string | null;
          file_url: string;
          file_size: string | null;
          cover_image_url: string | null;
          version: string | null;
          pages: number | null;
          language: string;
          is_featured: boolean;
          is_active: boolean;
          display_order: number;
          download_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          category_id?: string | null;
          file_url: string;
          file_size?: string | null;
          cover_image_url?: string | null;
          version?: string | null;
          pages?: number | null;
          language?: string;
          is_featured?: boolean;
          is_active?: boolean;
          display_order?: number;
          download_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          category_id?: string | null;
          file_url?: string;
          file_size?: string | null;
          cover_image_url?: string | null;
          version?: string | null;
          pages?: number | null;
          language?: string;
          is_featured?: boolean;
          is_active?: boolean;
          display_order?: number;
          download_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          website_url: string | null;
          partner_type: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          partner_type?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          description?: string | null;
          website_url?: string | null;
          partner_type?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          company: string;
          email: string;
          phone: string | null;
          city: string | null;
          sector: string | null;
          product_id: string | null;
          product_name: string | null;
          product_sku: string | null;
          quantity: string | null;
          message: string | null;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          company: string;
          email: string;
          phone?: string | null;
          city?: string | null;
          sector?: string | null;
          product_id?: string | null;
          product_name?: string | null;
          product_sku?: string | null;
          quantity?: string | null;
          message?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company?: string;
          email?: string;
          phone?: string | null;
          city?: string | null;
          sector?: string | null;
          product_id?: string | null;
          product_name?: string | null;
          product_sku?: string | null;
          quantity?: string | null;
          message?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string | null;
          company: string | null;
          content: string;
          rating: number;
          avatar_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_name: string;
          author_role?: string | null;
          company?: string | null;
          content: string;
          rating?: number;
          avatar_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          author_role?: string | null;
          company?: string | null;
          content?: string;
          rating?: number;
          avatar_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string | null;
          message: string;
          status: string;
          lead_id: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message: string;
          status?: string;
          created_at?: string;
                  lead_id?: string | null;
          updated_at?: string;
};
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          subject?: string | null;
          message?: string;
          status?: string;
          created_at?: string;
                  lead_id?: string | null;
          updated_at?: string;
};
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string;
          city: string | null;
          sector: string | null;
          source: string;
          source_id: string | null;
          accepts_marketing: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company: string;
          city?: string | null;
          sector?: string | null;
          source: string;
          source_id?: string | null;
          accepts_marketing?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string;
          city?: string | null;
          sector?: string | null;
          source?: string;
          source_id?: string | null;
          accepts_marketing?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          company: string | null;
          is_active: boolean;
          unsubscribed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          company?: string | null;
          is_active?: boolean;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          company?: string | null;
          is_active?: boolean;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      catalog_downloads: {
        Row: {
          id: string;
          catalog_id: string;
          lead_id: string | null;
          email: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          catalog_id: string;
          lead_id?: string | null;
          email?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          catalog_id?: string;
          lead_id?: string | null;
          email?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      site_config: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          value_json: Json | null;
          description: string | null;
          is_public: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string | null;
          value_json?: Json | null;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string | null;
          value_json?: Json | null;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      news: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          author: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          author: string | null;
          category: string | null;
          tags: string[] | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      v_leads_with_downloads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string;
          accepts_marketing: boolean;
          source: string;
          created_at: string;
          total_downloads: number | null;
          downloaded_documents: string[] | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      increment_download_count: {
        Args: { catalog_id: string };
        Returns: undefined;
      };
      set_updated_at: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
Enums: {};
    CompositeTypes: {};
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Insertable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type Updatable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
