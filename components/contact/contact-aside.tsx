'use client';

import { useMemo } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { useSiteContact } from '@/components/providers/site-contact-provider';
import { CONTACT_CONTENT } from '@/constants/content';
import type { WhatsAppMessageType } from '@/lib/whatsapp';

const whatsappQuestions: {
  title: string;
  description: string;
  messageType: WhatsAppMessageType;
}[] = [
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

export function ContactAside() {
  const contact = useSiteContact();

  const contactInfo = useMemo(
    () => [
      ...contact.phones.map((number) => ({
        icon: Phone,
        label: 'Teléfono',
        value: number,
        href: `tel:${number.replace(/[^0-9+]/g, '')}`,
      })),
      { icon: Mail, label: 'Correo', value: contact.email, href: `mailto:${contact.email}` },
      {
        icon: MapPin,
        label: 'Dirección',
        value: contact.address,
        href: undefined as string | undefined,
      },
      {
        icon: Clock,
        label: 'Horario',
        value: contact.businessHours,
        href: undefined as string | undefined,
      },
    ],
    [contact.address, contact.businessHours, contact.email, contact.phones]
  );

  return (
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
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-snug text-[#1F2937]">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a
                key={`${item.label}-${item.value}`}
                href={item.href}
                className="focus-ring block rounded-[10px] transition-opacity hover:opacity-80"
              >
                {inner}
              </a>
            ) : (
              <div key={`${item.label}-${item.value}`}>{inner}</div>
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
  );
}
