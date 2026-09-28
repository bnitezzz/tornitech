## 2026-09-28 — Carga más rápida

### Rendimiento
- Imágenes pesadas recomprimidas sin cambiar rutas ni el aspecto de la marca.
- La ficha de contacto no bloquea la página más de 1,2 s y se lee una sola vez por visita.
- Fotos de portada, sectores y productos salen en AVIF/WebP con caché de una semana.
- El HTML sigue sin cachearse en Netlify para no repetir la página en blanco.

## 2026-09-27 — Limpieza del catálogo antiguo y páginas de error

### Código
- Eliminado el listado por categorías que ya no se renderiza: `useProductos`, `ProductosGrid`, `ProductosCard`, `ProductosItem` y `HorizontalScroll`.
- Eliminadas las fotos sueltas de anclaje que no usa la sección de productos.
- Páginas 404 y de error con la marca, sin listado de archivos.

## 2026-08-28 — Catálogo Automotriz PFI-2026

### Contenido
- Nuevo PDF `catalogo-automotriz-pfi-2026-v290726.pdf` en `private-catalogs/` (reemplaza v260826).
- Portada actualizada en `public/images/img-catalogo-automotriz.png`.
- Referencias y Supabase alineados con versión `v290726`.

## 2026-08-27 — Catálogo Automotriz AUT-v260826

### Contenido
- Reemplazo del PDF Automotriz: `catalogo-automotriz-v260826.pdf` en `private-catalogs/` (se elimina `catalogo-automotriz-vol1-2025.pdf`).
- Referencias actualizadas en fallback, script de sync, CSV de ejemplo y schema seed.

## 2026-08-05 — Hardening completo + upgrade Next.js 16

### Framework
- Upgrade a **Next.js 16.3.0** + **React 19.2.8** + ESLint flat config.
- `headers()` async, `viewport`/`themeColor` separados, `proxy.ts` (CSP con nonce).
- Tooling de lint/types movido a `devDependencies`; `engines.node >= 20.9.0`.

### Seguridad
- PDFs fuera de `public/` → `private-catalogs/` + descarga firmada 5 min (`/api/catalogs/download`).
- `price`/`stock` fuera del SELECT y UI públicos; migración SQL de column grants (aplicar en Supabase).
- Honeypot `website` en contacto y catálogo (éxito silencioso si un bot lo rellena).
- CSP production sin `unsafe-inline` en scripts (nonce + `strict-dynamic`).
- Hosts Supabase genéricos `*.supabase.co` (sin project ref hardcodeado en CSP/images).
- Rate limit fail-closed + timeouts SendGrid (10s) / Upstash (3s).

### Deploy
1. Netlify: Node 20.9+, env `CATALOG_DOWNLOAD_SECRET` (≥32 chars) y **Clear cache and deploy**.
2. Supabase: aplicar `supabase/migrations/20260805211917_protect_public_catalog_columns.sql`.

## 2026-08-05 — Hardening: rate limit fail-closed + timeouts SendGrid/Upstash

### Seguridad / disponibilidad
- Rate limit en producción: **fail-closed** si todos los backends (Upstash/RPC) fallan.
- `sendEmail`: timeout 10s (`AbortSignal.timeout`) + log de timeouts.
- Upstash: timeout 3s en pipeline/expire.
- Formularios: log si el email al equipo/confirmación no se envía (el lead en BD sigue siendo la fuente de verdad).

## 2026-08-05 — Fix: enlace compartido abre página en blanco / pegada

### Bug
- Netlify Durable Cache servía HTML como **HTTP 304 sin cuerpo** a visitantes nuevos (p. ej. abrir el link desde WhatsApp/Mensajes) → pantalla negra / “pegada”.
- Carga de `site_config` sin timeout podía dejar el shell en “Cargando…”.

### Fix
- `app/layout.tsx`: `dynamic = 'force-dynamic'` (quita ISR que provocaba el 304 vacío).
- Headers `Cache-Control` / `Netlify-CDN-Cache-Control` no-store en HTML (`next.config.js`, `netlify.toml`).
- Timeout 4s + fallback a defaults en `lib/site-config.ts`.

### Deploy
- En Netlify: **Clear cache and deploy site** tras publicar este cambio (purga el 304 vacío ya cacheado).

## 2026-08-05 — SendGrid + guía de entrega al cliente

### Email
- Migración de Resend a **SendGrid** (`lib/email.ts`, API v3).
- Variable `SENDGRID_API_KEY` reemplaza `RESEND_API_KEY`.
- Script `npm run verify:sendgrid`.

