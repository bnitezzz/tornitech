'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { useConfigSection } from '@/hooks/use-configuracion';
import type { CtaFinalConfig } from '@/types/configuracion';

const fallback: CtaFinalConfig = {
  heading: '¿Listo para su próximo proyecto?',
  subheading: 'Solicite una cotización con ficha técnica y plazo de entrega definido.',
  primaryCta: 'Solicitar cotización',
  secondaryCta: 'Contactar por WhatsApp',
};

export function CtaFinalSection() {
  const config = useConfigSection('cta_final', fallback);

  return (
    <section className="section-padding w-full bg-[#052042]">
      <div className="section-container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{config.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">{config.subheading}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#contacto" className="btn-yellow focus-ring min-w-[200px] px-6 py-3 text-center font-semibold">
              {config.primaryCta}
            </Link>
            <a
              href={getWhatsAppLink('general_quote')}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring min-w-[200px] rounded-lg border border-white/30 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/10"
            >
              {config.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
