import {
  ClipboardList,
  SearchCheck,
  PenTool,
  ShieldCheck,
  Truck,
  Users,
  Layers,
  Thermometer,
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
  subheading: 'Componentes con norma técnica identificada, disponibles para cotización inmediata.',
};

export const DEFAULT_PRODUCTS = [
  {
    id: '1',
    sku: '933-8.8-M12',
    name: 'Tornillo hexagonal DIN 933',
    short_description: 'Tornillo de cabeza hexagonal, rosca métrica completa.',
    description: 'Acero grado 8.8, rosca métrica ISO. Aplicaciones en maquinaria y estructuras metálicas.',
    applications: 'Ensamblaje de equipos, bastidores y conexiones mecánicas.',
    benefits: 'Alta resistencia a tracción, disponible en múltiples diámetros.',
    sectors: 'Industrial, automotriz, metalmecánica',
    specs: 'Norma DIN 933 · Grado 8.8 · Acero carbono',
    image: 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    sku: '931-10.9-M16',
    name: 'Tornillo hexagonal DIN 931',
    short_description: 'Tornillo con cuello, rosca parcial.',
    description: 'Acero grado 10.9 para aplicaciones de alta exigencia mecánica.',
    applications: 'Uniones estructurales sometidas a carga dinámica.',
    benefits: 'Resistencia superior, rosca parcial para ajuste preciso.',
    sectors: 'Construcción, petróleo, minería',
    specs: 'Norma DIN 931 · Grado 10.9 · Acero aleado',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    sku: 'ISO4014-M20',
    name: 'Perno hexagonal ISO 4014',
    short_description: 'Perno de alta resistencia para conexiones estructurales.',
    description: 'Conforme a ISO 4014, utilizado en ensamblajes de acero estructural.',
    applications: 'Estructuras metálicas, puentes, edificaciones industriales.',
    benefits: 'Compatibilidad internacional, trazabilidad de lote.',
    sectors: 'Construcción, infraestructura',
    specs: 'Norma ISO 4014 · Grado 8.8/10.9 · Acero carbono',
    image: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    sku: 'DIN985-M8',
    name: 'Tuerca autoblocante DIN 985',
    short_description: 'Tuerca con inserto de nylon antivibración.',
    description: 'Resiste aflojamiento en equipos con vibración continua.',
    applications: 'Maquinaria rotativa, equipos móviles, instalaciones eléctricas.',
    benefits: 'Fijación segura sin contratuerca adicional.',
    sectors: 'Automotriz, electricidad, industrial',
    specs: 'Norma DIN 985 · Insert nylon · Acero 8',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    sku: 'ASTM-A325',
    name: 'Perno estructural ASTM A325',
    short_description: 'Perno de alta resistencia para acero estructural.',
    description: 'Diseñado para conexiones críticas en edificaciones y puentes.',
    applications: 'Estructuras de acero soldadas y atornilladas.',
    benefits: 'Resistencia certificada bajo norma ASTM, control de torque.',
    sectors: 'Construcción, infraestructura',
    specs: 'Norma ASTM A325 · Acero aleado · Tipo 1',
    image: 'https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '6',
    sku: 'DIN934-M10',
    name: 'Tuerca hexagonal DIN 934',
    short_description: 'Tuerca estándar de uso general.',
    description: 'Tuerca hexagonal métrica para ensamblajes convencionales.',
    applications: 'Fijación general en equipos, estructuras y tuberías.',
    benefits: 'Amplia disponibilidad, compatibilidad con pernos métricos.',
    sectors: 'Industrial, ferretero, construcción',
    specs: 'Norma DIN 934 · Grado 8 · Acero carbono',
    image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '7',
    sku: 'DIN9021-M12',
    name: 'Arandela plana DIN 9021',
    short_description: 'Arandela de gran diámetro exterior.',
    description: 'Mayor área de apoyo para distribuir carga en materiales blandos.',
    applications: 'Fijación en madera, plásticos y paneles compuestos.',
    benefits: 'Evita hundimiento del material de apoyo.',
    sectors: 'Construcción, carpintería industrial',
    specs: 'Norma DIN 9021 · Acero zincado',
    image: 'https://images.pexels.com/photos/4491900/pexels-photo-4491900.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '8',
    sku: 'HILTI-HIT-M16',
    name: 'Anclaje químico HIT-HY',
    short_description: 'Sistema de anclaje de alta carga para concreto.',
    description: 'Anclaje químico para fijación en concreto y mampostería.',
    applications: 'Anclaje de equipos, barandillas, estructuras en obra.',
    benefits: 'Alta capacidad de carga, instalación en posición vertical u horizontal.',
    sectors: 'Construcción, infraestructura',
    specs: 'Resina epoxi · Varilla roscada · Concreto ≥ C20/25',
    image: 'https://images.pexels.com/photos/8961459/pexels-photo-8961459.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const SECTORS_CONTENT = {
  heading: 'Sectores atendidos',
  subheading: 'Componentes de fijación seleccionados según las condiciones de cada industria.',
  sectors: [
    {
      title: 'Petróleo y gas',
      description: 'Piezas resistentes a corrosión, presión y ambientes agresivos.',
      image: ASSETS.sectors.petroleo,
      products: [
        'Pernos estructurales ASTM A325',
        'Tuercas hexagonales DIN 934',
        'Anclajes químicos para concreto',
        'Arandelas planas de acero inoxidable',
      ],
    },
    {
      title: 'Construcción',
      description: 'Anclajes estructurales y fijación para obras civiles e industriales.',
      image: ASSETS.sectors.construccion,
      products: [
        'Pernos hexagonales ISO 4014',
        'Anclajes químicos HIT-HY',
        'Tornillería estructural grado 10.9',
        'Sistemas de fijación para mampostería',
      ],
    },
    {
      title: 'Electricidad',
      description: 'Herrajes de fijación para tableros, canalizaciones e instalaciones.',
      image: ASSETS.sectors.electrica,
      products: [
        'Tornillos autorroscantes y métricos',
        'Tuercas autoblocantes DIN 985',
        'Arandelas de presión y planas',
        'Anclajes para montaje de equipos',
      ],
    },
    {
      title: 'Automotriz',
      description: 'Tornillería de precisión para líneas de ensamblaje y talleres.',
      image: ASSETS.sectors.automotriz,
      products: [
        'Tornillos hexagonales DIN 933',
        'Tuercas autoblocantes antivibración',
        'Pernos de alta resistencia',
        'Arandelas especiales de retención',
      ],
    },
    {
      title: 'Ferretería',
      description: 'Surtido para reventa con referencias de rotación constante.',
      image: ASSETS.sectors.ferretera,
      products: [
        'Tornillería métrica de uso general',
        'Tuercas y arandelas estándar',
        'Pernos y tornillos por grado',
        'Kits de fijación por aplicación',
      ],
    },
  ],
};

export const SITE_STATS = [
  { value: 5, prefix: '', suffix: '', label: 'Sectores industriales' },
  { value: 5, prefix: '', suffix: '', label: 'Normas internacionales' },
  { value: 4, prefix: '', suffix: '', label: 'Etapas de cotización' },
  { value: 24, prefix: '', suffix: 'h', label: 'Respuesta comercial' },
];

export const TECHNICAL_STANDARDS = [
  { abbr: 'DIN', name: 'Norma alemana' },
  { abbr: 'ISO', name: 'Norma internacional' },
  { abbr: 'ASTM', name: 'Norma americana' },
  { abbr: 'API', name: 'Petróleo y gas' },
  { abbr: 'ANSI', name: 'Norma industrial' },
];

export const PARTNERS_CONTENT = {
  standardsHeading: 'Normas técnicas',
  standardsSubheading: 'Referencias disponibles conforme a estándares internacionales de fijación.',
  partnerHeading: 'Red de suministro',
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
  heading: 'Documentación técnica',
  subheading: 'Catálogos con referencias, medidas y normas de nuestra línea de tornillería y fijación.',
};

export const DEFAULT_CATALOGS = [
  {
    id: 'cat-1',
    title: 'Catálogo general de tornillería',
    slug: 'catalogo-tornilleria-general',
    description: 'Referencia completa de tornillos, pernos, tuercas y arandelas industriales.',
    file_url: '/catalogs/tornilleria-general-2024.pdf',
    version: '2024',
    is_featured: true,
    is_active: true,
    display_order: 1,
    download_count: 0,
  },
  {
    id: 'cat-2',
    title: 'Catálogo de fijación estructural',
    slug: 'catalogo-fijacion-estructural',
    description: 'Elementos de fijación para construcción y estructuras metálicas.',
    file_url: '/catalogs/fijacion-estructural-2024.pdf',
    version: '2024',
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
  pillars: [
    { icon: Layers, title: 'Procesos', description: 'Flujo de cotización, verificación y despacho documentado en cada pedido.' },
    { icon: ShieldCheck, title: 'Calidad', description: 'Material identificado con ficha técnica y norma de referencia.' },
    { icon: Users, title: 'Equipo', description: 'Personal con experiencia en selección de componentes para entornos industriales.' },
    { icon: Thermometer, title: 'Compromiso', description: 'Seguimiento postventa y atención a requerimientos recurrentes.' },
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
