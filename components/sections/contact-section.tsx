'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContact } from '@/actions/contact';
import { contactFormSchema } from '@/types';
import { SITE_CONFIG } from '@/constants/site';
import { CONTACT_CONTENT } from '@/constants/content';

const helpOptions = [
  {
    title: CONTACT_CONTENT.helpOptions[0].title,
    description: CONTACT_CONTENT.helpOptions[0].description,
    href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo solicitar una cotización.')}`,
    external: true,
  },
  {
    title: CONTACT_CONTENT.helpOptions[1].title,
    description: CONTACT_CONTENT.helpOptions[1].description,
    href: `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`,
    external: false,
  },
  {
    title: CONTACT_CONTENT.helpOptions[2].title,
    description: CONTACT_CONTENT.helpOptions[2].description,
    href: `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Programa de distribuidores')}`,
    external: false,
  },
];

const fieldClassName =
  'h-[52px] rounded-[8px] border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0';

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
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
    const result = contactFormSchema.safeParse({ ...formData, name });
    if (!result.success) {
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const response = await submitContact(result.data as NonNullable<typeof result.data>);
    setIsSubmitting(false);

    if (response.success) {
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setErrors({ form: response.message });
    }
  };

  const contactInfo = [
    { icon: MapPin, label: 'Dirección', value: SITE_CONFIG.address, href: undefined },
    { icon: Phone, label: 'Teléfono', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}` },
    { icon: Mail, label: 'Correo', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: Clock, label: 'Horario', value: SITE_CONFIG.businessHours, href: undefined },
  ];

  return (
    <section id="contacto" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-10">
          {/* Left column: form + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-[18px] bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_16px_40px_-16px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10">
              {success && (
                <div role="status" className="mb-6 rounded-[10px] border border-[#316d92]/25 bg-[#316d92]/5 p-4">
                  <p className="font-medium text-[#316d92]">Mensaje enviado. Nos pondremos en contacto pronto.</p>
                </div>
              )}
              {errors.form && (
                <div role="alert" className="mb-6 rounded-[10px] border border-red-200 bg-red-50 p-4">
                  <p className="font-medium text-red-600">{errors.form}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-medium text-[#1F2937]">Nombre *</Label>
                    <Input
                      id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="Tu nombre" required
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      className={`${fieldClassName} ${errors.firstName ? 'border-red-400' : ''}`}
                    />
                    {errors.firstName && <p id="firstName-error" role="alert" className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-medium text-[#1F2937]">Apellido *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-[#1F2937]">Correo electrónico *</Label>
                  <Input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    placeholder="tu@empresa.com" required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`${fieldClassName} ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && <p id="email-error" role="alert" className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium text-[#1F2937]">Teléfono</Label>
                  <Input
                    id="phone" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+58" className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-medium text-[#1F2937]">Empresa</Label>
                  <Input
                    id="company" name="company" value={formData.company} onChange={handleChange}
                    placeholder="Nombre empresa" className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-medium text-[#1F2937]">Asunto</Label>
                  <Input
                    id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?" className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-medium text-[#1F2937]">Mensaje *</Label>
                  <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    placeholder="Describe tu consulta o proyecto..." required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`h-[160px] resize-none rounded-[8px] border-[#E5E7EB] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0 ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message && <p id="message-error" role="alert" className="text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#052042] text-base font-semibold text-white transition-colors duration-300 hover:bg-[#316d92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#316d92] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> Enviando...</>
                  ) : (
                    <><Send className="h-4 w-4" strokeWidth={1.75} /> Enviar Mensaje</>
                  )}
                </button>

                <p className="flex items-start gap-2 text-xs leading-relaxed text-[#6B7280]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#316d92]" strokeWidth={1.75} />
                  Respondemos su solicitud el mismo día hábil. Su información solo se utiliza para dar
                  seguimiento a esta consulta.
                </p>
              </form>
            </div>

            {/* Contact info */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1F2937]">Información de Contacto</h3>
              <div className="mt-4 space-y-4">
                {contactInfo.map((item) => {
                  const content = (
                    <>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#F8FAFC] transition-colors duration-300 group-hover:bg-[#316d92]/10">
                        <item.icon className="h-4 w-4 text-[#316d92]" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">{item.label}</p>
                        <p className="text-sm font-medium text-[#1F2937]">{item.value}</p>
                      </div>
                    </>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="focus-ring group flex items-center gap-3 rounded-lg">
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="flex items-center gap-3">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right column: help panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-[18px] bg-[#F8FAFC] p-6 sm:p-10 lg:p-[60px]"
          >
            <h2 className="text-[28px] font-bold leading-tight text-[#052042] sm:text-[32px] lg:text-[36px]">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="mt-4 max-w-[480px] text-base leading-relaxed text-[#6B7280]">
              Complete el formulario o seleccione una opción directa. {SITE_CONFIG.responseTime}
            </p>

            <div className="mt-8">
              {helpOptions.map((option) => (
                <a
                  key={option.title}
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className="focus-ring group -mx-4 flex items-center justify-between gap-4 rounded-[12px] border-b border-[#E5E7EB] px-4 py-5 transition-all duration-300 last:border-b-0 hover:border-b-transparent hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]"
                >
                  <div>
                    <p className="font-semibold text-[#1F2937]">{option.title}</p>
                    <p className="mt-1 text-sm text-[#6B7280]">{option.description}</p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-[#316d92] transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </a>
              ))}
            </div>

            <div className="mt-10 border-t border-[#E5E7EB] pt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                Al contactarnos usted obtiene
              </p>
              <ul className="mt-4 space-y-3">
                {CONTACT_CONTENT.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-[#3c4456]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#316d92]" strokeWidth={1.75} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-[#6B7280]">
                {CONTACT_CONTENT.trustText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
