'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ABOUT_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';

const cardClassName =
  'card-elevated flex flex-col items-center rounded-xl border border-slate-100 bg-white px-5 py-6 text-center sm:px-6 sm:py-7';

export function AboutSection() {
  return (
    <section id="nosotros" className="section-padding section-bg-soft relative w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={ABOUT_CONTENT.heading}
          className="mx-auto w-full max-w-[900px]"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-[760px] text-center text-body xl:max-w-[820px] 2xl:max-w-[880px]"
        >
          {ABOUT_CONTENT.intro}
        </motion.p>

        {/* Mission + Vision */}
        <div className="mx-auto mt-10 grid w-full max-w-[920px] grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5 xl:max-w-[980px] 2xl:max-w-[1040px]">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cardClassName}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#316d92]">
              {ABOUT_CONTENT.mission.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#3c4456]/85 sm:text-base">
              {ABOUT_CONTENT.mission.text}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cardClassName}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#316d92]">
              {ABOUT_CONTENT.vision.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#3c4456]/85 sm:text-base">
              {ABOUT_CONTENT.vision.text}
            </p>
          </motion.article>
        </div>

        {/* Pillars / Valores — sin recuadros en móvil para reducir fatiga visual */}
        <div className="mx-auto mt-8 grid w-full max-w-[1100px] grid-cols-1 gap-0 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:max-w-[1200px] 2xl:max-w-[1280px]">
          {ABOUT_CONTENT.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex flex-col items-start border-b border-slate-200/80 py-5 text-left last:border-b-0 sm:items-center sm:rounded-xl sm:border sm:border-slate-100 sm:bg-white sm:px-6 sm:py-7 sm:text-center sm:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_20px_-6px_rgba(15,23,42,0.12)]"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#316d92]/[0.06] sm:mb-3 sm:h-9 sm:w-9">
                <pillar.icon className="h-[18px] w-[18px] text-[#316d92]" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-[#052042]">{pillar.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#6b7280] sm:mt-1.5 sm:text-sm">
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
          className="relative mx-auto mt-8 h-[180px] w-full max-w-[1100px] overflow-hidden rounded-xl sm:h-[220px] md:h-[260px] xl:max-w-[1200px] 2xl:max-w-[1280px] 2xl:h-[280px]"
        >
          <Image
            src={ASSETS.about}
            alt="Componentes de fijación industrial en almacén"
            fill
            sizes="(max-width: 1320px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#052042]/55 to-transparent" />
          <p className="absolute bottom-5 left-1/2 max-w-[420px] -translate-x-1/2 px-4 text-center text-sm font-medium leading-relaxed text-white sm:bottom-6 sm:text-base">
            Material identificado con ficha técnica y norma de referencia en cada pedido.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
