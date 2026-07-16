# CONTENT-OPS — products vs productos

Guía operativa para editores y desarrolladores que mantengan el catálogo de Tornitech.

## Resumen ejecutivo

Hay **dos sistemas de contenido de productos** en la homepage. No son intercambiables.

| Concepto | Sección UI | Ancla | Tabla Supabase | Propósito |
|----------|------------|-------|----------------|-----------|
| **products** (inglés) | Productos Especiales | `#productos` | `products` | Destacados / “cards” con foto, SKU y CTA WhatsApp |
| **productos** (español) | PRODUCTOS (catálogo) | `#lista-productos` | `productos` + `configuracion_web` | Listado buscable por categoría (texto, sin foto obligatoria) |

La navegación del header (“Productos”) apunta a `/#productos` (destacados), no al listado completo.

---

## 1. `products` — Productos especiales

### Qué es
Selección curada de referencias para la vitrina comercial. Ideal para 4–8 ítems con imagen.

### Dónde vive en código
- UI: `components/sections/products-section.tsx`
- Hook: `hooks/use-supabase.ts` → `useProducts({ featured: true, limit })`
- Tipo: `types/product.ts` → `ProductItem`
- Fallback offline: `DEFAULT_PRODUCTS` en `constants/content.ts`
- Migración: `supabase/migrations/001_initial_schema.sql` (tabla `products`)

### Campos relevantes (tabla `products`)
- `sku`, `name`, `short_description` / `description`
- `image` / `image_url`
- `specs`, `is_featured`, `is_active`, `display_order`

### Cuándo editar
- Quiere mostrar un producto estrella en la home con foto y botón Cotizar.
- Cambia el orden o el set “featured”.

### Flujo de datos
```
Supabase products (is_featured=true, is_active=true)
  → useProducts
  → ProductsSection
  → WhatsAppLink (product_quote)
```
Si Supabase falla o no hay filas → se usan `DEFAULT_PRODUCTS`.

---

## 2. `productos` — Catálogo listado

### Qué es
Inventario amplio para consulta por nombre/categoría. Orientado a volumen (decenas/cientos de filas).

### Dónde vive en código
- UI: `components/sections/productos/` (`Productos.tsx`, grid, search, cards)
- Hook: `hooks/use-productos.ts`
- Servicio: `lib/productos.ts`
- Tipos: `types/producto.ts` → `Producto`, `ProductoCategoria`, `ConfiguracionWeb`
- Migración: `supabase/migrations/004_productos_catalogo.sql`
- CSV de ejemplo: `supabase/ejemplos/productos.csv`

### Tablas
1. **`productos`**: `nombre`, `categoria`, `descripcion`, `orden`, `activo`
2. **`configuracion_web`**: fila `id = 1`, flag `mostrar_productos`

### Cuándo editar
- Cargar/actualizar el catálogo operativo desde Table Editor o CSV.
- Apagar/encender la sección completa con `mostrar_productos`.

### Flujo de datos
```
configuracion_web.mostrar_productos
  + productos (activo=true)
  → getConfiguracionProductos + getProductos
  → useProductos (filtro + groupBy categoría)
  → Productos section (límite home: PRODUCTOS_HOME_LIMIT = 5 categorías)
```
Si `mostrar_productos = false`, error o lista vacía → la sección **no se renderiza**.

---

## 3. Relación con catálogos PDF

Los PDF en `public/catalogs/` son material de referencia del socio **Panama Fasteners**.
La descarga lead-gen vive en `catalogs` (tabla) + `CatalogsSection` — **otro dominio**, no confundir con `products`/`productos`.

Contacto comercial Tornitech (web): `SITE_CONFIG` / `site_config` en Supabase.
Contacto impreso interno del PDF del fabricante: páginas originales Panama Fasteners.
Portada Tornitech añadida en los PDF (Sprint 2) concentra email/tel/WhatsApp correctos de CCS Tornitech.

---

## 4. Checklist rápido para un nuevo desarrollador

1. ¿Necesito una card visual con cotización WhatsApp? → **`products`**
2. ¿Necesito listar muchas referencias por categoría con buscador? → **`productos`**
3. ¿La sección PRODUCTOS no aparece? → Revisar `configuracion_web.mostrar_productos` y RLS/`activo`
4. ¿El nav “Productos” lleva al lugar equivocado? → Hash `#productos` vs `#lista-productos`
5. No mezclar columnas de una tabla en la otra (schemas distintos).

---

## 5. RLS y clientes

- Lectura pública típica con clave anon (o degradación a defaults).
- Formularios / escrituras usan cliente de formularios / service role (`lib/supabase/server.ts`, `lib/supabase/forms.ts`).
- No hay sesión de usuario autenticado en la landing; el middleware de auth cookie fue retirado en Sprint 2.
