'use client';

import { Send, Loader2, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SITE_CONFIG } from '@/constants/site';
import { CONTACT_CONTENT } from '@/constants/content';
import type { useContactForm } from '@/hooks/use-contact-form';

const fieldClassName =
  'h-[48px] rounded-[10px] border-[#E5E7EB]/80 bg-white/90 text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0';

type ContactFormProps = ReturnType<typeof useContactForm>;

export function ContactForm({
  formData,
  errors,
  isSubmitting,
  success,
  handleChange,
  setAcceptsMarketing,
  handleSubmit,
}: ContactFormProps) {
  return (
    <div>
      {success && (
        <div role="status" className="mb-5 rounded-[10px] border border-[#316d92]/25 bg-[#316d92]/5 p-3.5">
          <p className="text-sm font-medium text-[#316d92]">
            Mensaje enviado. Nos pondremos en contacto pronto.
          </p>
        </div>
      )}
      {errors.form && (
        <div role="alert" className="mb-5 rounded-[10px] border border-red-200 bg-red-50 p-3.5">
          <p className="text-sm font-medium text-red-600">{errors.form}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative space-y-4" aria-busy={isSubmitting}>
        <div
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <Label htmlFor="contact-website">Sitio web</Label>
          <Input
            id="contact-website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm font-medium text-[#1F2937]">
              Nombre *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              className={`${fieldClassName} ${errors.firstName ? 'border-red-400' : ''}`}
            />
            {errors.firstName && (
              <p id="firstName-error" role="alert" className="text-xs text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-sm font-medium text-[#1F2937]">
              Apellido *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Tu apellido"
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              className={`${fieldClassName} ${errors.lastName ? 'border-red-400' : ''}`}
            />
            {errors.lastName && (
              <p id="lastName-error" role="alert" className="text-xs text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-[#1F2937]">
              Correo electrónico *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@empresa.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${fieldClassName} ${errors.email ? 'border-red-400' : ''}`}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-[#1F2937]">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+58"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-sm font-medium text-[#1F2937]">
              Empresa
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre empresa"
              className={fieldClassName}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-sm font-medium text-[#1F2937]">
              Asunto
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="¿En qué podemos ayudarte?"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium text-[#1F2937]">
            Mensaje *
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe tu consulta o proyecto..."
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`h-[120px] resize-none rounded-[10px] border-[#E5E7EB]/80 bg-white/90 text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0 ${
              errors.message ? 'border-red-400' : ''
            }`}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="accepts-marketing"
            checked={formData.accepts_marketing}
            onCheckedChange={(checked) => setAcceptsMarketing(checked === true)}
          />
          <Label
            htmlFor="accepts-marketing"
            className="cursor-pointer text-xs leading-tight text-[#6B7280] sm:text-sm"
          >
            Acepto recibir información comercial y promociones de {SITE_CONFIG.name}.
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

        <p className="flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#316d92]" strokeWidth={1.75} />
          {CONTACT_CONTENT.trustText}
        </p>
      </form>
    </div>
  );
}
