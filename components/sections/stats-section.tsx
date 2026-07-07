'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '+2', label: 'Años de experiencia' },
  { value: '+5.000', label: 'Clientes satisfechos' },
  { value: '+10.000', label: 'Productos en catálogo' },
  { value: '98%', label: 'Entregas a tiempo' },
];

export function StatsSection() {
  return (
    <section
      className="w-full bg-[#f2f2f7] px-6 pb-10 pt-14 sm:px-8 md:px-10 md:pt-20 lg:px-12"
      aria-label="Indicadores destacados"
    >
      <div
        className="card-elevated mx-auto w-full max-w-[1171px] rounded-[20px] border border-slate-100 bg-white"
      >
        <div className="px-6 py-8 sm:px-10 md:px-12 lg:px-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-10 lg:gap-x-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex min-w-0 flex-col items-center justify-center text-center"
              >
                <dd className="text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#316d92] whitespace-nowrap">
                  {stat.value}
                </dd>
                <dt className="mt-[9px] text-base sm:text-lg md:text-xl text-[#316d92] whitespace-nowrap">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
