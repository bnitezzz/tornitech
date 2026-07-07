'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/use-count-up';

const stats = [
  { value: 2, prefix: '+', suffix: '', label: 'Años de experiencia' },
  { value: 5000, prefix: '+', suffix: '', label: 'Clientes satisfechos' },
  { value: 10000, prefix: '+', suffix: '', label: 'Productos en catálogo' },
  { value: 98, prefix: '', suffix: '%', label: 'Entregas a tiempo' },
];

const numberFormatter = new Intl.NumberFormat('es-VE');

function StatItem({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[number];
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.value, isInView, 1.4 + index * 0.15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="flex min-w-0 flex-col items-center justify-center text-center"
    >
      <dd className="whitespace-nowrap text-[32px] font-bold text-[#316d92] tabular-nums sm:text-[36px] md:text-[40px]">
        {stat.prefix}
        {numberFormatter.format(count)}
        {stat.suffix}
      </dd>
      <dt className="mt-[9px] whitespace-nowrap text-base text-[#316d92] sm:text-lg md:text-xl">
        {stat.label}
      </dt>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative w-full bg-[#f2f2f7] px-6 pb-14 pt-0 sm:px-8 sm:pb-16 md:px-10 md:pb-20 lg:px-12"
      aria-label="Indicadores destacados"
    >
      <div
        ref={ref}
        className="relative z-10 mx-auto -mt-10 w-full max-w-[1171px] rounded-[20px] border border-slate-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-12px_rgba(5,32,66,0.28)] sm:-mt-12 md:-mt-14 lg:-mt-16"
      >
        <div className="px-6 py-8 sm:px-10 md:px-12 lg:px-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-10 lg:gap-x-16">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} isInView={isInView} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
