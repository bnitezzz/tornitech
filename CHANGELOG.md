## 2026-07-15 — Header ancho, límites de productos y scroll horizontal

### Layout
- Header (cinta + navbar) a ancho completo hasta 1920px, fondo full-bleed y más padding lateral.
- Secciones densas con `.section-padding-tight` para reducir fatiga de scroll.

### Productos
- Productos especiales y catálogo de categorías: máximo **5** en home (sin expandir listas largas).
- Carruseles horizontales en Capacidades, Productos, Sectores.

### Catálogos
- Recuadros horizontales compactos con descarga por fila.

### Banners
- Franjas CTA entre Productos/Proceso y antes de Contacto (`PromoBanner`).

## 2026-07-13 — Navbar: anclas y scroll con offset

### Navegación
- Enlaces del Header (y Footer) hacen scroll suave a las secciones correctas: `#inicio`, `#productos`, `#catalogos`, `#nosotros`, `#contacto`.
- Offset de ~72px para que el sticky header no tape el título de la sección.
- Soporte de hash al cargar/recargar (`/#productos`, etc.) y `prefers-reduced-motion`.
- `scroll-padding-top` / `scroll-margin-top` en CSS global.

## 2026-07-13 — Contacto editable desde Supabase

### Funcionalidad
- La web lee WhatsApp, email, teléfono, dirección, horario y redes desde `site_config`.
- Fallback a `constants/site.ts` si Supabase no responde o faltan keys.
- Header, Footer, Contacto, botón WhatsApp, JSON-LD y páginas legales usan esos datos.
- Inbox de notificaciones: `EMAIL_TO` → `contact_email` en Supabase → constante.

### Código
- `lib/site-config.ts`, `lib/site-contact-defaults.ts`, `types/site-contact.ts`
- Provider `SiteContactBridge` / `SiteContactProvider` en el layout.

## 2026-07-13 — Ejemplos CSV para Supabase

### Contenido
- Carpeta `supabase/ejemplos/` con CSV de ejemplo para importar en Table Editor:
  `productos.csv`, `products.csv`, `catalogs.csv`, `configuracion_web.csv`, `site_config.csv`.
- Guía `COMO-IMPORTAR.txt` con pasos de importación y mapeo archivo → tabla.
- Eliminado `supabase/data/productos.example.csv` (sustituido por `ejemplos/productos.csv`).

## 2026-07-13 — Sección PRODUCTOS (catálogo Supabase)

### Funcionalidad
- Nueva sección **PRODUCTOS** entre Productos Especiales y Proceso de Atención.
- Datos desde tablas `productos` y `configuracion_web` (toggle `mostrar_productos`).
- Buscador en tiempo real por nombre, categoría y descripción.
- Cards por categoría (grid 1 / 2-3 / 5), orden alfabético de categorías y `orden` interno.
- Si `mostrar_productos = false` o no hay datos, la sección no se renderiza.

### Backend
- Migración `004_productos_catalogo.sql` con RLS de lectura pública (`activo = true`).
- Servicio `lib/productos.ts`, hook `hooks/use-productos.ts`, tipos en `types/producto.ts`.

### Importación
- Cargar productos vía CSV en Supabase Table Editor (ver `supabase/ejemplos/`).

## 2026-07-15 — Mobile layout refinements

### UX / UI
- Proceso de atención: carrusel con timeline 1–4 en móvil; timeline centrado con números más grandes y banners sin recuadro.
- Catálogos: cards horizontales compactas en pantallas pequeñas.
- Valores (pilares): lista sin recuadros en móvil.
- Stats: una sola fila en móvil, sobrepuesta a mitad entre Sectores (azul) y el fondo blanco.

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
