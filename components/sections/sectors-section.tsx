'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { SECTORS_CONTENT } from '@/constants/content';

export function SectorsSection() {
  return (
    <section id="sectores" className="relative w-full bg-[#052042] pb-28 pt-12 md:pb-32 md:pt-16">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          inverse
          className="mb-8 md:mb-10"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6 xl:gap-7 2xl:max-w-[1400px] 2xl:gap-8"
        >
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] xl:rounded-2xl 2xl:aspect-[5/4]"
            >
              <Image
                src={sector.image}
                alt={`Sector ${sector.title}`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, (max-width: 1536px) 19vw, 240px"
                className="img-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <h3 className="absolute bottom-3 left-1/2 w-[calc(100%-16px)] -translate-x-1/2 text-center text-xs font-extrabold uppercase tracking-wide text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] sm:bottom-4 sm:text-sm md:text-base xl:text-lg">
                {sector.title}
              </h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
