import { Metadata } from 'next';
import { LegalPageShell } from '@/components/layout/legal-page-shell';
import { SITE_CONFIG } from '@/constants/site';
import { getCachedSiteContactConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: `Términos y condiciones de uso de ${SITE_CONFIG.name}.`,
  alternates: {
    canonical: '/terminos',
  },
  robots: { index: true, follow: true },
};

export default async function TerminosPage() {
  const contact = await getCachedSiteContactConfig();

  return (
    <LegalPageShell>
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Términos y Condiciones
        </h1>

        <div className="max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Al acceder y utilizar el sitio web de {SITE_CONFIG.name}, usted acepta los siguientes términos y condiciones. Le recomendamos leerlos detenidamente.
          </p>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              1. Objeto
            </h2>
            <p>
              Este sitio web tiene como finalidad presentar los productos y servicios de {SITE_CONFIG.name}, así como permitir la solicitud de cotizaciones y la descarga de catálogos.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              2. Uso del Sitio
            </h2>
            <p>
              El usuario se compromete a utilizar el sitio y sus formularios de contacto de buena fe, proporcionando información veraz y actualizada, y a no emplear el sitio con fines ilícitos o que puedan dañar, inutilizar o sobrecargar el servicio.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              3. Propiedad Intelectual
            </h2>
            <p>
              Los contenidos del sitio, incluyendo textos, imágenes, logotipos y catálogos, son propiedad de {SITE_CONFIG.name} o de sus respectivos titulares y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización previa.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              4. Cotizaciones y Disponibilidad
            </h2>
            <p>
              Las cotizaciones solicitadas a través del sitio no constituyen una oferta vinculante hasta su confirmación formal por parte de nuestro equipo comercial. La disponibilidad de productos puede variar sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              5. Limitación de Responsabilidad
            </h2>
            <p>
              {SITE_CONFIG.name} no se hace responsable por daños derivados del uso o la imposibilidad de uso del sitio, ni por errores u omisiones en el contenido publicado.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              6. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              7. Contacto
            </h2>
            <p>
              Para cualquier consulta relacionada con estos términos, puede contactarnos en:
            </p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> {contact.email}</li>
              <li><strong>Teléfono:</strong> {contact.phone}</li>
              <li><strong>Dirección:</strong> {contact.address}</li>
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
