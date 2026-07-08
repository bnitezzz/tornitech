'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { useConfigSection } from '@/hooks/use-configuracion';
import type { ValueItem } from '@/types/configuracion';

type ValuesConfig = { heading: string; items: ValueItem[] };

export function ValuesSection() {
  const config = useConfigSection<ValuesConfig>('values', { heading: 'VALORES', items: [] });
  if (!config.items.length) return null;

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        <SectionHeader heading={config.heading} className="mb-8" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {config.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-slate-100 bg-[#f8fafc] px-5 py-6 text-center"
            >
              <h3 className="text-base font-bold text-[#052042]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