### Operaciones
- `docs/ENTREGA-CUENTAS-CLIENTE.md`: checklist para transferir Supabase, Netlify, GitHub y SendGrid al correo del cliente.
- `CLIENT_CONTACT_EMAIL` en `.env.local` para `update:site-config` y verificación.

## 2026-07-22 — Hero móvil: overlay y descripción en negro

### UX / UI
- Hero en móvil: gradiente suave detrás del texto (mejor que bajar opacidad de toda la foto).
- Descripción del Hero en negro y peso medio en pantallas pequeñas.

## 2026-08-03 — Sectores y tipografía de productos especiales

### Contenido
- Listas de flip cards de Sectores actualizadas (Automotriz, Ferretero, Construcción, Eléctrico, Petróleo).
- Nombres de **Productos Especiales** en mayúsculas; descripciones en oración con ortografía corregida.

## 2026-07-22 — Dirección → Google Maps

### UI
- La dirección en Contacto, footer, ticker del header y páginas legales abre Google Maps en una pestaña nueva.

## 2026-07-21 — Sectores: líneas de producto por card

### UI / contenido
- Flip cards de **Sectores que atendemos** con listas reales (Petróleo, Eléctrico, Construcción, Automotriz, Ferretero).
- Eliminado el rótulo “Soluciones de fijación clave” en el reverso para ganar espacio.

## 2026-07-20 — Catálogo productos (Excel + búsqueda)

### Base de datos
- Migración `008_productos_catalog_expand`: columnas del Excel Panama Fasteners (`source_id`, `especificacion_tecnica`, `medidas`, `acabado`, `presentacion`, `grupo`, `familia`, `url_fotografia`, `url_producto`, `contenido`) más `sku`, `brand`, `subcategory`, `datasheet_url`, `stock`, `price`, `updated_at`.
- Índices btree + `pg_trgm` en `nombre`, `sku`, `brand`, `categoria`.
- RLS: solo `SELECT` para `anon`/`authenticated` (`activo = true`); escrituras vía `service_role`.

### Importación
- Script `npm run import:productos` (`scripts/import-productos-excel.mjs`) con dedupe por `source_id` / nombre.

### Frontend
- Buscador server-side con debounce (`SearchProducts` + `ProductModal`).
- No descarga el catálogo completo al cargar; consulta Supabase al escribir.
- Placeholder de imagen, skeleton, vacío y errores.



### Configuración
- Correo principal, comercial y de formularios actualizado a `info@ccstornitech.com`.
- Fallback de la aplicación, configuración de Supabase y variables de ejemplo alineados.

## 2026-07-17 — Foto Quiénes somos

### UI / contenido
- Imagen de fachada Tornitech en `public/images/img-nosotros.jpg` para la sección Nosotros (`ASSETS.about`).

## 2026-07-17 — Navbar scroll spy

### UI
- El ítem activo del header ya no se queda en Catálogos al pasar por Nosotros: spy por posición de scroll (no IntersectionObserver).

## 2026-07-17 — Productos especiales con fotos reales

### UI / contenido
- Reemplazo de la vitrina **Productos Especiales** por referencias reales:
  - **2013 / 2014** Anclaje de ojo y gancho zincados (foto conjunta)
  - **1035** Anclaje de concreto inoxidable 304 (texto listo; foto pendiente)
  - **2202** Tornillo hexagonal rosca corrida en bronce silicio
  - **0317** Tornillo estructural A325 con tuerca A194-2H (negro / galvanizado en caliente)
- Fotos locales en `public/images/products/`; cards con `object-contain` sobre fondo blanco.
- Fallback offline y CSV de ejemplo alineados; registros destacados actualizados en Supabase.

## 2026-07-17 — Sectores flip, stats, normas, correo y header

### UI / contenido
- Capacidades operativas sustituida por **Sectores que atendemos** con flip-card (sin Industrial).
- Hero H1 en mayúsculas; imagen/contenido más separados del navbar.
- Stats: +30 años, +6.000 productos, Entrega a nivel nacional.
- Normas técnicas: + AISI, SAE, ASME.
- Correo unificado a `info@tornitech.com`.
- Navbar más alto.

## 2026-07-15 — Sprint 2 (P1) estabilidad y mantenibilidad

### P1-2 Formularios
- `contact-section` y `catalogs-section` divididos en hooks + componentes UI.
- Misma validación Zod y mismas server actions (sin cambio de negocio).

### P1-3 Middleware
- Eliminado middleware de refresh de sesión Supabase (landing pública sin auth SSR).

