'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PARTNERS_CONTENT, TECHNICAL_STANDARDS } from '@/constants/content';

export function PartnersSection() {
  return (
    <section className="w-full bg-[#f2f2f7] py-16 md:py-24">
      <div className="section-container flex flex-col gap-12">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 lg:items-start"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#052042] sm:text-[25px]">
                {PARTNERS_CONTENT.standardsHeading}
              </h3>
              <p className="mt-2 max-w-[400px] text-sm leading-relaxed text-[#6b7280]">
                {PARTNERS_CONTENT.standardsSubheading}
              </p>
            </div>
            <div className="grid w-full max-w-[480px] grid-cols-3 gap-4 sm:gap-5">
              {TECHNICAL_STANDARDS.map((standard) => (
                <div
                  key={standard.abbr}
                  className="flex flex-col items-center justify-center rounded-[12px] border border-[#316d92]/15 bg-white px-3 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#316d92]/30 hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
                >
                  <span className="text-lg font-extrabold text-[#316d92]">{standard.abbr}</span>
                  <span className="mt-1 text-center text-[11px] leading-tight text-[#6b7280]">{standard.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-6 lg:items-start"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#052042] sm:text-[25px]">
                {PARTNERS_CONTENT.partnerHeading}
              </h3>
            </div>
            <div className="card-elevated w-full max-w-[574px] overflow-hidden rounded-[14px] border border-slate-100 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="relative h-[200px] w-full md:h-full md:min-h-[240px]">
                  <Image
                    src="https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Red de suministro internacional"
                    fill
                    sizes="(min-width: 768px) 220px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8">
                  <h4 className="text-lg font-bold uppercase tracking-wide text-[#052042]">
                    {PARTNERS_CONTENT.partnerName}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                    {PARTNERS_CONTENT.partnerDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
