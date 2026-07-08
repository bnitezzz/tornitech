'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { SectionHeader } from '@/components/shared/section-header';
import { useSocioComercial } from '@/hooks/use-contenido';
import { useConfigSection } from '@/hooks/use-configuracion';
import type { PartnerConfig } from '@/types/configuracion';

const fallback: PartnerConfig = {
  heading: 'NUESTRO SOCIO COMERCIAL',
  name: 'Panama Fasteners INC',
  description:
    'Aliado estratégico internacional que garantiza calidad, disponibilidad y soporte técnico especializado.',
  highlights: ['Inventario Internacional', 'Calidad Certificada', 'Soporte Técnico', 'Logística Internacional'],
  cta: 'Conocer más',
};

export function CommercialPartnerSection() {
  const config = useConfigSection('partner_section', fallback);
  const { data: socio } = useSocioComercial();

  const nombre = socio?.name ?? config.name;
  const descripcion = socio?.description ?? config.description;
  const logo = socio?.logo_url ?? ASSETS.partners.panamaFasteners;

  return (
    <section className="section-padding w-full bg-[#f2f2f7]">
      <div className="section-container">
        <SectionHeader heading={config.heading} className="mb-8" />
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(5,32,66,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[260px] lg:min-h-[360px]">
              <Image src={logo} alt={nombre} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#316d92]">Socio comercial</p>
              <h3 className="text-2xl font-extrabold text-[#052042]">{nombre}</h3>
              <p className="text-sm leading-relaxed text-[#6b7280]">{descripcion}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {config.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#052042]">
                    <Check className="h-4 w-4 shrink-0 text-[#316d92]" />
                    {item}
                  </li>
                ))}
              </ul>
              {socio?.website_url ? (
                <Link
                  href={socio.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline focus-ring inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                >
                  {config.cta}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : (
                <span className="btn-outline inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm font-semibold opacity-80">
                  {config.cta}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
