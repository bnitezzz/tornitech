import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  HeroSection,
  WhyChooseUsSection,
  ProductsSection,
  SectorsSection,
  StatsSection,
  PartnersSection,
  WorkProcessSection,
  CatalogsSection,
  AboutSection,
  ContactSection,
} from '@/components/sections';
import { SITE_CONFIG } from '@/constants/site';

// JSON-LD structured data
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
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
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address,
    addressLocality: 'Caracas',
    addressCountry: 'VE',
  },
  openingHours: 'Mo-Fr 08:00-18:00, Sa 09:00-14:00',
  priceRange: '$$',
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
      <main>
        <HeroSection />
        <WhyChooseUsSection />
        <ProductsSection />
        <SectorsSection />
        <StatsSection />
        <PartnersSection />
        <WorkProcessSection />
        <CatalogsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
