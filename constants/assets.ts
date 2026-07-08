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
  about: '/images/img-catalogo.png',
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
    estructural: '/images/img-catalogo-automotriz.png',
  },
  partners: {
    panamaFasteners: '/images/panamafasteners.jpeg',
  },
} as const;
