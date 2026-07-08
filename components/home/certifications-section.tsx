'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { useCertificaciones, type CertRow } from '@/hooks/use-contenido';
import { useConfigSection } from '@/hooks/use-configuracion';

const fallback = { heading: 'CERTIFICACIONES', subheading: 'Normas y estándares de referencia' };

export function CertificationsSection() {
  const config = useConfigSection('certifications_section', fallback);
  const { data: certs = [] } = useCertificaciones();

  const items = certs.length
    ? certs
    : [
        { id: '1', code: 'DIN', name: 'DIN' },
        { id: '2', code: 'ISO', name: 'ISO' },
        { id: '3', code: 'ASTM', name: 'ASTM' },
        { id: '4', code: 'API', name: 'API' },
        { id: '5', code: 'ANSI', name: 'ANSI' },
      ];

  return (
    <section className="section-padding w-full bg-[#f8fafc]">
      <div className="section-container">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8" />
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-5">
          {items.map((cert: CertRow, i: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center rounded-xl border border-[#316d92]/15 bg-white px-3 py-4"
            >
              <span className="text-lg font-extrabold text-[#316d92]">{cert.code}</span>
              <span className="mt-1 text-center text-[10px] text-[#6b7280]">{cert.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
