'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCatalogs } from '@/hooks/use-supabase';
import { submitCatalogDownload } from '@/actions/contact';
import { catalogDownloadSchema } from '@/types';
import { SITE_CONFIG } from '@/constants/site';

const catalogPreviews = [
  {
    src: 'https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Catálogo General de Tornillería',
  },
  {
    src: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600',
    alt: 'Catálogo de Fijación Estructural',
  },
];

const defaultCatalogs = [
  {
    id: 'cat-1',
    title: 'Catálogo General de Tornillería',
    slug: 'catalogo-tornilleria-general',
    description: 'Catálogo completo con toda nuestra línea de tornillos, pernos, tuercas y arandelas industriales.',
    file_url: '/catalogs/tornilleria-general-2024.pdf',
    file_size: '12 MB',
    pages: 156,
    version: '2024',
    is_featured: true,
    is_active: true,
    display_order: 1,
    download_count: 0,
  },
  {
    id: 'cat-2',
    title: 'Catálogo de Fijación Estructural',
    slug: 'catalogo-fijacion-estructural',
    description: 'Guía completa de elementos de fijación para construcción y estructuras metálicas.',
    file_url: '/catalogs/fijacion-estructural-2024.pdf',
    file_size: '8 MB',
    pages: 98,
    version: '2024',
    is_featured: true,
    is_active: true,
    display_order: 2,
    download_count: 0,
  },
];

export function CatalogsSection() {
  const { catalogs } = useCatalogs();
  const displayCatalogs = catalogs.length > 0 ? catalogs : defaultCatalogs;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>('');
  const [selectedCatalogTitle, setSelectedCatalogTitle] = useState<string>('');
  const [selectedCatalogUrl, setSelectedCatalogUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', city: '', sector: '', accepts_marketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = (catalog: any) => {
    setSelectedCatalogId(catalog.id);
    setSelectedCatalogTitle(catalog.title);
    setSelectedCatalogUrl(catalog.file_url);
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
      catalogTitle: selectedCatalogTitle,
    });
    setIsSubmitting(false);
    if (response.success) {
      setSuccess(true);
      const link = document.createElement('a');
      link.href = selectedCatalogUrl;
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
    <section id="catalogos" className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex w-full flex-col items-center gap-3 md:mb-14"
        >
          <h2 className="section-heading text-center">CATÁLOGO GENERAL</h2>
          <span className="section-accent" />
        </motion.header>

        <div className="mx-auto grid w-full max-w-[886px] grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:gap-[145px]">
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
          className="mt-16 flex w-full max-w-[945px] flex-col items-center justify-center gap-6 md:flex-row md:gap-[383px]"
        >
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo ver el catálogo online.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow focus-ring min-h-[46px] w-full max-w-[280px] px-6 py-3 text-lg"
          >
            Ver catálogo online
          </a>
          <button
            onClick={() => displayCatalogs[0] && openModal(displayCatalogs[0])}
            className="btn-yellow focus-ring min-h-[46px] w-full max-w-[280px] px-6 py-3 text-lg"
          >
            Descargar catálogo PDF
          </button>
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
                  <button type="button" onClick={closeModal} aria-label="Cerrar" className="focus-ring rounded-md p-1 transition-colors hover:bg-gray-100">
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
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                          value={(formData as any)[field.id]}
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
                            value={(formData as any)[field.id]}
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
