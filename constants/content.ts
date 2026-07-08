import {
  ClipboardList,
  SearchCheck,
  PenTool,
  Factory,
  ShieldCheck,
  Truck,
  Headset,
  Package,
  Users,
  Layers,
  Thermometer,
  type LucideIcon,
} from 'lucide-react';

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
      image: 'https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Especificación verificada',
      description: 'Material, grado y norma confirmados antes del despacho.',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Asesoría técnica',
      description: 'Selección de referencia según carga, ambiente y normativa.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Cobertura multisectorial',
      description: 'Atención a petróleo, construcción, electricidad y automotriz.',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Logística coordinada',
      description: 'Entrega alineada al cronograma de su proyecto.',
      image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Tratamientos especiales',
      description: 'Opciones de recubrimiento y tratamiento térmico bajo consulta.',
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ],
};

export const PRODUCTS_CONTENT = {
  heading: 'Referencias de alta rotación',
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
      value: 'Piezas resistentes a corrosión, presión y ambientes agresivos.',
      image: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Construcción',
      value: 'Anclajes estructurales y fijación para obras civiles e industriales.',
      image: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Electricidad',
      value: 'Herrajes de fijación para tableros, canalizaciones e instalaciones.',
      image: 'https://images.pexels.com/photos/236089/pexels-photo-236089.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Automotriz',
      value: 'Tornillería de precisión para líneas de ensamblaje y talleres.',
      image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Ferretería',
      value: 'Surtido para reventa con referencias de rotación constante.',
      image: 'https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ],
};

export const COMMITMENT_INDICATORS = [
  {
    icon: ShieldCheck,
    title: 'Normas verificadas',
    description: 'Ficha técnica con norma DIN, ISO o ASTM en cada referencia.',
  },
  {
    icon: Package,
    title: 'Stock disponible',
    description: 'Referencias de alta rotación preparadas para despacho.',
  },
  {
    icon: Truck,
    title: 'Entrega coordinada',
    description: 'Despacho alineado al cronograma de su obra o planta.',
  },
  {
    icon: Headset,
    title: 'Soporte técnico',
    description: 'Asesoría antes y después de la compra.',
  },
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
  subheading: 'Desde la consulta inicial hasta el soporte postventa, con verificación en cada etapa.',
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
      title: 'Análisis',
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
      icon: Factory,
      title: 'Preparación',
      description: 'Confirmamos disponibilidad y preparamos el pedido para despacho.',
    },
    {
      number: '5',
      icon: ShieldCheck,
      title: 'Control de calidad',
      description: 'Verificamos conformidad de material y empaque antes del envío.',
    },
    {
      number: '6',
      icon: Truck,
      title: 'Entrega',
      description: 'Coordinamos la entrega según el cronograma acordado.',
    },
    {
      number: '7',
      icon: Headset,
      title: 'Soporte',
      description: 'Seguimiento postventa para ajustes o nuevos requerimientos.',
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
