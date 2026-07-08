import { Metadata } from 'next';
import { LegalPageShell } from '@/components/layout/legal-page-shell';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description: `Aviso de privacidad de ${SITE_CONFIG.name}.`,
  alternates: {
    canonical: '/privacidad',
  },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalPageShell>
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Aviso de Privacidad
        </h1>

        <div className="max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            En {SITE_CONFIG.name}, nos comprometemos a proteger su privacidad y la seguridad de su información personal.
          </p>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              1. Información que Recopilamos
            </h2>
            <p>
              Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, teléfono, empresa, y cualquier otra información que decida compartir al contactarnos, solicitar cotizaciones o descargar catálogos.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              2. Uso de la Información
            </h2>
            <p>Utilizamos su información para:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Responder a sus consultas y cotizaciones</li>
              <li>Proporcionar información sobre productos y servicios</li>
              <li>Enviar catálogos y promociones (con su consentimiento)</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              3. Protección de Datos
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              4. Responsable de Datos
            </h2>
            <p>
              El responsable del tratamiento de sus datos personales es {SITE_CONFIG.name}, con domicilio en {SITE_CONFIG.address}.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              5. Contacto
            </h2>
            <p>
              Para ejercer sus derechos ARCO (Acceso, Rectificación, Cancelación u Oposición), puede contactarnos en:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> {SITE_CONFIG.email}</li>
              <li><strong>Teléfono:</strong> {SITE_CONFIG.phone}</li>
              <li><strong>Dirección:</strong> {SITE_CONFIG.address}</li>
            </ul>
          </section>

          <p className="mt-8 text-sm text-muted-foreground">
            Última actualización: Enero 2024
          </p>
        </div>
      </div>
    </LegalPageShell>
  );
}
