# Entrega de cuentas al cliente — CCS Tornitech

Guía para transferir la propiedad de servicios al correo corporativo del cliente (sin depender de tu email personal).

---

## 1. Qué pedirle al cliente antes de empezar

- Correo corporativo activo (ej. `info@ccstornitech.com` o el que definan)
- Acceso al panel DNS del dominio `ccstornitech.com`
- Decisión: ¿el repo GitHub queda en tu cuenta con acceso para ellos, o se transfiere?

---

## 2. SendGrid (emails + futuras campañas marketing)

**Cuenta:** crear con el **correo del cliente**, no el tuyo.

1. Cliente (o tú con su correo) → [sendgrid.com](https://sendgrid.com) → registro
2. **Settings → Sender Authentication → Authenticate Your Domain**
   - Dominio: `ccstornitech.com`
   - Agregar registros DNS que indique SendGrid (CNAME)
3. **Settings → API Keys → Create API Key**
   - Nombre: `tornitech-produccion`
   - Permiso: **Restricted** → Mail Send (Full Access)
4. En **Netlify → Environment variables**:

| Variable | Valor |
|----------|-------|
| `SENDGRID_API_KEY` | `SG.xxxxx` |
| `EMAIL_FROM` | `CCS Tornitech C.A. <info@ccstornitech.com>` |
| `EMAIL_TO` | correo donde reciben leads |

5. Redeploy en Netlify
6. Verificar: `npm run verify:sendgrid`
7. Probar formulario de contacto y descarga de catálogo

**Marketing:** la misma cuenta SendGrid sirve después para campañas (audiences, templates, automations).

---

## 3. Supabase (base de datos y leads)

**Objetivo:** el proyecto queda bajo la organización/cuenta del cliente.

1. Cliente crea cuenta en [supabase.com](https://supabase.com) con su correo corporativo
2. **Opción A — Transferir proyecto existente**
   - Supabase Dashboard → Organization Settings → **Transfer project**
   - Destino: organización del cliente
3. **Opción B — Invitar al cliente como Owner**
   - Project Settings → Team → Invite → rol **Owner**
   - Cliente acepta invitación
   - Tú te quitas como Owner cuando confirmen acceso

4. Regenerar claves si el cliente prefiere rotación:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (solo Netlify, nunca en cliente)

5. Actualizar variables en Netlify con las nuevas claves (si cambiaron)

6. Actualizar contacto en BD:

```bash
# En .env.local del cliente/desarrollador
CLIENT_CONTACT_EMAIL=correo@ccstornitech.com
EMAIL_TO=correo@ccstornitech.com
npm run update:site-config
```

---

## 4. Netlify (hosting)

1. Netlify → Team settings → **Members** → invitar correo del cliente como **Owner**
2. O **Transfer site** a team del cliente (plan de pago puede requerir team)
3. Cliente debe tener acceso a:
   - Environment variables
   - Domain settings (SSL)
   - Deploy logs

Variables críticas que debe conocer (sin mostrar secretos en documentos):

- `SENDGRID_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_*`

---

## 5. GitHub (código fuente)

1. **Settings → Collaborators** → invitar cuenta del cliente con rol **Admin**
2. O **Settings → Transfer repository** → cuenta/org del cliente
3. Entregar acceso a Actions (CI) si la usan

---

## 6. Actualizar correo en todo el proyecto

Cuando el cliente confirme el correo final (`CLIENT_CONTACT_EMAIL`):

```bash
# .env.local
CLIENT_CONTACT_EMAIL=nuevo@ccstornitech.com
EMAIL_TO=nuevo@ccstornitech.com
EMAIL_FROM="CCS Tornitech C.A. <nuevo@ccstornitech.com>"
SENDGRID_API_KEY=SG....
```

Archivos que reflejan el correo (actualizar si cambia el dominio/correo):

| Ubicación | Qué actualizar |
|-----------|----------------|
| Netlify env | `EMAIL_FROM`, `EMAIL_TO`, `SENDGRID_API_KEY` |
| `constants/site.ts` | `email` |
| Supabase `site_config` | `npm run update:site-config` |
| SendGrid | Remitente verificado con el dominio |

---

## 7. Checklist de entrega al cliente

```
SENDGRID
[ ] Cuenta creada con correo del cliente
[ ] Dominio ccstornitech.com autenticado (DNS)
[ ] API Key en Netlify
[ ] Emails de formulario probados

SUPABASE
[ ] Cliente invitado como Owner o proyecto transferido
[ ] Claves documentadas en gestor de contraseñas del cliente
[ ] site_config actualizado con su correo

NETLIFY
[ ] Cliente invitado como Owner del sitio
[ ] Dominio y SSL activos

GITHUB
[ ] Cliente con acceso Admin o repo transferido

DATOS
[ ] Leads visibles en Supabase (Table Editor → leads)
[ ] Script verify:sprint1 ejecutado sin errores críticos

DOCUMENTACIÓN ENTREGADA
[ ] Este archivo (ENTREGA-CUENTAS-CLIENTE.md)
[ ] .env.example (sin secretos reales)
[ ] Accesos compartidos vía gestor de contraseñas (1Password, Bitwarden, etc.)
```

---

## 8. Qué NO dejar en tu correo personal

- Owner único de Supabase
- Owner único de Netlify
- Única API Key de SendGrid sin backup para el cliente
- DNS del dominio solo en tu cuenta personal

**Recomendación:** usar un gestor de contraseñas compartido (carpeta “CCS Tornitech”) para entregar credenciales de forma segura, nunca por WhatsApp en texto plano.

---

## 9. Soporte post-entrega (Plan 2)

Incluir en el contrato mensual:

- Rotación de API keys si hay incidente
- Verificación mensual: `npm run verify:sprint1`
- Backup/export leads a Google Sheets del cliente
- Campañas marketing vía SendGrid (fase posterior)
