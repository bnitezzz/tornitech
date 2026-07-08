'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { ASSETS } from '@/constants/assets';
import { useConfigSection } from '@/hooks/use-configuracion';
import type { HeroConfig } from '@/types/configuracion';

const heroFallback: HeroConfig = {
  title: 'TORNILLERÍA Y SISTEMAS DE FIJACIÓN PARA LA INDUSTRIA',
  subtitle: 'Suministro especializado para sectores automotriz, metalmecánico, manufactura y construcción.',
  heading: '',
  primaryCta: 'Solicitar cotización',
  secondaryCta: 'Ver catálogo',
  badges: ['Calidad certificada', 'Entrega Nacional', 'Soporte Técnico'],
};

export function HeroSection() {
  const hero = useConfigSection('hero', heroFallback);
  return (
    <section className="relative w-full overflow-hidden bg-[#f2f2f2]">
      <div className="relative mx-auto min-h-[520px] w-full max-w-[1800px] md:min-h-[600px] lg:min-h-[640px]">
        <Image
          src={ASSETS.hero}
          alt="Almacén de tornillería y componentes de fijación industrial"
          fill
          priority
          sizes="(max-width: 1800px) 100vw, 1800px"
          className="object-cover object-center"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(97.74deg, rgba(242,242,242,0.97) 8%, rgba(242,242,242,0.85) 35%, rgba(67,72,73,0) 72%)',
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-[1440px] items-center px-4 py-20 sm:px-6 md:min-h-[600px] md:px-10 md:py-24 lg:min-h-[640px] lg:px-[52px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="w-full max-w-[640px]"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#316d92]">
              Distribución industrial · Caracas, Venezuela
            </p>

            <h1 className="font-extrabold leading-[1.12] tracking-tight text-[#052042] text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px]">
              {hero.title}
            </h1>

            <p className="mt-4 text-lg font-semibold leading-snug text-[#316d92] sm:text-xl md:text-2xl">
              {hero.subtitle}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#3c4456]/85">
              {hero.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#316d92]" />
                  {badge}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/#contacto"
                className="btn-yellow focus-ring min-h-[48px] w-full px-6 py-3 text-center text-base font-semibold sm:w-auto sm:min-w-[200px]"
              >
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <Link
                href="/#catalogos"
                className="btn-navy focus-ring min-h-[48px] w-full px-6 py-3 text-center text-base sm:w-auto sm:min-w-[200px]"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
