'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Loader2, Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { SectionHeader } from '@/components/ui/section-header';
import { submitContact } from '@/actions/contact';
import { contactFormSchema } from '@/types';
import { SITE_CONFIG } from '@/constants/site';
import { CONTACT_CONTENT } from '@/constants/content';
import type { WhatsAppMessageType } from '@/lib/whatsapp';
import { EASE_PREMIUM, VIEWPORT_ONCE, fadeUp, reducedMotionVisible } from '@/lib/motion';

const fieldClassName =
  'h-[48px] rounded-[10px] border-[#E5E7EB]/80 bg-white/90 text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0';

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
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = prefersReducedMotion ? reducedMotionVisible : fadeUp;

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
    <section
      id="contacto"
      className="section-padding relative w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(165deg, #f2f2f7 0%, #e8eef3 42%, #f8fafc 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#316d92]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#fab43a]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-[1080px]">
          <SectionHeader
            heading="Contacto"
            subheading={CONTACT_CONTENT.responseTime}
            className="mb-8 md:mb-10"
          />

          <motion.div
            variants={motionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="glass-panel rounded-2xl p-5 sm:p-7 lg:p-8"
          >
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
              <div>
                {success && (
                  <div role="status" className="mb-5 rounded-[10px] border border-[#316d92]/25 bg-[#316d92]/5 p-3.5">
                    <p className="text-sm font-medium text-[#316d92]">Mensaje enviado. Nos pondremos en contacto pronto.</p>
                  </div>
                )}
                {errors.form && (
                  <div role="alert" className="mb-5 rounded-[10px] border border-red-200 bg-red-50 p-3.5">
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
                      className={`h-[120px] resize-none rounded-[10px] border-[#E5E7EB]/80 bg-white/90 text-[#1F2937] placeholder:text-[#9CA3AF] transition-colors duration-200 focus-visible:border-[#316d92] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#316d92]/15 focus-visible:ring-offset-0 ${errors.message ? 'border-red-400' : ''}`}
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
              </div>

              <aside className="flex flex-col gap-5">
                <div className="rounded-xl border border-white/60 bg-white/50 p-5 backdrop-blur-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#052042]">
                    Información de contacto
                  </h3>
                  <div className="mt-4 space-y-4">
                    {contactInfo.map((item) => {
                      const inner = (
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#316d92]/[0.08]">
                            <item.icon className="h-4 w-4 text-[#316d92]" strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">{item.label}</p>
                            <p className="mt-0.5 text-sm font-medium leading-snug text-[#1F2937]">{item.value}</p>
                          </div>
                        </div>
                      );
                      return item.href ? (
                        <a key={item.label} href={item.href} className="focus-ring block rounded-[10px] transition-opacity hover:opacity-80">
                          {inner}
                        </a>
                      ) : (
                        <div key={item.label}>{inner}</div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-white/60 bg-white/50 p-5 backdrop-blur-sm">
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
                          className="focus-ring group flex w-full items-center justify-between gap-3 rounded-[10px] border border-slate-100/80 bg-white/70 px-3.5 py-3 text-left transition-all duration-200 hover:border-[#316d92]/25 hover:bg-white"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#052042]">{item.title}</p>
                            <p className="mt-0.5 text-xs leading-snug text-[#6b7280]">{item.description}</p>
                          </div>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[#316d92] transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                            strokeWidth={1.75}
                          />
                        </WhatsAppLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
