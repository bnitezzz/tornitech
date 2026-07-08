'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { submitCatalogDownload } from '@/actions/contact';
import {
  catalogDownloadFieldsSchema,
  toCatalogPayload,
  type CatalogDownloadFields,
} from '@/types/catalog-form';

const defaultValues: CatalogDownloadFields = {
  name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  sector: '',
  accepts_marketing: false,
};

type CatalogDownloadFormProps = {
  catalogId: string;
  catalogSlug: string;
  onSuccess: (downloadUrl: string) => void;
};

export function CatalogDownloadForm({
  catalogId,
  catalogSlug,
  onSuccess,
}: CatalogDownloadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CatalogDownloadFields>({
    resolver: zodResolver(catalogDownloadFieldsSchema),
    defaultValues,
  });

  const acceptsMarketing = watch('accepts_marketing');

  const onSubmit = handleSubmit(async (fields) => {
    const response = await submitCatalogDownload({
      ...toCatalogPayload(fields),
      catalogId,
      catalogSlug,
    });

    if (response.success && response.data?.downloadUrl) {
      reset(defaultValues);
      onSuccess(response.data.downloadUrl);
      return;
    }

    setError('root', { message: response.message });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-busy={isSubmitting} noValidate>
      {errors.root && (
        <div role="alert" className="rounded-[10px] border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-medium text-red-600">{errors.root.message}</p>
        </div>
      )}

      {[
        { id: 'name' as const, label: 'Nombre completo *', placeholder: 'Tu nombre' },
        { id: 'email' as const, label: 'Correo electrónico *', placeholder: 'tu@empresa.com', type: 'email' },
        { id: 'company' as const, label: 'Empresa *', placeholder: 'Nombre de tu empresa' },
      ].map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={`dl-${field.id}`} className="font-medium text-[#3c4456]">
            {field.label}
          </Label>
          <Input
            id={`dl-${field.id}`}
            type={field.type || 'text'}
            {...register(field.id)}
            placeholder={field.placeholder}
            aria-invalid={!!errors[field.id]}
            className={errors[field.id] ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#316d92]/30'}
          />
          {errors[field.id] && <p className="text-xs text-red-500">{errors[field.id]?.message}</p>}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dl-phone" className="font-medium text-[#3c4456]">
            Teléfono
          </Label>
          <Input id="dl-phone" {...register('phone')} placeholder="+58 " className="border-[#316d92]/30" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dl-city" className="font-medium text-[#3c4456]">
            Ciudad
          </Label>
          <Input id="dl-city" {...register('city')} placeholder="Tu ciudad" className="border-[#316d92]/30" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dl-sector" className="font-medium text-[#3c4456]">
          Sector Industrial
        </Label>
        <Input
          id="dl-sector"
          {...register('sector')}
          placeholder="Petróleo, Construcción, etc."
          className="border-[#316d92]/30"
        />
      </div>

      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id="dl-marketing"
          checked={acceptsMarketing}
          onCheckedChange={(checked) => setValue('accepts_marketing', checked === true)}
        />
        <Label htmlFor="dl-marketing" className="cursor-pointer text-sm leading-tight text-[#316d92]">
          Acepto recibir información comercial y promociones.
        </Label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-yellow focus-ring min-h-[46px] w-full px-6 py-3 text-lg">
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
        <a href="/privacidad" className="focus-ring rounded-sm underline underline-offset-2 hover:text-[#3c4456]">
          Aviso de Privacidad
        </a>
      </p>
    </form>
  );
}
