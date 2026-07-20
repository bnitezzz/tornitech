import {
  ClipboardList,
  SearchCheck,
  PenTool,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { ASSETS } from './assets';

export const HERO_CONTENT = {
  title: 'Tornillería y fijación industrial con trazabilidad técnica',
  subtitle: 'Pernos, tuercas, arandelas y anclajes para plantas, obras y talleres.',
  description:
    'Operamos como distribuidor mayorista de componentes de fijación bajo normas DIN, ISO y ASTM. Cada referencia se cotiza con ficha técnica, material identificado y plazo de entrega definido.',
  primaryCta: 'Solicitar cotización',
  secondaryCta: 'Consultar catálogo',
};

export const WHY_CHOOSE_US = {
  heading: 'Capacidades operativas',
  subheading: 'Infraestructura comercial y soporte técnico para pedidos industriales.',
  items: [
    {
      title: 'Venta mayor y detal',
      description: 'Pedidos ajustados al volumen de obra, planta o reventa.',
      image: ASSETS.icons.venta,
      imageVariant: 'icon' as const,
    },
    {
      title: 'Especificación verificada',
      description: 'Material, grado y norma confirmados antes del despacho.',
      image: ASSETS.icons.calidad,
      imageVariant: 'icon' as const,
    },
    {
      title: 'Asesoría técnica',
      description: 'Selección de referencia según carga, ambiente y normativa.',
      image: ASSETS.icons.asesoria,
      imageVariant: 'icon' as const,
    },
    {
      title: 'Cobertura multisectorial',
      description: 'Atención a petróleo, construcción, electricidad y automotriz.',
      image: ASSETS.icons.alcance,
      imageVariant: 'icon' as const,
    },
    {
      title: 'Logística coordinada',
      description: 'Entrega alineada al cronograma de su proyecto.',
      image: ASSETS.icons.logistica,
      imageVariant: 'icon' as const,
    },
    {
      title: 'Tratamientos especiales',
      description: 'Opciones de recubrimiento y tratamiento térmico bajo consulta.',
      image: ASSETS.icons.tratamientos,
      imageVariant: 'icon' as const,
    },
  ],
};

export const PRODUCTS_CONTENT = {
  heading: 'Productos Especiales',
  subheading: 'Selección destacada de componentes con norma técnica para cotización inmediata.',
};

export const PRODUCTOS_CATALOG_CONTENT = {
  heading: 'PRODUCTOS',
  subheading:
    'Busca por nombre, SKU, marca o categoría. Los resultados se consultan en tiempo real.',
  searchPlaceholder: 'Buscar por nombre, SKU, marca o categoría…',
  searchHint: 'Escribe al menos {min} caracteres para buscar.',
  idleMessage: 'Escribe en el buscador para encontrar productos del catálogo.',
  emptyMessage: 'No se encontraron productos.',
  homeLimitNote: 'Mostramos las primeras 5 categorías en la página de inicio.',
};

/** Max category cards on the homepage catalog section (legacy grid) */
export const PRODUCTOS_HOME_LIMIT = 5;

/** Max items listed inside each category card on home (legacy grid) */
export const PRODUCTOS_PREVIEW_LIMIT = 5;

export const DEFAULT_PRODUCTS = [
  {
    id: '1',
    sku: '2013 / 2014',
    name: 'Anclaje de ojo y gancho zincados',
    short_description: 'Anclajes de expansión con ojo o gancho, acabado zincado.',
    description:
      'Referencias 2013 (gancho) y 2014 (ojo) juntas: anclaje de expansión para concreto y mampostería, acabado zincado.',
    applications: 'Suspensión, amarre y fijación en concreto y mampostería.',
    benefits: 'Disponible en versión ojo o gancho; instalación por expansión.',
    sectors: 'Construcción, industrial, ferretero',
    specs: 'Zincado · Expansión · Ref. 2013 / 2014',
    image: ASSETS.products.anclajesOjoGancho,
  },
  {
    id: '2',
    sku: '1035',
    name: 'Anclaje de concreto inoxidable 304',
    short_description: 'Anclaje para concreto en acero inoxidable 304.',
    description:
      'Anclaje de concreto en acero inoxidable AISI 304, orientado a ambientes que requieren mayor resistencia a la corrosión.',
    applications: 'Fijación en concreto en interiores y exteriores con exigencia de corrosión.',
    benefits: 'Material inoxidable 304 para mayor durabilidad frente a la humedad.',
    sectors: 'Construcción, industrial, eléctrico',
    specs: 'Acero inoxidable 304 · Anclaje de concreto · Ref. 1035',
    image: null,
  },
  {
    id: '3',
    sku: '2202',
    name: 'Tornillo hexagonal, rosca corrida en bronce silicio',
    short_description: 'Tornillo hexagonal de bronce silicio con rosca corrida.',
    description:
      'Tornillo de cabeza hexagonal y rosca corrida fabricado en bronce silicio, adecuado para aplicaciones eléctricas y ambientes corrosivos.',
    applications: 'Conexiones eléctricas, entornos marinos y aplicaciones anticorrosivas.',
    benefits: 'Buena conductividad y resistencia a la corrosión propia del bronce silicio.',
    sectors: 'Eléctrico, industrial, construcción',
    specs: 'Bronce silicio · Rosca corrida · Ref. 2202',
    image: ASSETS.products.tornilloBronce2202,
  },
  {
    id: '4',
    sku: '0317',
    name: 'Tornillo estructural A325 con tuerca A194 grado 2H',
    short_description: 'Tornillo estructural A325 con tuerca A194-2H, negro o galvanizado en caliente.',
    description:
      'Tornillo estructural ASTM A325 suministrado con tuerca A194 grado 2H. Disponible en acabado negro y galvanizado en caliente.',
    applications: 'Uniones estructurales de acero en edificaciones e infraestructura.',
    benefits: 'Conjunto perno-tuerca para conexiones estructurales; dos acabados según exposición.',
    sectors: 'Construcción, infraestructura, industrial',
    specs: 'ASTM A325 · Tuerca A194-2H · Negro / galvanizado en caliente',
    image: ASSETS.products.tornilloEstructural0317,
  },
];

export const SECTORS_CONTENT = {
  heading: 'Sectores que atendemos',
  subheading: 'Seleccione un sector para ver las soluciones de fijación clave.',
  flipHint: 'Clic para ver soluciones',
  sectors: [
    {
      title: 'Petróleo',
      image: ASSETS.sectors.petroleo,
      solutions:
        'Barras Roscadas B-7, B-7M, B8, B8M, L7, Acero Inoxidable y Aleaciones Especiales.',
    },
    {
      title: 'Eléctrico',
      image: ASSETS.sectors.electrica,
      solutions: 'ASTM A394 (Galvanizado en caliente), Bronce Silicio, Acero Inoxidable 304/316.',
    },
    {
      title: 'Construcción',
      image: ASSETS.sectors.construccion,
      solutions: 'Tornillos Estructural (A-325/A-490), Anclajes Mecánicos y Químicos.',
    },
    {
      title: 'Automotriz',
      image: ASSETS.sectors.automotriz,
      solutions: 'Tornillos Métricos (8.8 y 12.9) y Abrazaderas de Manguera.',
    },
    {
      title: 'Ferretero',
      image: ASSETS.sectors.ferretera,
      solutions: 'Tornillos Grado 2, Guayas y Tensores.',
    },
  ],
};

export const SITE_STATS = [
  { value: 30, prefix: '+', suffix: '', label: 'años de experiencia', staticValue: null as string | null },
  { value: 6000, prefix: '+', suffix: '', label: 'productos', staticValue: null as string | null },
  {
    value: 0,
    prefix: '',
    suffix: '',
    label: 'a nivel nacional',
    staticValue: 'Entrega',
  },
];

export const TECHNICAL_STANDARDS = [
  { abbr: 'DIN', name: 'Norma alemana' },
  { abbr: 'ISO', name: 'Norma internacional' },
  { abbr: 'ASTM', name: 'Norma americana' },
  { abbr: 'API', name: 'Petróleo y gas' },
  { abbr: 'ANSI', name: 'Norma industrial' },
  { abbr: 'AISI', name: 'Aceros e inoxidables' },
  { abbr: 'SAE', name: 'Automotriz / mecánica' },
  { abbr: 'ASME', name: 'Equipos a presión' },
];

export const PARTNERS_CONTENT = {
  sectionHeading: 'Normas y socio comercial',
  sectionSubheading: 'Estándares internacionales de fijación y red de abastecimiento.',
  standardsHeading: 'Normas técnicas',
  standardsSubheading: 'Referencias disponibles conforme a estándares internacionales de fijación.',
  partnerHeading: 'Socio comercial',
  partnerName: 'Panama Fasteners Inc.',
  partnerLogo: ASSETS.partners.panamaFasteners,
  partnerDescription:
    'Canal de abastecimiento internacional para ampliar disponibilidad de referencias y plazos de entrega.',
};

export type ProcessStep = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const WORK_PROCESS: { heading: string; subheading: string; steps: ProcessStep[] } = {
  heading: 'Proceso de atención',
  subheading: 'Cuatro pasos claros para recibir su cotización con especificaciones verificadas.',
  steps: [
    {
      number: '1',
      icon: ClipboardList,
      title: 'Consulta',
      description: 'Recibimos su requerimiento con especificaciones, plano o muestra de referencia.',
    },
    {
      number: '2',
      icon: SearchCheck,
      title: 'Análisis técnico',
      description: 'Validamos norma, material, medida y condiciones de aplicación.',
    },
    {
      number: '3',
      icon: PenTool,
      title: 'Cotización',
      description: 'Emitimos propuesta con precio, plazo de entrega y condiciones comerciales.',
    },
    {
      number: '4',
      icon: Truck,
      title: 'Entrega',
      description: 'Preparamos el pedido, verificamos conformidad y coordinamos el despacho.',
    },
  ],
};

export const CATALOGS_CONTENT = {
  heading: 'Catálogos',
  subheading: 'Descargas técnicas con referencias, medidas y normas de tornillería y fijación.',
};

export const PROMO_BANNERS = {
  quote: {
    eyebrow: 'Asesoría técnica',
    title: '¿Necesita fijación certificada para su proyecto?',
    description: 'Indique norma, material y aplicación; le enviamos una cotización clara.',
    ctaLabel: 'Solicitar cotización',
    ctaHref: '/#contacto',
  },
  catalogs: {
    eyebrow: 'Documentación',
    title: 'Descargue el catálogo y compare referencias técnicas',
    description: 'PDF con medidas, normas DIN, ISO y ASTM para su especificación.',
    ctaLabel: 'Ver catálogos',
    ctaHref: '/#catalogos',
  },
} as const;

export const DEFAULT_CATALOGS = [
  {
    id: 'cat-1',
    title: 'Catálogo general',
    slug: 'catalogo-general',
    description: 'Referencia completa de tornillería y fijación industrial — Volumen 1, 2025.',
    file_url: '/catalogs/catalogo-general-vol1-2025.pdf',
    version: '2025',
    is_featured: true,
    is_active: true,
    display_order: 1,
    download_count: 0,
  },
  {
    id: 'cat-2',
    title: 'Catálogo Automotriz',
    slug: 'catalogo-automotriz',
    description: 'Tornillería y elementos de fijación para el sector automotriz — Volumen 1, 2025.',
    file_url: '/catalogs/catalogo-automotriz-vol1-2025.pdf',
    version: '2025',
    is_featured: true,
    is_active: true,
    display_order: 2,
    download_count: 0,
  },
];

export const ABOUT_CONTENT = {
  heading: 'Quiénes somos',
  intro:
    'CCS Tornitech C.A. es una empresa venezolana dedicada a la distribución de tornillería, anclajes y sistemas de fijación para la industria. Atendemos proyectos petroleros, eléctricos, de construcción, metalmecánica y automotriz con referencias nacionales e importadas.',
  mission: {
    title: 'Misión',
    text: 'Proveer componentes de fijación con las especificaciones técnicas que cada proyecto requiere, respaldados por asesoría especializada y entrega oportuna.',
  },
  vision: {
    title: 'Visión',
    text: 'Consolidarnos como referente técnico en tornillería y fijación industrial, priorizando trazabilidad de material, cumplimiento normativo y continuidad operativa para nuestros clientes.',
  },
  valuesHeading: 'Nuestros valores',
  valuesIntro: 'Definen nuestra operación y cada asesoría técnica que entregamos.',
  pillars: [
    {
      title: 'Orientación total al cliente',
      description: 'Escuchamos el requerimiento técnico y acompañamos cada proyecto.',
    },
    {
      title: 'Calidad y estándar',
      description: 'Precisión bajo normas ASTM y ASME en material nacional e importado.',
    },
    {
      title: 'Integridad y ética',
      description: 'Transparencia, honestidad y palabra empeñada en cada relación.',
    },
    {
      title: 'Mejora continua',
      description: 'Optimizamos procesos y catálogo de forma permanente.',
    },
    {
      title: 'Talento humano',
      description: 'Capacitación, respeto y seguridad laboral para el equipo.',
    },
  ],
};

export const CONTACT_CONTENT = {
  responseTime: 'Respuesta en horario comercial dentro de las 24 horas hábiles.',
  trustText: 'Sus datos se utilizan exclusivamente para atender su consulta comercial.',
  benefits: [
    'Cotización con precio, plazo y condiciones definidos.',
    'Asesoría técnica para selección de referencia.',
    'Despacho coordinado según su cronograma.',
  ],
  helpOptions: [
    {
      title: 'Solicitar cotización',
      description: 'Precios y disponibilidad de referencias específicas.',
    },
    {
      title: 'Hablar con un asesor',
      description: 'Atención personalizada para su proyecto.',
    },
    {
      title: 'Programa de distribuidores',
      description: 'Condiciones comerciales para reventa.',
    },
  ],
};

export const FOOTER_CATEGORIES = [
  { label: 'Tornillería métrica', href: '/#productos' },
  { label: 'Anclajes químicos', href: '/#productos' },
  { label: 'Fijación estructural', href: '/#productos' },
  { label: 'Tuercas y arandelas', href: '/#productos' },
  { label: 'Catálogos PDF', href: '/#catalogos' },
];
