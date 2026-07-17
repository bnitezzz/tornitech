'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/use-count-up';
import { SITE_STATS } from '@/constants/content';

const numberFormatter = new Intl.NumberFormat('es-VE');

function StatItem({
  stat,
  index,
  isInView,
}: {
  stat: (typeof SITE_STATS)[number];
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.staticValue ? 0 : stat.value, isInView && !stat.staticValue, 1.4 + index * 0.12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-w-0 flex-col items-center justify-center text-center"
    >
      <dd className="whitespace-nowrap text-[20px] font-extrabold leading-none tabular-nums text-[#316d92] sm:text-[36px] md:text-[44px]">
        {stat.staticValue ? (
          stat.staticValue
        ) : (
          <>
            {stat.prefix}
            {numberFormatter.format(count)}
            {stat.suffix}
          </>
        )}
      </dd>
      <dt className="mt-1.5 text-[9px] font-medium uppercase leading-tight tracking-wide text-[#6b7280] sm:mt-2.5 sm:text-sm sm:leading-normal">
        {stat.label}
      </dt>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative z-10 w-full bg-white py-6 sm:py-8 md:py-10" aria-label="Indicadores destacados">
      <div
        ref={ref}
        className="relative z-10 mx-auto w-[92%] max-w-[1100px] rounded-2xl border border-slate-100/80 bg-white px-4 py-6 card-elevated sm:px-10 sm:py-10"
      >
        <dl className="grid grid-cols-3 items-start gap-x-3 gap-y-0 sm:items-center sm:gap-x-8 md:gap-x-12">
          {SITE_STATS.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
