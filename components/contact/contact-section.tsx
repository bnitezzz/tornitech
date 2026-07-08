'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { CONTACT_CONTENT } from '@/constants/content';
import { useConfigSection } from '@/hooks/use-configuracion';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { ContactForm } from '@/components/contact/contact-form';
import type { WhatsAppMessageType } from '@/lib/whatsapp';

type ContactSectionConfig = {
  heading: string;
  subheading?: string;
};

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
  const config = useConfigSection<ContactSectionConfig>('contact_section', {
    heading: 'Contacto',
    subheading: CONTACT_CONTENT.responseTime,
  });
  const { phone, email, address, businessHours } = useSiteSettings();

  const contactInfo = [
    { icon: Phone, label: 'Teléfono', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
    { icon: Mail, label: 'Correo', value: email, href: `mailto:${email}` },
    { icon: MapPin, label: 'Dirección', value: address, href: undefined },
    { icon: Clock, label: 'Horario', value: businessHours, href: undefined },
  ];

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
            <h2 className="section-heading">{config.heading}</h2>
            <span className="section-accent mt-3" />
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-[#3c4456]/70 sm:text-base">
              {config.subheading || CONTACT_CONTENT.responseTime}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.1)] sm:p-7"
            >
              <ContactForm trustText={CONTACT_CONTENT.trustText} />
            </motion.div>

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
