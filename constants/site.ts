export const SITE_CONFIG = {
  name: 'CCS Tornitech C.A.',
  tagline: 'Soluciones en Tornillería y Fijación Industrial',
  description: 'Empresa líder en distribución de tornillería, fijación y componentes industriales. Más de 25 años de experiencia apoyando a la industria.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tornitech.com',
  locale: 'es_VE',
  phone: '+58 212 555 1234',
  whatsapp: '+584121234567',
  email: 'ventas@tornitech.com',
  address: 'Av. Principal, Zona Industrial La Yaguara, Caracas 1030, Venezuela',
  businessHours: 'Lunes a Viernes 8:00 - 18:00, Sábados 9:00 - 14:00',
  yearsExperience: 25,
  social: {
    linkedin: 'https://linkedin.com/company/tornitech',
    facebook: 'https://facebook.com/tornitech',
    instagram: 'https://instagram.com/tornitech',
  },
  seo: {
    description: 'Distribuidor líder de tornillería, pernos, tuercas y fijación industrial. ASTM, DIN, ISO. Servicio técnico especializado. Cotiza hoy.',
    keywords: 'tornillería industrial, fijación, pernos, tornillos, tuercas, ASTM, DIN, ISO, distribución industrial, arandelas, anclajes',
  },
};

export const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/#productos' },
  { name: 'Catálogos', href: '/#catalogos' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Contacto', href: '/#contacto' },
];
