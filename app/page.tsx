import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { HeroSection } from '@/components/sections/hero-section';
import { PromoBanner } from '@/components/ui/promo-banner';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { PROMO_BANNERS } from '@/constants/content';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { getCachedSiteContactConfig } from '@/lib/site-config';

const AboutSection = dynamic(
  () => import('@/components/sections/about-section').then((m) => ({ default: m.AboutSection }))
);
const ProductsSection = dynamic(
  () => import('@/components/sections/products-section').then((m) => ({ default: m.ProductsSection }))
);
const ProductosCatalogSection = dynamic(
  () => import('@/components/sections/productos').then((m) => ({ default: m.Productos }))
);
const SectorsSection = dynamic(
  () => import('@/components/sections/sectors-section').then((m) => ({ default: m.SectorsSection }))
);
const StatsSection = dynamic(
  () => import('@/components/sections/stats-section').then((m) => ({ default: m.StatsSection }))
);
const WorkProcessSection = dynamic(
  () => import('@/components/sections/work-process-section').then((m) => ({ default: m.WorkProcessSection }))
);
const PartnersSection = dynamic(
  () => import('@/components/sections/partners-section').then((m) => ({ default: m.PartnersSection }))
);
const CatalogsSection = dynamic(
  () => import('@/components/sections/catalogs-section').then((m) => ({ default: m.CatalogsSection }))
);
const ContactSection = dynamic(
  () => import('@/components/sections/contact-section').then((m) => ({ default: m.ContactSection }))
);

export default async function HomePage() {
  const contact = await getCachedSiteContactConfig();

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${ASSETS.logo.color}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone,
      contactType: 'sales',
      areaServed: 'VE',
      availableLanguage: 'Spanish',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressLocality: 'Caracas',
      postalCode: '1071',
      addressCountry: 'VE',
    },
    sameAs: [
      contact.social.linkedin,
      contact.social.facebook,
      contact.social.instagram,
    ].filter(Boolean),
  };

  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${SITE_CONFIG.url}${ASSETS.logo.color}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressLocality: 'Caracas',
      postalCode: '1071',
      addressCountry: 'VE',
    },
    openingHours: 'Mo-Fr 08:00-17:00, Sa 09:00-14:00',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLdOrganization, jsonLdLocalBusiness]),
        }}
      />
      <SkipLink />
      <Header />
      <main id="contenido-principal">
        <HeroSection />
        <SectorsSection />
        <ProductsSection />
        <ProductosCatalogSection />
        <PromoBanner {...PROMO_BANNERS.catalogs} variant="blue" className="section-bg-soft-solid" />
        <WorkProcessSection />
        <CatalogsSection />
        <AboutSection />
        <StatsSection />
        <PartnersSection />
        <PromoBanner {...PROMO_BANNERS.quote} variant="navy" />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
