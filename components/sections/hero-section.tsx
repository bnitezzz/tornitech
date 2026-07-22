'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { staggerContainer, staggerItem, reducedMotionVisible } from '@/lib/motion';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedMotionVisible : staggerItem;
  const container = prefersReducedMotion ? reducedMotionVisible : staggerContainer;

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-[#f2f2f2]">
      <div className="relative mx-auto min-h-[560px] w-full max-w-[1800px] md:min-h-[640px] lg:min-h-[700px] 2xl:min-h-[760px] 2xl:max-w-[1920px]">
        <Image
          src={ASSETS.hero}
          alt="Almacén de tornillería y componentes de fijación industrial"
          fill
          priority
          sizes="(max-width: 1800px) 100vw, 1800px"
          className="object-cover object-[center_42%]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(97.74deg, rgba(242,242,242,0.97) 8%, rgba(242,242,242,0.85) 35%, rgba(67,72,73,0) 72%)',
          }}
          aria-hidden="true"
        />

        <div className="section-container relative z-10 flex min-h-[500px] items-center pt-28 pb-16 md:min-h-[580px] md:pt-32 md:pb-20 lg:min-h-[640px] lg:pt-36 2xl:min-h-[700px]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[640px]"
          >
            <motion.p
              variants={variants}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#316d92]"
            >
              Distribución industrial · Caracas, Venezuela
            </motion.p>

            <motion.h1
              variants={variants}
              className="font-extrabold uppercase leading-[1.12] tracking-tight text-[#052042] text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px]"
            >
              {HERO_CONTENT.title}
            </motion.h1>

            <motion.p
              variants={variants}
              className="mt-4 text-lg font-semibold leading-snug text-[#316d92] sm:text-xl md:text-2xl"
            >
              {HERO_CONTENT.subtitle}
            </motion.p>

            <motion.p
              variants={variants}
              className="mt-5 max-w-[560px] text-base leading-relaxed text-[#3c4456]/85 sm:text-lg"
            >
              {HERO_CONTENT.description}
            </motion.p>

            <motion.div
              variants={variants}
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                href="/#contacto"
                className="btn-yellow focus-ring min-h-[48px] w-full px-6 py-3 text-center text-base font-semibold sm:w-auto sm:min-w-[200px]"
              >
                {HERO_CONTENT.primaryCta}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <Link
                href="/#catalogos"
                className="btn-navy focus-ring min-h-[48px] w-full px-6 py-3 text-center text-base sm:w-auto sm:min-w-[200px]"
              >
                {HERO_CONTENT.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
