/*
  Enterprise CMS — tablas de contenido, columnas de catálogo y seeds Fornitech.
*/

-- ─── Productos: campos de catálogo industrial ───────────────────────────────
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS din text,
  ADD COLUMN IF NOT EXISTS astm text,
  ADD COLUMN IF NOT EXISTS stock integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pdf_url text;

-- ─── FAQs ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── Testimonios ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text,
  company text,
  content text NOT NULL,
  rating smallint DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── Clientes / logos de confianza ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_faqs" ON public.faqs;
CREATE POLICY "public_read_faqs" ON public.faqs
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_testimonials" ON public.testimonials;
CREATE POLICY "public_read_testimonials" ON public.testimonials
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_clients" ON public.clients;
CREATE POLICY "public_read_clients" ON public.clients
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_brands" ON public.brands;
CREATE POLICY "public_read_brands" ON public.brands
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_certifications" ON public.certifications;
CREATE POLICY "public_read_certifications" ON public.certifications
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_sectors" ON public.sectors;
CREATE POLICY "public_read_sectors" ON public.sectors
  FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "public_read_partners" ON public.partners;
CREATE POLICY "public_read_partners" ON public.partners
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- ─── CMS: contenido de secciones (site_config) ─────────────────────────────
INSERT INTO public.site_config (key, value, description, is_public) VALUES
  ('company_name', 'FORNITECH INDUSTRIAL', 'Nombre comercial', true),
  ('company_tagline', 'Tornillería y fijación industrial', 'Eslogan', true),
  ('company_description', 'Distribución de tornillería, anclajes y sistemas de fijación para la industria venezolana.', 'Descripción SEO', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, is_public = true;

INSERT INTO public.site_config (key, value_json, description, is_public) VALUES
  ('hero', jsonb_build_object(
    'title', 'TORNILLERÍA Y SISTEMAS DE FIJACIÓN PARA LA INDUSTRIA',
    'subtitle', 'Suministro especializado para sectores automotriz, metalmecánico, manufactura y construcción.',
    'primaryCta', 'Solicitar cotización',
    'secondaryCta', 'Ver catálogo',
    'badges', jsonb_build_array('Calidad certificada', 'Entrega Nacional', 'Soporte Técnico')
  ), 'Contenido hero', true),
  ('why_choose_us', jsonb_build_object(
    'heading', '¿POR QUÉ ESCOGERNOS?',
    'subheading', 'Infraestructura comercial y soporte técnico para pedidos industriales.'
  ), 'Sección por qué escogernos', true),
  ('products_section', jsonb_build_object(
    'heading', 'PRODUCTOS ESPECIALES',
    'subheading', 'Componentes con norma técnica identificada, disponibles para cotización inmediata.'
  ), 'Sección productos', true),
  ('sectors_section', jsonb_build_object(
    'heading', 'SECTORES QUE ATENDEMOS',
    'subheading', 'Soluciones claves por industria'
  ), 'Sección sectores', true),
  ('stats_section', jsonb_build_object(
    'heading', 'INDICADORES',
    'items', jsonb_build_array(
      jsonb_build_object('value', 15, 'suffix', '+', 'label', 'Años de experiencia'),
      jsonb_build_object('value', 500, 'suffix', '+', 'label', 'Clientes industriales'),
      jsonb_build_object('value', 10000, 'suffix', '+', 'label', 'Referencias en catálogo'),
      jsonb_build_object('value', 24, 'suffix', 'h', 'label', 'Respuesta comercial')
    )
  ), 'Indicadores', true),
  ('brands_section', jsonb_build_object('heading', 'MARCAS', 'subheading', 'Fabricantes y líneas que representamos'), 'Marcas', true),
  ('certifications_section', jsonb_build_object('heading', 'CERTIFICACIONES', 'subheading', 'Normas y estándares de referencia'), 'Certificaciones', true),
  ('partner_section', jsonb_build_object(
    'heading', 'NUESTRO SOCIO COMERCIAL',
    'name', 'Panama Fasteners INC',
    'description', 'Aliado estratégico internacional que garantiza calidad, disponibilidad y soporte técnico especializado.',
    'highlights', jsonb_build_array('Inventario Internacional', 'Calidad Certificada', 'Soporte Técnico', 'Logística Internacional'),
    'cta', 'Conocer más'
  ), 'Socio comercial', true),
  ('work_process', jsonb_build_object('heading', '¿CÓMO TRABAJAMOS?', 'subheading', 'Proceso comercial en cuatro pasos'), 'Proceso', true),
  ('about_section', jsonb_build_object(
    'heading', 'QUIÉNES SOMOS',
    'intro', 'FORNITECH INDUSTRIAL distribuye al mayor y detal tornillería, anclajes y sistemas de fijación nacionales e importados.'
  ), 'Quiénes somos', true),
  ('mission', jsonb_build_object(
    'heading', 'MISIÓN',
    'content', 'Impulsar la industria venezolana con soluciones de fijación de vanguardia, respaldadas por calidad internacional, asesoría técnica y logística eficiente.'
  ), 'Misión', true),
  ('vision', jsonb_build_object(
    'heading', 'VISIÓN',
    'content', 'Consolidarnos como el referente líder en elementos de fijación en Venezuela, impulsando con innovación y excelencia los proyectos industriales más exigentes.'
  ), 'Visión', true),
  ('values', jsonb_build_object(
    'heading', 'VALORES',
    'items', jsonb_build_array(
      jsonb_build_object('title', 'Calidad', 'description', 'Referencias bajo norma con trazabilidad técnica.'),
      jsonb_build_object('title', 'Compromiso', 'description', 'Cumplimiento de plazos y especificaciones acordadas.'),
      jsonb_build_object('title', 'Asesoría', 'description', 'Soporte técnico en la selección de componentes.'),
      jsonb_build_object('title', 'Integridad', 'description', 'Transparencia comercial en cada cotización.')
    )
  ), 'Valores', true),
  ('clients_section', jsonb_build_object('heading', 'CLIENTES', 'subheading', 'Empresas que confían en nosotros'), 'Clientes', true),
  ('testimonials_section', jsonb_build_object('heading', 'TESTIMONIOS', 'subheading', 'Experiencias de nuestros clientes industriales'), 'Testimonios', true),
  ('faq_section', jsonb_build_object('heading', 'PREGUNTAS FRECUENTES', 'subheading', 'Respuestas a consultas comunes'), 'FAQ', true),
  ('cta_final', jsonb_build_object(
    'heading', '¿Listo para su próximo proyecto?',
    'subheading', 'Solicite una cotización con ficha técnica y plazo de entrega definido.',
    'primaryCta', 'Solicitar cotización',
    'secondaryCta', 'Contactar por WhatsApp'
  ), 'CTA final', true),
  ('contact_section', jsonb_build_object(
    'heading', 'CONTÁCTANOS',
    'subheading', 'Nuestro equipo está listo para ayudarte con tu proyecto.'
  ), 'Contacto', true)
ON CONFLICT (key) DO UPDATE SET value_json = EXCLUDED.value_json, is_public = true;

-- Seeds: sectores
INSERT INTO public.sectors (name, slug, image_url, display_order, is_active) VALUES
  ('Petróleo y Gas', 'petrolera', '/images/img-petrolera.png', 1, true),
  ('Construcción', 'construccion', '/images/img-construcion.png', 2, true),
  ('Eléctrica', 'electrica', '/images/img-electrica.png', 3, true),
  ('Automotriz', 'automotriz', '/images/img-automotriz.png', 4, true),
  ('Ferretera', 'ferretera', '/images/img-ferretera.png', 5, true)
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url, display_order = EXCLUDED.display_order;

-- Seeds: socio comercial
INSERT INTO public.partners (name, slug, logo_url, description, partner_type, display_order, is_active) VALUES
  ('Panama Fasteners INC', 'panama-fasteners', '/images/panamafasteners.jpeg',
   'Distribuidor internacional de tornillería y fijación estructural con inventario y soporte técnico especializado.',
   'commercial', 1, true)
ON CONFLICT (slug) DO UPDATE SET logo_url = EXCLUDED.logo_url, description = EXCLUDED.description;

-- Seeds: certificaciones
INSERT INTO public.certifications (name, code, description) VALUES
  ('DIN', 'DIN', 'Normas alemanas de tornillería industrial'),
  ('ISO', 'ISO', 'Organización Internacional de Normalización'),
  ('ASTM', 'ASTM', 'Sociedad Americana para Pruebas y Materiales'),
  ('API', 'API', 'American Petroleum Institute'),
  ('ANSI', 'ANSI', 'American National Standards Institute')
ON CONFLICT (code) DO NOTHING;

-- Seeds: FAQs
INSERT INTO public.faqs (question, answer, display_order) VALUES
  ('¿Cuál es el tiempo de entrega?', 'Los plazos dependen del volumen y disponibilidad. Confirmamos fecha en la cotización.', 1),
  ('¿Entregan factura y ficha técnica?', 'Sí. Cada pedido incluye documentación comercial y especificación del material.', 2),
  ('¿Atienden pedidos al mayor?', 'Sí. Trabajamos con distribuidores, ferreterías y proyectos industriales.', 3),
  ('¿Puedo cotizar por WhatsApp?', 'Sí. Use el botón Cotizar en cada producto o el botón flotante de WhatsApp.', 4);

-- Seeds: testimonios
INSERT INTO public.testimonials (author_name, author_role, company, content, display_order) VALUES
  ('Carlos Méndez', 'Jefe de Compras', 'Metalúrgica del Centro', 'Respuesta rápida y material conforme a especificación DIN. Muy recomendables.', 1),
  ('Ana Rodríguez', 'Ingeniera de Proyecto', 'Consorcio Eléctrico VE', 'La asesoría técnica nos ayudó a seleccionar el grado correcto para ambiente corrosivo.', 2);
