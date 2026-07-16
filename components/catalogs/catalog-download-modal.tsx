'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Download, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { useCatalogDownload } from '@/hooks/use-catalog-download';

type CatalogDownloadModalProps = Pick<
  ReturnType<typeof useCatalogDownload>,
  | 'modalOpen'
  | 'selectedCatalogTitle'
  | 'formData'
  | 'errors'
  | 'isSubmitting'
  | 'success'
  | 'catalogDialogRef'
  | 'closeButtonRef'
  | 'closeModal'
  | 'updateField'
  | 'setAcceptsMarketing'
  | 'handleSubmit'
>;

export function CatalogDownloadModal({
  modalOpen,
  selectedCatalogTitle,
  formData,
  errors,
  isSubmitting,
  success,
  catalogDialogRef,
  closeButtonRef,
  closeModal,
  updateField,
  setAcceptsMarketing,
  handleSubmit,
}: CatalogDownloadModalProps) {
  return (
    <AnimatePresence>
      {modalOpen && (
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
                  <h3
                    id="catalog-modal-title"
                    className="text-lg font-bold uppercase tracking-wide text-[#3c4456]"
                  >
                    Descargar catálogo
                  </h3>
                  <p className="mt-1 text-sm text-[#316d92]">{selectedCatalogTitle}</p>
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
                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                  {errors.form && (
                    <div role="alert" className="rounded-[10px] border border-red-200 bg-red-50 p-3">
                      <p className="text-sm font-medium text-red-600">{errors.form}</p>
                    </div>
                  )}
                  {[
                    { id: 'name', label: 'Nombre completo *', placeholder: 'Tu nombre', required: true },
                    {
                      id: 'email',
                      label: 'Correo electrónico *',
                      placeholder: 'tu@empresa.com',
                      required: true,
                      type: 'email',
                    },
                    {
                      id: 'company',
                      label: 'Empresa *',
                      placeholder: 'Nombre de tu empresa',
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={`dl-${field.id}`} className="font-medium text-[#3c4456]">
                        {field.label}
                      </Label>
                      <Input
                        id={`dl-${field.id}`}
                        name={field.id}
                        type={field.type || 'text'}
                        value={formData[field.id as keyof typeof formData] as string}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        aria-invalid={!!errors[field.id]}
                        aria-describedby={errors[field.id] ? `dl-${field.id}-error` : undefined}
                        className={
                          errors[field.id]
                            ? 'border-red-500 focus-visible:ring-red-500'
                            : 'border-[#316d92]/30'
                        }
                      />
                      {errors[field.id] && (
                        <p id={`dl-${field.id}-error`} role="alert" className="text-xs text-red-500">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'phone', label: 'Teléfono', placeholder: '+58 ' },
                      { id: 'city', label: 'Ciudad', placeholder: 'Tu ciudad' },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={`dl-${field.id}`} className="font-medium text-[#3c4456]">
                          {field.label}
                        </Label>
                        <Input
                          id={`dl-${field.id}`}
                          name={field.id}
                          value={formData[field.id as keyof typeof formData] as string}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="border-[#316d92]/30"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dl-sector" className="font-medium text-[#3c4456]">
                      Sector Industrial
                    </Label>
                    <Input
                      id="dl-sector"
                      name="sector"
                      value={formData.sector}
                      onChange={(e) => updateField('sector', e.target.value)}
                      placeholder="Petróleo, Construcción, etc."
                      className="border-[#316d92]/30"
                    />
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <Checkbox
                      id="dl-marketing"
                      checked={formData.accepts_marketing}
                      onCheckedChange={(v) => setAcceptsMarketing(v === true)}
                    />
                    <Label
                      htmlFor="dl-marketing"
                      className="cursor-pointer text-sm leading-tight text-[#316d92]"
                    >
                      Acepto recibir información comercial y promociones.
                    </Label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-yellow focus-ring min-h-[46px] w-full px-6 py-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Procesando...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" strokeWidth={1.75} /> Descargar catálogo
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-[#316d92]">
                    Al descargar, aceptas nuestro{' '}
                    <a
                      href="/privacidad"
                      className="focus-ring rounded-sm underline underline-offset-2 hover:text-[#3c4456]"
                    >
                      Aviso de Privacidad
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
