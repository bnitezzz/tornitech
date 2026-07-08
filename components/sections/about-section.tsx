'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ABOUT_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';

const cardClassName =
  'rounded-xl border border-slate-100 bg-white px-5 py-6 sm:px-6 sm:py-7';

export function AboutSection() {
  return (
    <section id="nosotros" className="section-padding relative w-full bg-white">
      <div className="section-container">
        <SectionHeader heading={ABOUT_CONTENT.heading} className="max-w-[900px]" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-[760px] text-center text-body"
        >
          {ABOUT_CONTENT.intro}
        </motion.p>

        {/* Mission + Vision — separated, same style */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cardClassName}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#316d92]">
              {ABOUT_CONTENT.mission.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#3c4456]/85 sm:text-base">
              {ABOUT_CONTENT.mission.text}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className={cardClassName}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#316d92]">
              {ABOUT_CONTENT.vision.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#3c4456]/85 sm:text-base">
              {ABOUT_CONTENT.vision.text}
            </p>
          </motion.article>
        </div>

        {/* Pillars — separated, same style */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {ABOUT_CONTENT.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={cardClassName}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#316d92]/[0.06]">
                <pillar.icon className="h-[18px] w-[18px] text-[#316d92]" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-[#052042]">{pillar.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6b7280] sm:text-sm">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-8 h-[180px] w-full overflow-hidden rounded-xl sm:h-[220px] md:h-[260px]"
        >
          <Image
            src={ASSETS.about}
            alt="Componentes de fijación industrial en almacén"
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#052042]/55 to-transparent" />
          <p className="absolute bottom-5 left-5 max-w-[420px] text-sm font-medium leading-relaxed text-white sm:bottom-6 sm:left-6 sm:text-base">
            Material identificado con ficha técnica y norma de referencia en cada pedido.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
