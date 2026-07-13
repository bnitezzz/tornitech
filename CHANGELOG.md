## 2026-07-13 — Premium frontend polish

### UX / UI
- Productos: grid 2×2 en móvil con cards compactas (tipografía, padding y CTA adaptados).
- Navbar sticky con efecto glass al scroll, shrink suave y `aria-controls` en menú móvil.
- Contacto rediseñado con panel glassmorphism, fondo atmosférico y `SectionHeader` unificado.
- Presets de motion compartidos (`lib/motion.ts`) con easing premium y soporte `prefers-reduced-motion`.
- Ritmo visual: fondos alternados (proceso/nosotros `#f8fafc`), cards con `card-elevated`.
- Tipografía Sora con peso 800 real; botones navy solid unificados a `rounded-[10px]`.

### Accesibilidad
- CSS global para reducir motion; heading hierarchy en Misión/Visión (`h3`).
- Eliminado icono de enlace engañoso en socio comercial.

### Rendimiento
- Animaciones desacopladas y viewport once; sin nuevas dependencias.

## 2026-07-10 — Reorden de secciones

### Estructura
- Nuevo orden: Hero → Capacidades → Productos → Proceso → Catálogos → Nosotros → Sectores → Stats → Normas y socio comercial → Contacto.
- Stats restaurados entre Sectores y Normas, con tarjeta flotante y contadores animados.
- Renombrado «Documentación técnica» a «Catálogos».
- Actualizados títulos de Sectores y Partners en `constants/content.ts`.

## 2026-07-08 — Refinamiento visual premium

### Diseño y UX
- Espaciado optimizado con utilidad `.section-padding` en todas las secciones.
- Proceso de atención reducido a 4 pasos con composición horizontal limpia.
- Contacto simplificado: formulario protagonista, sidebar compacto de datos.
- Red de suministro: tarjeta premium con fotografía a pantalla completa.
- Estadísticas numéricas con contadores animados al entrar en viewport.
- Sectores: tarjetas minimalistas (imagen + nombre) con modal corporativo.
- Productos Especiales: título actualizado, expansión suave sin botón de catálogo.
- Misión/Visión rediseñada en bloque unificado minimalista con pilares integrados.
- Botón flotante de WhatsApp con acceso directo al número configurado.

## 2026-07-08 — Integración de lógica de negocio

### Formularios y backend
- Contacto: guarda en `contact_submissions`, crea lead, envía emails (equipo + confirmación), suscripción opcional a marketing.
- Catálogo PDF: crea lead, registra descarga (UUID válido), retorna `downloadUrl`, email al equipo.
- Servicios centralizados: `lib/leads.ts`, `lib/email.ts` (Resend), `lib/whatsapp.ts`.
- Componente reutilizable `WhatsAppLink` con mensajes dinámicos por contexto.
- Supabase degrada gracefully si faltan variables de entorno.
- Tipos explícitos en hooks (`ProductItem`, `CatalogItem`) — eliminado `any`.
- Añadidos `AGENTS.md` y `.env.example`.


### Contenido y copywriting
- Centralizado todo el contenido del sitio en `constants/content.ts`.
- Reescritos textos de Hero, Nosotros, Productos, Sectores, Proceso, Catálogos, Contacto y Footer con tono industrial corporativo.
- Eliminadas afirmaciones no verificables: "25 años de experiencia", "empresa líder", certificación ISO 9001 como badge propio.
- Sustituidas estadísticas ficticias por indicadores operativos cualitativos (normas, stock, entrega, soporte).
- Enriquecidos productos fallback con especificaciones, aplicaciones, beneficios y sectores.

### Estructura
- Reordenadas secciones: Hero → Nosotros → Capacidades → Productos → Sectores → Compromiso → Proceso → Normas → Catálogos → Contacto.
- Alineado el orden de navegación con la estructura real de la página.

### Diseño
- Rediseñado Hero: tipografía clara, eyebrow corporativo, CTAs primario/secundario.
- Creado componente reutilizable `SectionHeader` para encabezados consistentes.
- Añadidas utilidades CSS: `btn-navy`, `btn-navy-solid`, `section-container`, `text-body`.
- Unificados espaciados de sección (`py-16 md:py-24`) y contenedores (`max-w-[1320px]`).
- Mejoradas tarjetas de sectores, productos, about (pilares) y partners.

### Proceso de trabajo
- Ampliado a 7 etapas: Consulta, Análisis, Cotización, Preparación, Control de calidad, Entrega, Soporte.

### Contacto
- Añadidos horarios, tiempo de respuesta y beneficios de contactar.
- Eliminados badges de certificación no verificados; reemplazados por lista de beneficios.

### SEO y accesibilidad
- Corregido `themeColor` a `#052042`.
- Separado `viewport` de `metadata` (patrón Next.js 14+).
- Actualizado JSON-LD: logo correcto (`logo-tornitech.png`).
- Limpiado sitemap: eliminadas URLs con hash (mala práctica SEO).
- Mejorados textos `alt` de imágenes.
- `lang="es-VE"` en HTML root.
- Font display `swap` para mejor LCP.

### Código
- Reducida duplicación de copy hardcodeado en componentes.
- Partners: "Marcas y certificaciones" → "Normas técnicas" (estándares de producto, no certificaciones propias).
- Catálogos: eliminados metadatos ficticios de páginas/tamaño PDF.
