'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { SECTORS_CONTENT } from '@/constants/content';

function SectorFlipCard({
  sector,
  index,
}: {
  sector: (typeof SECTORS_CONTENT.sectors)[number];
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="h-full min-h-[200px] w-full [perspective:1000px] sm:min-h-[220px]"
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${sector.title}. ${flipped ? 'Mostrar sector' : 'Mostrar soluciones de fijación'}`}
        onClick={() => setFlipped((prev) => !prev)}
        className="focus-ring group relative h-full w-full rounded-[14px] text-left"
      >
        <div
          className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front — sector */}
          <div className="absolute inset-0 overflow-hidden rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-shadow duration-300 group-hover:shadow-[0_10px_28px_rgba(5,32,66,0.35)] [backface-visibility:hidden]">
            <Image
              src={sector.image}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/55 group-hover:via-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <h3 className="text-center text-xs font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-sm md:text-base">
                {sector.title}
              </h3>
              <p className="mt-1 text-center text-[10px] text-white/80 sm:text-[11px]">
                {SECTORS_CONTENT.flipHint}
              </p>
            </div>
          </div>

          {/* Back — soluciones */}
          <div className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-[14px] bg-[#052042] px-3.5 py-4 shadow-[0_4px_14px_rgba(0,0,0,0.25)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7eb8d4]">
              Soluciones de fijación clave
            </p>
            <h3 className="mt-1 text-sm font-extrabold uppercase tracking-wide text-[#fab43a]">
              {sector.title}
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-white sm:text-sm">
              {sector.solutions}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export function SectorsSection() {
  return (
    <section id="sectores" className="section-padding-tight section-bg-fade-top w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          className="mb-5 md:mb-7"
        />

        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <SectorFlipCard key={sector.title} sector={sector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
