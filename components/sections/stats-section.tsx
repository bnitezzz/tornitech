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
      <dd className="whitespace-nowrap text-[32px] font-bold leading-none text-[#316d92] tabular-nums sm:text-[42px] md:text-[52px]">
        {stat.prefix}
        {numberFormatter.format(count)}
        {stat.suffix}
      </dd>
      <dt className="mt-3 whitespace-nowrap text-sm text-[#6b7280] sm:text-base">
        {stat.label}
      </dt>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative w-full bg-white pb-6 sm:pb-8 md:pb-10" aria-label="Indicadores destacados">
      <div
        ref={ref}
        className="relative z-10 mx-auto w-[90%] max-w-[1200px] -translate-y-1/2 rounded-[20px] border border-slate-100 bg-white p-6 shadow-[0_20px_45px_-15px_rgba(14,42,74,0.25)] sm:p-8 md:p-10"
      >
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-10 lg:gap-x-16">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
