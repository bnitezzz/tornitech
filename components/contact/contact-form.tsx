'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { submitContact } from '@/actions/contact';
import { contactFormFieldsSchema, toContactPayload, type ContactFormFields } from '@/types/contact';
import { useSiteSettings } from '@/hooks/use-site-settings';

const fieldClassName =
  'h-[48px] rounded-lg border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0';

const defaultValues: ContactFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  accepts_marketing: false,
};

type ContactFormProps = {
  trustText?: string;
};

export function ContactForm({ trustText }: ContactFormProps) {
  const { companyName } = useSiteSettings();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormFields>({
    resolver: zodResolver(contactFormFieldsSchema),
    defaultValues,
  });

  const acceptsMarketing = watch('accepts_marketing');

  const onSubmit = handleSubmit(async (fields) => {
    const response = await submitContact(toContactPayload(fields));
    if (response.success) {
      reset(defaultValues);
      return;
    }
    setError('root', { message: response.message });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-busy={isSubmitting} noValidate>
      {isSubmitSuccessful && (
        <div role="status" className="rounded-lg border border-[#316d92]/25 bg-[#316d92]/5 p-3.5">
          <p className="text-sm font-medium text-[#316d92]">Mensaje enviado. Nos pondremos en contacto pronto.</p>
        </div>
      )}
      {errors.root && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3.5">
          <p className="text-sm font-medium text-red-600">{errors.root.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">Nombre *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Tu nombre"
            aria-invalid={!!errors.firstName}
            className={`${fieldClassName} ${errors.firstName ? 'border-red-400' : ''}`}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Apellido *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Tu apellido"
            aria-invalid={!!errors.lastName}
            className={`${fieldClassName} ${errors.lastName ? 'border-red-400' : ''}`}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="tu@empresa.com"
            aria-invalid={!!errors.email}
            className={`${fieldClassName} ${errors.email ? 'border-red-400' : ''}`}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" {...register('phone')} placeholder="+58" className={fieldClassName} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="company">Empresa</Label>
          <Input id="company" {...register('company')} placeholder="Nombre empresa" className={fieldClassName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Asunto</Label>
          <Input id="subject" {...register('subject')} placeholder="¿En qué podemos ayudarte?" className={fieldClassName} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Describe tu consulta o proyecto..."
          aria-invalid={!!errors.message}
          className={`h-[120px] resize-none rounded-lg border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0 ${errors.message ? 'border-red-400' : ''}`}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="accepts-marketing"
          checked={acceptsMarketing}
          onCheckedChange={(checked) => setValue('accepts_marketing', checked === true)}
        />
        <Label htmlFor="accepts-marketing" className="cursor-pointer text-xs leading-tight text-[#6B7280] sm:text-sm">
          Acepto recibir información comercial y promociones de {companyName}.
        </Label>
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-navy-solid h-[48px] w-full text-base">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={1.75} /> Enviar mensaje
          </>
        )}
      </button>

      {trustText && (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#316d92]" strokeWidth={1.75} />
          {trustText}
        </p>
      )}
    </form>
  );
}
