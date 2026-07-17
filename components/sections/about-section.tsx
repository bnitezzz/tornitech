'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { ABOUT_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

export function AboutSection() {
  return (
    <section id="nosotros" className="section-padding-tight section-bg-soft relative w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={ABOUT_CONTENT.heading}
          className="mx-auto w-full max-w-[900px] mb-0"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          className="mx-auto mt-4 max-w-[760px] text-center text-body"
        >
          {ABOUT_CONTENT.intro}
        </motion.p>

        {/* Mission + Vision — texto plano, sin tarjetas */}
        <div className="mx-auto mt-7 grid w-full max-w-[880px] grid-cols-1 gap-6 border-y border-[#316d92]/15 py-6 md:grid-cols-2 md:gap-10 md:py-8">
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

        {/* Valores — FAQ 2 columnas, líneas sutiles, sin tarjetas */}
        <div className="mx-auto mt-8 w-full max-w-[880px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="mb-5 text-center md:mb-6"
          >
            <h3 className="section-heading text-[#052042]">{ABOUT_CONTENT.valuesHeading}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6b7280]">
              {ABOUT_CONTENT.valuesIntro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
            className="rounded-2xl bg-white/60 px-2 py-1 sm:px-3"
          >
            <dl className="grid grid-cols-1 md:grid-cols-2">
              {ABOUT_CONTENT.pillars.map((pillar, index) => {
                const total = ABOUT_CONTENT.pillars.length;
                const isLast = index === total - 1;
                const spansFull = isLast && total % 2 === 1;
                const showTopRuleMobile = index > 0;
                const showTopRuleDesktop = index >= 2;
                const showRightRule = index % 2 === 0 && !spansFull;

                return (
                  <div
                    key={pillar.title}
                    className={[
                      'px-4 py-5 sm:px-6 sm:py-6',
                      showTopRuleMobile ? 'border-t border-[#316d92]/12' : '',
                      showTopRuleDesktop ? 'md:border-t md:border-[#316d92]/12' : 'md:border-t-0',
                      showRightRule ? 'md:border-r md:border-[#316d92]/12' : '',
                      spansFull ? 'md:col-span-2 md:text-center' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <dt className="text-sm font-bold tracking-wide text-[#052042] sm:text-base">
                      {pillar.title}
                    </dt>
                    <dd
                      className={`mt-1.5 text-sm leading-relaxed text-[#3c4456]/80 ${
                        spansFull ? 'mx-auto max-w-lg' : ''
                      }`}
                    >
                      {pillar.description}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="relative mx-auto mt-8 h-[130px] w-full max-w-[880px] overflow-hidden rounded-xl sm:mt-10 sm:h-[170px] md:h-[200px]"
        >
          <Image
            src={ASSETS.about}
            alt="Fachada de la tienda física de CCS Tornitech con su logo y eslogan Fijamos Soluciones"
            fill
            sizes="(max-width: 880px) 100vw, 880px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#052042]/70 via-[#052042]/25 to-transparent" />
          <p className="absolute bottom-4 left-1/2 max-w-[420px] -translate-x-1/2 px-4 text-center text-sm font-medium leading-relaxed text-white sm:bottom-5 sm:text-base">
            Material identificado con ficha técnica y norma de referencia en cada pedido.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
