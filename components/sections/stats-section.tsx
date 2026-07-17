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
  const count = useCountUp(
    stat.staticValue ? 0 : stat.value,
    isInView && !stat.staticValue,
    1.4 + index * 0.12
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-w-0 flex-col items-center justify-center text-center"
    >
      <dd className="whitespace-nowrap text-[18px] font-extrabold leading-none tabular-nums text-[#316d92] sm:text-[28px] md:text-[34px]">
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
      <dt className="mt-1 text-[9px] font-medium uppercase leading-tight tracking-wide text-[#6b7280] sm:mt-1.5 sm:text-xs md:text-sm">
        {stat.label}
      </dt>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      className="relative z-10 w-full bg-white pb-2 pt-0 sm:pb-3 md:pb-4"
      aria-label="Indicadores destacados"
    >
      <div
        ref={ref}
        className="card-elevated relative z-10 mx-auto w-[92%] max-w-[960px] -translate-y-1/2 rounded-xl border border-slate-100/80 bg-white px-3 py-3.5 sm:rounded-2xl sm:px-8 sm:py-5"
      >
        <dl className="grid grid-cols-3 items-center gap-x-2 sm:gap-x-6 md:gap-x-10">
          {SITE_STATS.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
