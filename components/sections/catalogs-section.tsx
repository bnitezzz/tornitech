'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCatalogs } from '@/hooks/use-supabase';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { submitCatalogDownload } from '@/actions/contact';
import { catalogDownloadSchema } from '@/types';
import { CATALOGS_CONTENT, DEFAULT_CATALOGS } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import type { CatalogItem } from '@/types/catalog';

const catalogPreviews = [
  {
    src: ASSETS.catalogs.general,
    alt: 'Catálogo general',
  },
  {
    src: ASSETS.catalogs.automotriz,
    alt: 'Catálogo Automotriz',
  },
];

const defaultCatalogs = DEFAULT_CATALOGS;

export function CatalogsSection() {
  const { catalogs } = useCatalogs();
  const displayCatalogs = catalogs.length > 0 ? catalogs : defaultCatalogs;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>('');
  const [selectedCatalogTitle, setSelectedCatalogTitle] = useState<string>('');
  const [selectedCatalogSlug, setSelectedCatalogSlug] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', city: '', sector: '', accepts_marketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setSelectedCatalogId(catalog.id);
    setSelectedCatalogTitle(catalog.title);
    setSelectedCatalogSlug(catalog.slug);
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrors({});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = catalogDownloadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    const response = await submitCatalogDownload({
      ...result.data,
      catalogId: selectedCatalogId,
      catalogSlug: selectedCatalogSlug,
    });
    setIsSubmitting(false);
    if (response.success && response.data?.downloadUrl) {
      setSuccess(true);
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = `${selectedCatalogTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setModalOpen(false);
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', company: '', city: '', sector: '', accepts_marketing: false });
      }, 2500);
    } else {
      setErrors({ form: response.message });
    }
  };

  return (
    <section id="catalogos" className="section-padding-tight section-bg-fade-bottom w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={CATALOGS_CONTENT.heading}
          subheading={CATALOGS_CONTENT.subheading}
          className="mb-6 md:mb-8"
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2.5">
          {catalogPreviews.map((img, index) => {
            const catalog = displayCatalogs[index];
            if (!catalog) return null;
            const title = catalog.title ?? img.alt;

            return (
              <motion.article
                key={catalog.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card-elevated card-elevated-hover group flex w-full items-stretch overflow-hidden rounded-lg border border-slate-100"
              >
                <div className="relative h-[72px] w-[88px] shrink-0 overflow-hidden sm:h-[80px] sm:w-[104px]">
                  <Image
                    className="img-zoom object-cover"
                    alt={img.alt}
                    src={img.src}
                    fill
                    sizes="104px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 sm:px-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#316d92]">
                      Catálogo PDF{catalog.version ? ` · ${catalog.version}` : ''}
                    </p>
                    <h3 className="mt-0.5 line-clamp-1 text-sm font-bold leading-snug text-[#052042] sm:text-[15px]">
                      {title}
                    </h3>
                    {catalog.description && (
                      <p className="mt-0.5 hidden line-clamp-1 text-xs text-[#6b7280] sm:block">
                        {catalog.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    ref={index === 0 ? downloadTriggerRef : undefined}
                    onClick={() => openModal(catalog)}
                    className="btn-yellow focus-ring shrink-0 px-3 py-1.5 text-xs sm:px-4 sm:text-sm"
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                    <span className="hidden sm:inline">Descargar</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

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

      {/* Download Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
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
              className="bg-white rounded-[20px] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 id="catalog-modal-title" className="text-lg font-bold text-[#3c4456] uppercase tracking-wide">
                      Descargar catálogo
                    </h3>
                    <p className="text-sm text-[#316d92] mt-1">{selectedCatalogTitle}</p>
                  </div>
                  <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={closeModal}
                    aria-label="Cerrar"
                    className="focus-ring rounded-md p-1 transition-colors hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-[#3c4456]" strokeWidth={1.75} />
                  </button>
                </div>

                {success ? (
                  <div role="status" className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#fab43a]/20 flex items-center justify-center mb-4">
                      <Download className="w-8 h-8 text-[#fab43a]" strokeWidth={1.75} />
                    </div>
                    <p className="font-bold text-[#3c4456] text-lg">¡Descarga iniciada!</p>
                    <p className="text-sm text-[#316d92] mt-2">Gracias por su interés.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                    {errors.form && (
                      <div role="alert" className="bg-red-50 border border-red-200 rounded-[10px] p-3">
                        <p className="text-sm text-red-600 font-medium">{errors.form}</p>
                      </div>
                    )}
                    {[
                      { id: 'name', label: 'Nombre completo *', placeholder: 'Tu nombre', required: true },
                      { id: 'email', label: 'Correo electrónico *', placeholder: 'tu@empresa.com', required: true, type: 'email' },
                      { id: 'company', label: 'Empresa *', placeholder: 'Nombre de tu empresa', required: true },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={`dl-${field.id}`} className="text-[#3c4456] font-medium">{field.label}</Label>
                        <Input
                          id={`dl-${field.id}`}
                          name={field.id}
                          type={field.type || 'text'}
                          value={formData[field.id as keyof typeof formData] as string}
                          onChange={(e) => { setFormData(p => ({ ...p, [field.id]: e.target.value })); setErrors(p => ({ ...p, [field.id]: '' })); }}
                          placeholder={field.placeholder}
                          required={field.required}
                          aria-invalid={!!errors[field.id]}
                          aria-describedby={errors[field.id] ? `dl-${field.id}-error` : undefined}
                          className={errors[field.id] ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#316d92]/30'}
                        />
                        {errors[field.id] && <p id={`dl-${field.id}-error`} role="alert" className="text-xs text-red-500">{errors[field.id]}</p>}
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'phone', label: 'Teléfono', placeholder: '+58 ' },
                        { id: 'city', label: 'Ciudad', placeholder: 'Tu ciudad' },
                      ].map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={`dl-${field.id}`} className="text-[#3c4456] font-medium">{field.label}</Label>
                          <Input
                            id={`dl-${field.id}`}
                            name={field.id}
                            value={formData[field.id as keyof typeof formData] as string}
                            onChange={(e) => setFormData(p => ({ ...p, [field.id]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="border-[#316d92]/30"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dl-sector" className="text-[#3c4456] font-medium">Sector Industrial</Label>
                      <Input
                        id="dl-sector"
                        name="sector"
                        value={formData.sector}
                        onChange={(e) => setFormData(p => ({ ...p, sector: e.target.value }))}
                        placeholder="Petróleo, Construcción, etc."
                        className="border-[#316d92]/30"
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox
                        id="dl-marketing"
                        checked={formData.accepts_marketing}
                        onCheckedChange={(v) => setFormData(p => ({ ...p, accepts_marketing: v as boolean }))}
                      />
                      <Label htmlFor="dl-marketing" className="text-sm text-[#316d92] leading-tight cursor-pointer">
                        Acepto recibir información comercial y promociones.
                      </Label>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-yellow focus-ring min-h-[46px] w-full px-6 py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.75} /> Procesando...</>
                      ) : (
                        <><Download className="w-4 h-4" strokeWidth={1.75} /> Descargar catálogo</>
                      )}
                    </button>
                    <p className="text-xs text-[#316d92] text-center">
                      Al descargar, aceptas nuestro{' '}
                      <a href="/privacidad" className="focus-ring rounded-sm underline underline-offset-2 hover:text-[#3c4456]">Aviso de Privacidad</a>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