### P1-4 Open Graph
- `public/images/og-image.jpg` profesional 1200×630 + `ASSETS.social.ogImage`.
- Metadata Open Graph / Twitter actualizada (ya no usa el logo 680×217).
- Nota: Next 13.5 del proyecto no tipa `next/og`; se usó asset estático.

### P1-5 PDFs
- Portada Tornitech con email/tel/WhatsApp/dirección correctos prepended a ambos catálogos.
- Metadatos PDF actualizados; páginas técnicas del socio se conservan.

### P1-6 Docs
- `docs/CONTENT-OPS.md` — products vs productos.

### P1-7 CI
- `.github/workflows/ci.yml` — npm ci, typecheck, lint, build en push/PR.

### Fuera de alcance
- Sentry omitido por instrucción del sprint.
- Sprint 3/4 no iniciados.

## 2026-07-15 — Nuestros valores (timeline)

### Contenido / UI
- Valores corporativos del PDF: títulos reales y texto mínimo (5 puntos).
- Vista timeline numerada, sin recuadros; misión/visión también sin tarjetas.
- Menos fatiga visual en Quiénes somos.

## 2026-07-15 — Revert grids, centrar página, header más alto

### Layout
- Sectores, Productos especiales y Capacidades vuelven a grid (sin scroll horizontal).
- Columna de contenido unificada (header + secciones + hero) centrada hasta 1440px.
- Navbar un poco más alta (`min-h` 64 / 56).

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

## 2026-07-17 — Auditoría de código (XSS / headers / deps)

### Parches
- `lib/security.ts`: escapeHtml, serializeJsonLd, sanitizeEmailHeader, isSafeHttpUrl, toSafeErrorMessage.
- JSON-LD con `serializeJsonLd` (anti `</script>` breakout).
- Footer / site_config: solo URLs http(s) seguras en redes sociales.
- Productos: `image_url` validada con `isSafeHttpUrl`.
- Emails: subject sanitizado; logs sin body/PII.
- Zod: regex de nombre, teléfono, max lengths.
- CSP sin `unsafe-eval` en producción; `poweredByHeader: false`.
- Next.js `13.5.1` → `13.5.11` (último parche 13.x); Zod actualizado.

### Residual
- Advisories de Next 13 que solo se cierran subiendo a Next 15/16 (major, fuera de alcance sin solicitud).

## 2026-07-17 — Auditoría Functions/Views (RPC)

### Verificación
- Probes con anon key: `increment_download_count` y `check_rate_limit` → HTTP 401.
- Vista `v_leads_with_downloads` → HTTP 401.
- `set_updated_at` no es RPC usable (trigger) → HTTP 404; EXECUTE revocado a anon/authenticated (migración 007).

### Advisors
- Sin WARN/ERROR de SECURITY DEFINER VIEW, PUBLIC FUNCTION ni EXECUTE público.
- Solo INFO esperado: RLS sin policies en tablas de captura (deny-all).

## 2026-07-17 — Hardening de seguridad (P0/P1)

### Supabase (migración `006_security_hardening`)
- Vista `v_leads_with_downloads`: `security_invoker` + sin acceso anon/authenticated.
- RPC `increment_download_count` y `check_rate_limit`: EXECUTE solo `service_role`.
- Eliminados INSERT públicos en leads/contact/catalog_downloads/newsletter/quote_requests.
- Escrituras de formularios solo con `SUPABASE_SERVICE_ROLE_KEY` (Server Actions).
- `site_config`: lectura pública requiere `is_public IS TRUE`.
- Storage `images`: límite 5 MB + MIME de imagen; sin listing público; write solo service_role.

### App
- Zod con `.max()`, trim y email normalizado.
- Rate limit fail-closed en producción sin backend.
- Headers CSP + HSTS en `next.config.js`.
- Hooks: `select` de columnas explícitas (sin `*`).

## 2026-07-15 — Imágenes de productos desde Supabase Storage

### Fix
- `next.config.js`: permitido el hostname del proyecto Supabase para `next/image`
  (`…supabase.co/storage/v1/object/public/**`), para que `image_url` de Storage se renderice.

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

## 2026-07-15 — Scroll density pass

### UX / UI
- Capacidades: cards más compactas (imagen, tipografía y gaps reducidos).
- Ritmo vertical más corto: `section-padding` / `section-padding-tight` ajustados.
- Hero, Nosotros, Sectores, Proceso, Productos, banners y Contacto con menos aire entre bloques.

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
