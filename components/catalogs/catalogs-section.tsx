'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useCatalogs } from '@/hooks/use-supabase';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useConfigSection } from '@/hooks/use-configuracion';
import { CATALOGS_CONTENT, DEFAULT_CATALOGS } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { CatalogDownloadForm } from '@/components/catalogs/catalog-download-form';
import type { CatalogItem } from '@/types/catalog';
import type { SectionHeading } from '@/types/configuracion';

const catalogPreviews = [
  { src: ASSETS.catalogs.general, alt: 'Catálogo general de tornillería' },
  { src: ASSETS.catalogs.estructural, alt: 'Catálogo de fijación estructural' },
];

export function CatalogsSection() {
  const sectionConfig = useConfigSection<SectionHeading>('catalogs_section', CATALOGS_CONTENT);
  const { catalogs } = useCatalogs();
  const displayCatalogs = catalogs.length > 0 ? catalogs : DEFAULT_CATALOGS;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(null);
  const [success, setSuccess] = useState(false);

  const downloadTriggerRef = useRef<HTMLButtonElement>(null);
  const catalogDialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(catalogDialogRef, {
    isActive: modalOpen,
    returnFocusRef: downloadTriggerRef,
    initialFocusRef: closeButtonRef,
  });

  const openModal = (catalog: CatalogItem) => {
    setSelectedCatalog(catalog);
    setSuccess(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCatalog(null);
    setSuccess(false);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleDownloadSuccess = (downloadUrl: string) => {
    setSuccess(true);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${selectedCatalog?.title ?? 'catalogo'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(closeModal, 2500);
  };

  return (
    <section id="catalogos" className="section-padding w-full bg-white">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={sectionConfig.heading}
          subheading={sectionConfig.subheading}
          className="mb-8 md:mb-10"
        />

        <div className="mx-auto grid w-full max-w-[886px] grid-cols-1 justify-items-center gap-6 md:grid-cols-2 md:gap-10">
          {catalogPreviews.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated card-elevated-hover group w-full max-w-[372px] overflow-hidden rounded-[10px] border border-slate-100"
            >
              <Image
                className="img-zoom h-auto w-full object-cover"
                alt={img.alt}
                src={img.src}
                width={372}
                height={462}
              />
            </motion.div>
          ))}
        </div>

        <nav
          aria-label="Acciones del catálogo"
          className="mt-10 flex w-full max-w-[640px] flex-col items-stretch gap-4 sm:flex-row sm:justify-center"
        >
          <WhatsAppLink
            messageType="catalog_inquiry"
            className="btn-navy focus-ring min-h-[48px] w-full px-6 py-3 text-center text-base sm:flex-1"
          >
            Consultar catálogo
          </WhatsAppLink>
          <button
            ref={downloadTriggerRef}
            onClick={() => displayCatalogs[0] && openModal(displayCatalogs[0])}
            className="btn-yellow focus-ring min-h-[48px] w-full px-6 py-3 text-base sm:flex-1"
          >
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Descargar PDF
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {modalOpen && selectedCatalog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              ref={catalogDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="catalog-modal-title"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[20px] bg-white shadow-2xl"
            >
              <div className="p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 id="catalog-modal-title" className="text-lg font-bold uppercase tracking-wide text-[#3c4456]">
                      Descargar catálogo
                    </h3>
                    <p className="mt-1 text-sm text-[#316d92]">{selectedCatalog.title}</p>
                  </div>
                  <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={closeModal}
                    aria-label="Cerrar"
                    className="focus-ring rounded-md p-1 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-[#3c4456]" strokeWidth={1.75} />
                  </button>
                </div>

                {success ? (
                  <div role="status" className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fab43a]/20">
                      <Download className="h-8 w-8 text-[#fab43a]" strokeWidth={1.75} />
                    </div>
                    <p className="text-lg font-bold text-[#3c4456]">¡Descarga iniciada!</p>
                    <p className="mt-2 text-sm text-[#316d92]">Gracias por su interés.</p>
                  </div>
                ) : (
                  <CatalogDownloadForm
                    catalogId={selectedCatalog.id}
                    catalogSlug={selectedCatalog.slug}
                    onSuccess={handleDownloadSuccess}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
