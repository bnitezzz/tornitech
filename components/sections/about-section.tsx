'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ABOUT_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

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
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          className="mx-auto mt-5 max-w-[760px] text-center text-body"
        >
          {ABOUT_CONTENT.intro}
        </motion.p>

        {/* Mission + Vision — texto plano, sin tarjetas */}
        <div className="mx-auto mt-10 grid w-full max-w-[880px] grid-cols-1 gap-8 border-y border-[#316d92]/15 py-8 md:grid-cols-2 md:gap-12 md:py-10">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#316d92]">
              {ABOUT_CONTENT.mission.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#3c4456]/90 sm:text-[15px]">
              {ABOUT_CONTENT.mission.text}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.06, duration: 0.4, ease: EASE_PREMIUM }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#316d92]">
              {ABOUT_CONTENT.vision.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#3c4456]/90 sm:text-[15px]">
              {ABOUT_CONTENT.vision.text}
            </p>
          </motion.article>
        </div>

        {/* Valores — timeline vertical compacta */}
        <div className="mx-auto mt-12 w-full max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="mb-8 text-center"
          >
            <h3 className="section-heading text-[#052042]">{ABOUT_CONTENT.valuesHeading}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6b7280]">
              {ABOUT_CONTENT.valuesIntro}
            </p>
          </motion.div>

          <ol className="relative m-0 list-none p-0">
            <span
              className="absolute bottom-2 left-[15px] top-2 w-px bg-[#316d92]/25 md:left-[19px]"
              aria-hidden="true"
            />
            {ABOUT_CONTENT.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  delay: Math.min(index * 0.05, 0.25),
                  duration: 0.4,
                  ease: EASE_PREMIUM,
                }}
                className="relative flex gap-4 pb-7 last:pb-0 md:gap-5"
              >
                <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f5f8] text-[11px] font-bold tabular-nums text-[#316d92] ring-4 ring-white md:h-10 md:w-10 md:text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 pt-0.5 md:pt-1.5">
                  <h4 className="text-sm font-bold tracking-wide text-[#052042] sm:text-base">
                    {pillar.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#3c4456]/80">
                    {pillar.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="relative mx-auto mt-12 h-[160px] w-full max-w-[880px] overflow-hidden rounded-xl sm:h-[200px] md:h-[240px]"
        >
          <Image
            src={ASSETS.about}
            alt="Componentes de fijación industrial en almacén"
            fill
            sizes="(max-width: 880px) 100vw, 880px"
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
