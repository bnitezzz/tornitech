'use client';

import { useCatalogs } from '@/hooks/use-supabase';
import { useCatalogDownload } from '@/hooks/use-catalog-download';
import { CATALOGS_CONTENT, DEFAULT_CATALOGS } from '@/constants/content';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { CatalogList } from '@/components/catalogs/catalog-list';
import { CatalogDownloadModal } from '@/components/catalogs/catalog-download-modal';

export function CatalogsSection() {
  const { catalogs } = useCatalogs();
  const displayCatalogs = catalogs.length > 0 ? catalogs : DEFAULT_CATALOGS;
  const download = useCatalogDownload();

  return (
    <section id="catalogos" className="section-padding-tight section-bg-fade-bottom w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={CATALOGS_CONTENT.heading}
          subheading={CATALOGS_CONTENT.subheading}
          className="mb-5 md:mb-7"
        />

        <CatalogList
          catalogs={displayCatalogs}
          onDownload={download.openModal}
          firstDownloadRef={download.downloadTriggerRef}
        />

        <nav
          aria-label="Acciones del catálogo"
          className="mt-7 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:justify-center"
        >
          <WhatsAppLink
            messageType="catalog_inquiry"
            className="btn-navy focus-ring min-h-[44px] w-full px-5 py-2.5 text-center text-sm sm:flex-1"
          >
            Consultar catálogo
          </WhatsAppLink>
        </nav>
      </div>

      <CatalogDownloadModal
        modalOpen={download.modalOpen}
        selectedCatalogTitle={download.selectedCatalogTitle}
        formData={download.formData}
        errors={download.errors}
        isSubmitting={download.isSubmitting}
        success={download.success}
        catalogDialogRef={download.catalogDialogRef}
        closeButtonRef={download.closeButtonRef}
        closeModal={download.closeModal}
        updateField={download.updateField}
        setAcceptsMarketing={download.setAcceptsMarketing}
        handleSubmit={download.handleSubmit}
      />
    </section>
  );
}
