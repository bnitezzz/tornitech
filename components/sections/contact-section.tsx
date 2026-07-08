'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { submitContact } from '@/actions/contact';
import { contactFormSchema } from '@/types';
import { SITE_CONFIG } from '@/constants/site';
import { CONTACT_CONTENT } from '@/constants/content';
import type { WhatsAppMessageType } from '@/lib/whatsapp';

const fieldClassName =
  'h-[48px] rounded-lg border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0';

const contactInfo = [
  { icon: Phone, label: 'Teléfono', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}` },
  { icon: Mail, label: 'Correo', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: MapPin, label: 'Dirección', value: SITE_CONFIG.address, href: undefined },
  { icon: Clock, label: 'Horario', value: SITE_CONFIG.businessHours, href: undefined },
];

const whatsappQuestions: { title: string; description: string; messageType: WhatsAppMessageType }[] = [
  {
    title: CONTACT_CONTENT.helpOptions[0].title,
    description: CONTACT_CONTENT.helpOptions[0].description,
    messageType: 'general_quote',
  },
  {
    title: CONTACT_CONTENT.helpOptions[1].title,
    description: CONTACT_CONTENT.helpOptions[1].description,
    messageType: 'general_quote',
  },
  {
    title: CONTACT_CONTENT.helpOptions[2].title,
    description: CONTACT_CONTENT.helpOptions[2].description,
    messageType: 'distributor',
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    accepts_marketing: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: Record<string, string> = {};
    if (formData.lastName.trim().length < 2) {
      fieldErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

    const name = `${formData.firstName} ${formData.lastName}`.trim();
    const payload = {
      name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      subject: formData.subject || undefined,
      message: formData.message,
      accepts_marketing: formData.accepts_marketing,
    };
    const result = contactFormSchema.safeParse(payload);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
    }

    if (Object.keys(fieldErrors).length > 0 || !result.success) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const response = await submitContact(result.data);
    setIsSubmitting(false);

    if (response.success) {
      setSuccess(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', company: '',
        subject: '', message: '', accepts_marketing: false,
      });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setErrors({ form: response.message });
    }
  };

  return (
    <section id="contacto" className="section-padding w-full bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-[1040px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center md:mb-10"
          >
            <h2 className="section-heading">Contacto</h2>
            <span className="section-accent mt-3" />
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-[#3c4456]/70 sm:text-base">
              {CONTACT_CONTENT.responseTime}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)] sm:p-7"
            >
              {success && (
                <div role="status" className="mb-5 rounded-lg border border-[#316d92]/25 bg-[#316d92]/5 p-3.5">
                  <p className="text-sm font-medium text-[#316d92]">Mensaje enviado. Nos pondremos en contacto pronto.</p>
                </div>
              )}
              {errors.form && (
                <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3.5">
                  <p className="text-sm font-medium text-red-600">{errors.form}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-sm font-medium text-[#1F2937]">Nombre *</Label>
                    <Input
                      id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="Tu nombre" required
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      className={`${fieldClassName} ${errors.firstName ? 'border-red-400' : ''}`}
                    />
                    {errors.firstName && <p id="firstName-error" role="alert" className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-sm font-medium text-[#1F2937]">Apellido *</Label>
                    <Input
                      id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                      placeholder="Tu apellido" required
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      className={`${fieldClassName} ${errors.lastName ? 'border-red-400' : ''}`}
                    />
                    {errors.lastName && <p id="lastName-error" role="alert" className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-[#1F2937]">Correo electrónico *</Label>
                    <Input
                      id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="tu@empresa.com" required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${fieldClassName} ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p id="email-error" role="alert" className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium text-[#1F2937]">Teléfono</Label>
                    <Input
                      id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+58" className={fieldClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-sm font-medium text-[#1F2937]">Empresa</Label>
                    <Input
                      id="company" name="company" value={formData.company} onChange={handleChange}
                      placeholder="Nombre empresa" className={fieldClassName}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="text-sm font-medium text-[#1F2937]">Asunto</Label>
                    <Input
                      id="subject" name="subject" value={formData.subject} onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?" className={fieldClassName}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-medium text-[#1F2937]">Mensaje *</Label>
                  <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Describe tu consulta o proyecto..." required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`h-[120px] resize-none rounded-lg border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0 ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message && <p id="message-error" role="alert" className="text-xs text-red-500">{errors.message}</p>}
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="accepts-marketing"
                    checked={formData.accepts_marketing}
                    onCheckedChange={(checked) =>
                      setFormData((p) => ({ ...p, accepts_marketing: checked === true }))
                    }
                  />
                  <Label htmlFor="accepts-marketing" className="cursor-pointer text-xs leading-tight text-[#6B7280] sm:text-sm">
                    Acepto recibir información comercial y promociones de {SITE_CONFIG.name}.
                  </Label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-navy-solid h-[48px] w-full text-base"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Enviando...</>
                  ) : (
                    <><Send className="h-4 w-4" strokeWidth={1.75} /> Enviar mensaje</>
                  )}
                </button>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#316d92]" strokeWidth={1.75} />
                  {CONTACT_CONTENT.trustText}
                </p>
              </form>
            </motion.div>

            {/* Sidebar — contact info + WhatsApp questions */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-xl border border-slate-100 bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#052042]">
                  Información de contacto
                </h3>
                <div className="mt-4 space-y-4">
                  {contactInfo.map((item) => {
                    const inner = (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#316d92]/[0.06]">
                          <item.icon className="h-4 w-4 text-[#316d92]" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">{item.label}</p>
                          <p className="mt-0.5 text-sm font-medium leading-snug text-[#1F2937]">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} className="focus-ring block rounded-lg transition-opacity hover:opacity-80">
                        {inner}
                      </a>
                    ) : (
                      <div key={item.label}>{inner}</div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#052042]">
                  Consultas rápidas
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6b7280]">
                  Seleccione una opción para escribirnos por WhatsApp.
                </p>
                <ul className="mt-4 space-y-2">
                  {whatsappQuestions.map((item) => (
                    <li key={item.title}>
                      <WhatsAppLink
                        messageType={item.messageType}
                        className="focus-ring group flex w-full items-center justify-between gap-3 rounded-lg border border-slate-100 px-3.5 py-3 text-left transition-all duration-200 hover:border-[#316d92]/25 hover:bg-[#316d92]/[0.03]"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#052042]">{item.title}</p>
                          <p className="mt-0.5 text-xs leading-snug text-[#6b7280]">{item.description}</p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-[#316d92] transition-transform duration-200 group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </WhatsAppLink>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
