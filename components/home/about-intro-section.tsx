'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ASSETS } from '@/constants/assets';
import { useConfigSection } from '@/hooks/use-configuracion';

type AboutConfig = { heading: string; intro: string };

export function AboutIntroSection() {
  const config = useConfigSection<AboutConfig>('about_section', {
    heading: 'QUIÉNES SOMOS',
    intro: '',
  });

  return (
    <section id="nosotros" className="section-padding w-full bg-white">
      <div className="section-container flex flex-col items-center">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-[900px] text-center"
        >
          <h2 className="section-heading">{config.heading}</h2>
          <span className="section-accent" />
        </motion.header>
        {config.intro && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-5 max-w-[760px] text-center text-body"
          >
            {config.intro}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto mt-8 h-[180px] w-full max-w-[1100px] overflow-hidden rounded-xl sm:h-[220px] md:h-[260px]"
        >
          <Image
            src={ASSETS.about}
            alt="Componentes de fijación industrial"
            fill
            sizes="(max-width: 1320px) 100vw, 1100px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#052042]/55 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
