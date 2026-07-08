'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { SECTORS_CONTENT } from '@/constants/content';

export function SectorsSection() {
  return (
    <section className="relative w-full bg-[#052042] pb-28 pt-16 md:pb-32 md:pt-24">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          inverse
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-6"
        >
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <Image
                src={sector.image}
                alt={`Sector ${sector.title}`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 19vw"
                className="img-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-4 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-white sm:text-base">
                  {sector.title}
                </h3>
                <p className="text-xs leading-snug text-white/80 sm:text-[13px]">
                  {sector.value}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
