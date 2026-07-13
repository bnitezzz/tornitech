import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';

const AboutSection = dynamic(
  () => import('@/components/sections/about-section').then((m) => ({ default: m.AboutSection }))
);
const WhyChooseUsSection = dynamic(
  () => import('@/components/sections/why-choose-us-section').then((m) => ({ default: m.WhyChooseUsSection }))
);
const ProductsSection = dynamic(
  () => import('@/components/sections/products-section').then((m) => ({ default: m.ProductsSection }))
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

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}${ASSETS.logo.color}`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'sales',
    areaServed: 'VE',
    availableLanguage: 'Spanish',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address,
    addressLocality: 'Caracas',
    addressCountry: 'VE',
  },
  sameAs: [
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.instagram,
  ].filter(Boolean),
};

const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_CONFIG.url,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  image: `${SITE_CONFIG.url}${ASSETS.logo.color}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address,
    addressLocality: 'Caracas',
    addressCountry: 'VE',
  },
  openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-14:00',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLdOrganization, jsonLdLocalBusiness]),
        }}
      />
      <Header />
      <main id="contenido-principal">
        <HeroSection />
        <WhyChooseUsSection />
        <ProductsSection />
        <WorkProcessSection />
        <CatalogsSection />
        <AboutSection />
        <SectorsSection />
        <StatsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
