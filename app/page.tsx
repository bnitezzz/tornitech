import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { HeroSection } from '@/components/sections/hero-section';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { BrandsSection } from '@/components/home/brands-section';
import { CertificationsSection } from '@/components/home/certifications-section';
import { CommercialPartnerSection } from '@/components/home/commercial-partner-section';
import { MissionSection, VisionSection } from '@/components/home/mission-vision-section';
import { ValuesSection } from '@/components/home/values-section';
import { ClientsSection, TestimonialsSection, FaqSection } from '@/components/home/trust-sections';
import { CtaFinalSection } from '@/components/home/cta-final-section';
import { fetchSiteConfigValues } from '@/services/configuracion';

const WhyChooseUsSection = dynamic(() =>
  import('@/components/sections/why-choose-us-section').then((m) => ({ default: m.WhyChooseUsSection }))
);
const ProductsSection = dynamic(() =>
  import('@/components/sections/products-section').then((m) => ({ default: m.ProductsSection }))
);
const SectorsSection = dynamic(() =>
  import('@/components/sections/sectors-section').then((m) => ({ default: m.SectorsSection }))
);
const StatsSection = dynamic(() =>
  import('@/components/sections/stats-section').then((m) => ({ default: m.StatsSection }))
);
const CatalogsSection = dynamic(() =>
  import('@/components/catalogs/catalogs-section').then((m) => ({ default: m.CatalogsSection }))
);
const WorkProcessSection = dynamic(() =>
  import('@/components/sections/work-process-section').then((m) => ({ default: m.WorkProcessSection }))
);
const AboutIntroSection = dynamic(() =>
  import('@/components/home/about-intro-section').then((m) => ({ default: m.AboutIntroSection }))
);
const ContactSection = dynamic(() =>
  import('@/components/contact/contact-section').then((m) => ({ default: m.ContactSection }))
);

export default async function HomePage() {
  const siteConfig = await fetchSiteConfigValues();
  const orgName = siteConfig.company_name || SITE_CONFIG.name;
  const phone = siteConfig.phone || SITE_CONFIG.phone;
  const email = siteConfig.contact_email || SITE_CONFIG.email;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: orgName,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}${ASSETS.logo.color}`,
        description: siteConfig.company_description || SITE_CONFIG.description,
      },
      {
        '@type': 'LocalBusiness',
        name: orgName,
        telephone: phone,
        email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address,
          addressCountry: 'VE',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SkipLink />
      <Header />
      <main id="contenido-principal">
        {/* 1 Hero */}
        <HeroSection />
        {/* 2 ¿Por qué escogernos? */}
        <WhyChooseUsSection />
        {/* 3 Productos Especiales */}
        <ProductsSection />
        {/* 4 Sectores */}
        <SectorsSection />
        {/* 5 Indicadores */}
        <StatsSection />
        {/* 6 Marcas */}
        <BrandsSection />
        {/* 7 Certificaciones */}
        <CertificationsSection />
        {/* 8 Socio Comercial */}
        <CommercialPartnerSection />
        {/* 9 Catálogos */}
        <CatalogsSection />
        {/* 10 Cómo Trabajamos */}
        <WorkProcessSection />
        {/* 11 Quiénes Somos */}
        <AboutIntroSection />
        {/* 12 Misión */}
        <MissionSection />
        {/* 13 Visión */}
        <VisionSection />
        {/* 14 Valores */}
        <ValuesSection />
        {/* 15 Clientes */}
        <ClientsSection />
        {/* 16 Testimonios */}
        <TestimonialsSection />
        {/* 17 FAQ */}
        <FaqSection />
        {/* 18 CTA Final */}
        <CtaFinalSection />
        {/* 19 Contacto */}
        <ContactSection />
      </main>
      {/* 20 Footer */}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
