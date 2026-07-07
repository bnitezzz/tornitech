/*
# Initial Schema for Industrial Catalog Platform

1. Purpose
   - Enterprise industrial parts catalog landing page
   - Lead capture and quote request system
   - Catalog download with lead tracking
   - Contact management
   - Prepared for future admin panel and blog

2. New Tables
   - categories: Product categories (e.g., Fasteners, Tools)
   - subcategories: Product subcategories linked to categories
   - brands: Product manufacturers/brands
   - certifications: Quality certifications (ISO, DIN, ASTM)
   - sectors: Industrial sectors (Oil & Gas, Construction, etc.)
   - products: Main product catalog with all specifications
   - catalogs: Downloadable PDF catalogs
   - partners: Commercial/business partners
   - quote_requests: Customer quote submissions
   - contact_submissions: Contact form submissions
   - leads: Lead capture for catalog downloads and newsletter
   - newsletter_subscribers: Newsletter signups
   - site_config: Site-wide configuration settings
   - news: Company news/announcements
   - blog_posts: Blog articles

3. Security
   - RLS enabled on all tables
   - Public read access for catalog browsing (anon, authenticated)
   - Public write access for forms/leads (anon, authenticated)
   - Prepared for future admin authentication

4. Notes
   - All tables use UUID primary keys
   - Timestamps for created_at/updated_at
   - Foreign key relationships maintained
   - Indexed for performance on search/filter queries
*/

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subcategories
CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Brands
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  logo_url text,
  description text,
  website_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  description text,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

-- Sectors (Industrial sectors)
CREATE TABLE IF NOT EXISTS sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon_name text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  short_description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id uuid REFERENCES subcategories(id) ON DELETE SET NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  specifications jsonb DEFAULT '{}',
  material text,
  grade text,
  standard text,
  diameter text,
  length text,
  weight text,
  unit text DEFAULT 'pieza',
  min_order_qty integer DEFAULT 1,
  image_url text,
  datasheet_url text,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product-Sector relationship (many-to-many)
CREATE TABLE IF NOT EXISTS product_sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sector_id uuid NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  UNIQUE(product_id, sector_id)
);

-- Product-Certification relationship (many-to-many)
CREATE TABLE IF NOT EXISTS product_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  certification_id uuid NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  UNIQUE(product_id, certification_id)
);

-- Catalogs
CREATE TABLE IF NOT EXISTS catalogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  file_url text NOT NULL,
  file_size text,
  cover_image_url text,
  version text,
  pages integer,
  language text DEFAULT 'es',
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  download_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Partners (Commercial partners)
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  logo_url text,
  description text,
  website_url text,
  partner_type text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quote Requests
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  sector text,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text,
  product_sku text,
  quantity text,
  message text,
  status text DEFAULT 'pending',
  source text DEFAULT 'web',
  created_at timestamptz DEFAULT now()
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Leads (for catalog downloads and general interest)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  city text,
  sector text,
  source text NOT NULL,
  source_id uuid,
  accepts_marketing boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  company text,
  is_active boolean DEFAULT true,
  unsubscribed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Catalog Downloads (tracking)
CREATE TABLE IF NOT EXISTS catalog_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalog_id uuid NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  email text,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Site Configuration
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text,
  value_json jsonb,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- News
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  image_url text,
  author text,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  image_url text,
  author text,
  category text,
  tags text[],
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Categories policies
DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories" ON categories FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Subcategories policies
DROP POLICY IF EXISTS "anon_read_subcategories" ON subcategories;
CREATE POLICY "anon_read_subcategories" ON subcategories FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_subcategories" ON subcategories;
CREATE POLICY "anon_insert_subcategories" ON subcategories FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Brands policies
DROP POLICY IF EXISTS "anon_read_brands" ON brands;
CREATE POLICY "anon_read_brands" ON brands FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_brands" ON brands;
CREATE POLICY "anon_insert_brands" ON brands FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Certifications policies
DROP POLICY IF EXISTS "anon_read_certifications" ON certifications;
CREATE POLICY "anon_read_certifications" ON certifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_certifications" ON certifications;
CREATE POLICY "anon_insert_certifications" ON certifications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Sectors policies
DROP POLICY IF EXISTS "anon_read_sectors" ON sectors;
CREATE POLICY "anon_read_sectors" ON sectors FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_sectors" ON sectors;
CREATE POLICY "anon_insert_sectors" ON sectors FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Products policies
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Product sectors policies
DROP POLICY IF EXISTS "anon_read_product_sectors" ON product_sectors;
CREATE POLICY "anon_read_product_sectors" ON product_sectors FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_product_sectors" ON product_sectors;
CREATE POLICY "anon_insert_product_sectors" ON product_sectors FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Product certifications policies
DROP POLICY IF EXISTS "anon_read_product_certifications" ON product_certifications;
CREATE POLICY "anon_read_product_certifications" ON product_certifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_product_certifications" ON product_certifications;
CREATE POLICY "anon_insert_product_certifications" ON product_certifications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Catalogs policies
DROP POLICY IF EXISTS "anon_read_catalogs" ON catalogs;
CREATE POLICY "anon_read_catalogs" ON catalogs FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_catalogs" ON catalogs;
CREATE POLICY "anon_insert_catalogs" ON catalogs FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Partners policies
DROP POLICY IF EXISTS "anon_read_partners" ON partners;
CREATE POLICY "anon_read_partners" ON partners FOR SELECT TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "anon_insert_partners" ON partners;
CREATE POLICY "anon_insert_partners" ON partners FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Quote requests policies (public can submit)
DROP POLICY IF EXISTS "anon_insert_quote_requests" ON quote_requests;
CREATE POLICY "anon_insert_quote_requests" ON quote_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Contact submissions policies (public can submit)
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Leads policies (public can submit)
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Newsletter subscribers policies
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Catalog downloads policies
DROP POLICY IF EXISTS "anon_insert_catalog_downloads" ON catalog_downloads;
CREATE POLICY "anon_insert_catalog_downloads" ON catalog_downloads FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Site config policies (public read)
DROP POLICY IF EXISTS "anon_read_site_config" ON site_config;
CREATE POLICY "anon_read_site_config" ON site_config FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_site_config" ON site_config;
CREATE POLICY "anon_insert_site_config" ON site_config FOR INSERT TO anon, authenticated WITH CHECK (true);

-- News policies
DROP POLICY IF EXISTS "anon_read_news" ON news;
CREATE POLICY "anon_read_news" ON news FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "anon_insert_news" ON news;
CREATE POLICY "anon_insert_news" ON news FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Blog posts policies
DROP POLICY IF EXISTS "anon_read_blog_posts" ON blog_posts;
CREATE POLICY "anon_read_blog_posts" ON blog_posts FOR SELECT TO anon, authenticated USING (is_published = true);
DROP POLICY IF EXISTS "anon_insert_blog_posts" ON blog_posts;
CREATE POLICY "anon_insert_blog_posts" ON blog_posts FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_standard ON products(standard);
CREATE INDEX IF NOT EXISTS idx_products_material ON products(material);
CREATE INDEX IF NOT EXISTS idx_products_grade ON products(grade);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_subcategories_category ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_slug ON subcategories(slug);

CREATE INDEX IF NOT EXISTS idx_catalogs_slug ON catalogs(slug);
CREATE INDEX IF NOT EXISTS idx_catalogs_category ON catalogs(category_id);
CREATE INDEX IF NOT EXISTS idx_catalogs_featured ON catalogs(is_featured) WHERE is_featured = true;

CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at DESC) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at DESC) WHERE is_published = true;
