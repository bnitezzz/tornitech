'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { useMarcas, type MarcaRow } from '@/hooks/use-contenido';
import { useConfigSection } from '@/hooks/use-configuracion';

const fallback = { heading: 'MARCAS', subheading: 'Fabricantes y líneas que representamos' };

export function BrandsSection() {
  const config = useConfigSection('brands_section', fallback);
  const { data: marcas = [] } = useMarcas();

  if (marcas.length === 0) return null;

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {marcas.map((marca: MarcaRow, i: number) => (
            <motion.div
              key={marca.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex min-h-[88px] items-center justify-center rounded-xl border border-slate-100 bg-[#f8fafc] px-4 py-3"
            >
              <span className="text-center text-sm font-bold text-[#052042]">{marca.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
