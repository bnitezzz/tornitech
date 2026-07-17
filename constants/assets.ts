/**
 * Rutas de assets en /public — deben coincidir con los archivos subidos.
 */
export const ASSETS = {
  logo: {
    /** Logo principal (header, footer) */
    primary: '/logo-tornitech.png',
    /** Open Graph / metadata */
    color: '/images/logo-tornitech-color.png',
    positivo: '/images/logo-tornitech-positivo.png',
  },
  isotipo: {
    color: '/images/isotipo-color.png',
    negativo: '/images/isotipo-negativo.png',
    positivo: '/images/isotipo-positivo.png',
  },
  hero: '/images/hero-section.jpg',
  about: '/images/img-nosotros.jpg',
  icons: {
    venta: '/icon/icon-venta.png',
    asesoria: '/icon/icon-asesoria.png',
    calidad: '/icon/icon-calidad.png',
    alcance: '/icon/icon-alcance.png',
    logistica: '/icon/icon-logistica.png',
    tratamientos: '/icon/icon-tratamientos.png',
  },
  sectors: {
    petroleo: '/images/img-petroleo.png',
    construccion: '/images/img-construcion.png',
    electrica: '/images/img-electrica.png',
    automotriz: '/images/img-automotriz.png',
    ferretera: '/images/img-ferretera.png',
  },
  catalogs: {
    general: '/images/img-catalogo.png',
    automotriz: '/images/img-catalogo-automotriz.png',
  },
  social: {
    /** Open Graph / Twitter card — 1200×630 */
    ogImage: '/images/og-image.jpg',
  },
  partners: {
    panamaFasteners: '/images/panamafasteners.jpeg',
  },
  products: {
    anclajesOjoGancho: '/images/products/anclajes-ojo-gancho-2013-2014.png',
    anclajeGancho: '/images/products/anclaje-gancho-2013.png',
    anclajeOjo: '/images/products/anclaje-ojo-2014.png',
    tornilloBronce2202: '/images/products/tornillo-bronce-2202.png',
    tornilloEstructural0317: '/images/products/tornillo-estructural-0317.png',
  },
} as const;
