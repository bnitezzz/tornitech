'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { HorizontalScroll } from '@/components/ui/horizontal-scroll';
import { SECTORS_CONTENT } from '@/constants/content';

export function SectorsSection() {
  return (
    <section id="sectores" className="section-bg-sectors relative w-full pb-24 pt-10 md:pb-28 md:pt-12">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          inverse
          className="mb-6 md:mb-8"
        />

        <HorizontalScroll
          ariaLabel="Sectores industriales"
          className="w-full [&_button]:border-white/30 [&_button]:bg-[#052042]/85 [&_button]:text-white"
        >
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[5/4] w-[min(70vw,220px)] shrink-0 snap-start overflow-hidden rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.25)] sm:w-[200px] lg:w-[210px]"
            >
              <Image
                src={sector.image}
                alt={`Sector ${sector.title}`}
                fill
                sizes="220px"
                className="img-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <h3 className="absolute bottom-3 left-1/2 w-[calc(100%-12px)] -translate-x-1/2 text-center text-xs font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-sm">
                {sector.title}
              </h3>
            </motion.article>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}
