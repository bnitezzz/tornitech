'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COMMITMENT_INDICATORS } from '@/constants/content';

function IndicatorItem({
  indicator,
  index,
  isInView,
}: {
  indicator: (typeof COMMITMENT_INDICATORS)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex min-w-0 list-none flex-col items-center gap-3 text-center"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#316d92]/10">
        <indicator.icon className="h-6 w-6 text-[#316d92]" strokeWidth={1.75} />
      </div>
      <p className="text-base font-bold leading-snug text-[#052042] sm:text-lg">
        {indicator.title}
      </p>
      <p className="max-w-[200px] text-sm leading-relaxed text-[#6b7280]">
        {indicator.description}
      </p>
    </motion.li>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative w-full bg-white pb-6 sm:pb-8 md:pb-10" aria-label="Compromiso operativo">
      <div
        ref={ref}
        className="relative z-10 mx-auto w-[90%] max-w-[1200px] -translate-y-1/2 rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-15px_rgba(14,42,74,0.25)] sm:p-8 md:p-10"
      >
        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10 lg:gap-x-16">
          {COMMITMENT_INDICATORS.map((indicator, index) => (
            <IndicatorItem key={indicator.title} indicator={indicator} index={index} isInView={isInView} />
          ))}
        </ul>
      </div>
    </section>
  );
}
