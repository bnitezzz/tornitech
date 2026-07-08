'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { SECTORS_CONTENT } from '@/constants/content';

export function SectorsSection() {
  return (
    <section className="relative w-full bg-[#052042] pb-20 pt-12 md:pb-24 md:pt-16">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          inverse
          className="mb-8 md:mb-10"
        />

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <h3 className="text-[11px] font-bold uppercase leading-tight tracking-wide text-white sm:text-xs">
                {sector.title}
              </h3>
              <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-lg border border-white/15 bg-white/5 sm:max-w-[140px]">
                <Image
                  src={sector.image}
                  alt={`Sector ${sector.title}`}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
