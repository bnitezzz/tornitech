export const SITE_CONFIG = {
  name: 'CCS Tornitech C.A.',
  tagline: 'Tornillería y fijación industrial',
  description:
    'Distribución de tornillería, anclajes y sistemas de fijación para la industria venezolana. Referencias bajo normas DIN, ISO y ASTM con asesoría técnica.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tornitech.com',
  locale: 'es_VE',
  phone: '0212-2398501 / 0212-2358456',
  phones: ['0212-2398501', '0212-2358456'],
  whatsapp: '+584242818062',
  email: 'info@ccstornitech.com',
  address: 'Av. tercera transversal de Montecristo entre 1era y 2da Av., Caracas 1071',
  businessHours: 'Lunes a Viernes 8:00am – 5:00pm · Sábado 9:00am – 2:00pm',
  responseTime: 'Respuesta en horario comercial dentro de las 24 horas hábiles.',
  social: {
    linkedin: '',
    facebook: '',
    instagram: 'https://www.instagram.com/ccstornitech/',
  },
  seo: {
    title: 'Tornillería y Fijación Industrial',
    description:
      'Distribución de tornillería, pernos, tuercas, arandelas y anclajes bajo normas DIN, ISO y ASTM. Cotización con ficha técnica y asesoría especializada.',
    keywords:
      'tornillería industrial, fijación, pernos, tornillos, tuercas, arandelas, anclajes, ASTM, DIN, ISO, distribución industrial, Venezuela, Caracas',
  },
};

export const NAVIGATION = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Productos', href: '/#productos' },
  { name: 'Catálogos', href: '/#catalogos' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Contacto', href: '/#contacto' },
];
