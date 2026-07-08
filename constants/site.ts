export const SITE_CONFIG = {
  name: 'CCS Tornitech C.A.',
  tagline: 'Tornillería y fijación industrial',
  description:
    'Distribución de tornillería, anclajes y sistemas de fijación para la industria venezolana. Referencias bajo normas DIN, ISO y ASTM con asesoría técnica.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tornitech.com',
  locale: 'es_VE',
  phone: '+58 212 555 1234',
  whatsapp: '+584121234567',
  email: 'ventas@tornitech.com',
  address: 'Av. Principal, Zona Industrial La Yaguara, Caracas 1030, Venezuela',
  businessHours: 'Lunes a Viernes 8:00 – 18:00 · Sábados 9:00 – 14:00',
  responseTime: 'Respuesta en horario comercial dentro de las 24 horas hábiles.',
  social: {
    linkedin: 'https://linkedin.com/company/tornitech',
    facebook: 'https://facebook.com/tornitech',
    instagram: 'https://instagram.com/tornitech',
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
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Productos', href: '/#productos' },
  { name: 'Catálogos', href: '/#catalogos' },
  { name: 'Contacto', href: '/#contacto' },
];
