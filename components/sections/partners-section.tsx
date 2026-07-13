'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { PARTNERS_CONTENT, TECHNICAL_STANDARDS } from '@/constants/content';

export function PartnersSection() {
  return (
    <section id="normas" className="section-bg-ffffff w-full pb-12 pt-6 md:pb-14 md:pt-8 lg:pb-16 lg:pt-10">
      <div className="section-container flex flex-col items-center gap-8 md:gap-10">
        <SectionHeader
          heading={PARTNERS_CONTENT.sectionHeading}
          subheading={PARTNERS_CONTENT.sectionSubheading}
          className="mb-0"
        />

        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Technical standards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-5 lg:items-start"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-[#052042] sm:text-2xl">
                {PARTNERS_CONTENT.standardsHeading}
              </h3>
              <p className="mt-2 max-w-[400px] text-sm leading-relaxed text-[#6b7280]">
                {PARTNERS_CONTENT.standardsSubheading}
              </p>
            </div>
            <div className="grid w-full max-w-[440px] grid-cols-3 gap-3 sm:gap-4">
              {TECHNICAL_STANDARDS.map((standard) => (
                <div
                  key={standard.abbr}
                  className="flex flex-col items-center justify-center rounded-xl border border-[#316d92]/12 bg-white px-3 py-3.5 transition-all duration-300 hover:border-[#316d92]/25"
                >
                  <span className="text-base font-extrabold text-[#316d92] sm:text-lg">{standard.abbr}</span>
                  <span className="mt-0.5 text-center text-[10px] leading-tight text-[#6b7280] sm:text-[11px]">
                    {standard.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partner card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-center text-xl font-extrabold uppercase tracking-wide text-[#052042] sm:text-2xl lg:text-left">
              {PARTNERS_CONTENT.partnerHeading}
            </h3>

            <article className="group relative overflow-hidden rounded-2xl bg-[#052042]">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                <Image
                  src={PARTNERS_CONTENT.partnerLogo}
                  alt={PARTNERS_CONTENT.partnerName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052042] via-[#052042]/40 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#fab43a]">
                    Socio comercial
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-white sm:text-xl">
                    {PARTNERS_CONTENT.partnerName}
                  </h4>
                  <p className="mt-2 max-w-[400px] text-sm leading-relaxed text-white/75">
                    {PARTNERS_CONTENT.partnerDescription}
                  </p>
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
