# AGENTS.md — Guía para agentes de IA en Tornitech

Este documento define cómo debe escribirse y modificarse el código en este repositorio.

## Stack del proyecto

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 13 (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Componentes UI | shadcn/ui (Radix + CVA) |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Validación | Zod |
| Animaciones | Framer Motion |
| Iconos | Lucide React (stroke 1.75px) |
| Email | SendGrid (HTTP API v3, sin SDK) |

> Verificar `package.json` antes de asumir versiones. No actualizar major versions sin solicitud explícita.

## Estructura de carpetas

```
app/              → Rutas, layout, metadata, API (si aplica)
actions/          → Server Actions ('use server')
components/
  layout/         → Header, Footer
  sections/       → Secciones de la landing page
  ui/             → Primitivos shadcn y componentes reutilizables
constants/        → Configuración del sitio (site.ts) y contenido (content.ts)
hooks/            → Custom hooks de cliente
lib/              → Utilidades, Supabase, email, WhatsApp, leads
types/            → Schemas Zod, tipos de DB, tipos de dominio
public/           → Assets estáticos e imágenes
supabase/         → Migraciones SQL
```

**No mover archivos ni cambiar la estructura sin justificación.**

## Principios de código

1. **Componentes pequeños y reutilizables** — extraer lógica repetida a `components/ui/` o `lib/`.
2. **No duplicar código** — copy en `constants/content.ts`, WhatsApp en `lib/whatsapp.ts`, email en `lib/email.ts`.
3. **No usar `any`** salvo casos imprescindibles con comentario explicativo.
4. **Server Actions** para mutaciones (formularios, leads, descargas).
5. **Validación con Zod** en cliente y servidor.
6. **Tipos explícitos** — preferir `types/product.ts`, `types/catalog.ts`, `types/actions.ts`.
7. **Código limpio** — nombres descriptivos, funciones cortas, sin abstracciones prematuras.

## Contenido y copy

- Textos de marketing en `constants/content.ts`, no hardcodeados en JSX.
- Tono corporativo industrial. Sin frases genéricas de IA.
- **No inventar** clientes, certificaciones, años de experiencia, estadísticas ni premios.

## Formularios e integraciones

| Funcionalidad | Ubicación |
|---------------|-----------|
| Contacto | `actions/contact.ts` → `submitContact` |
| Descarga PDF | `actions/contact.ts` → `submitCatalogDownload` |
| Leads | `lib/leads.ts` → `createLead` |
| Promociones | `accepts_marketing` + `subscribeToMarketing` |
| Email | `lib/email.ts` → `sendEmail` (SendGrid) |
| WhatsApp | `lib/whatsapp.ts` + `components/ui/whatsapp-link.tsx` |

Flujo contacto: validar → guardar en `contact_submissions` → crear lead → email al equipo + confirmación al usuario → suscripción si acepta marketing.

Flujo catálogo: validar → crear lead → registrar descarga (si UUID válido) → email al equipo → retornar `downloadUrl`.

## Accesibilidad (obligatorio)

- Labels en todos los inputs.
- `aria-invalid`, `aria-describedby` en errores de formulario.
- `role="alert"` / `role="status"` en mensajes dinámicos.
- Focus visible (`.focus-ring`, `.focus-ring-inverse`).
- Textos alternativos en imágenes.
- Navegación por teclado (Escape cierra modales).

## SEO (obligatorio)

- Metadata en `app/layout.tsx` desde `SITE_CONFIG`.
- JSON-LD en `app/page.tsx`.
- Un solo `<h1>` por página (Hero).
- Jerarquía `h2` → `h3` en secciones.
- `sitemap.ts` y `robots.ts` actualizados.
- Sin URLs con hash en el sitemap.

## Estilos

- Tailwind utility-first. Evitar CSS inline salvo gradientes complejos.
- Usar utilidades globales de `app/globals.css`: `.btn-yellow`, `.btn-navy`, `.section-heading`, `.card-elevated`, `.section-container`.
- Paleta de marca: navy `#052042`, blue `#316d92`, yellow `#fab43a`, dark `#3c4456`.
- Responsive: mobile-first, probar 320 / 375 / 768 / 1024 / 1440 px.

## Flujo de trabajo para agentes

1. **Leer** el código existente y `constants/content.ts` antes de modificar.
2. **Explicar** cambios importantes al usuario antes de aplicarlos (en el chat).
3. **Aplicar** el diff mínimo necesario.
4. **Verificar** con `npm run typecheck` y `npm run build`.
5. **Documentar** cambios relevantes en `CHANGELOG.md`.
6. **No commitear** salvo solicitud explícita del usuario.

## Variables de entorno

Ver `.env.example`. Supabase y SendGrid son opcionales en desarrollo; la app debe degradar gracefully si faltan.

## Prohibido

- Inventar datos de negocio (clientes, certificaciones, cifras).
- Push a `main` sin solicitud explícita.
- Dependencias nuevas sin justificación.
- Modificar `git config`.
- Archivos markdown no solicitados (excepto AGENTS.md, CHANGELOG.md).
