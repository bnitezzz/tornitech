'use client';

import { motion } from 'framer-motion';
import { useConfigSection } from '@/hooks/use-configuracion';

type TextSectionConfig = { heading: string; content: string };

export function MissionSection() {
  const config = useConfigSection<TextSectionConfig>('mission', {
    heading: 'MISIÓN',
    content: '',
  });
  if (!config.content) return null;

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <h2 className="section-heading">{config.heading}</h2>
          <span className="section-accent" />
          <p className="mt-5 text-base leading-relaxed text-[#3c4456]/85 sm:text-lg">{config.content}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function VisionSection() {
  const config = useConfigSection<TextSectionConfig>('vision', {
    heading: 'VISIÓN',
    content: '',
  });
  if (!config.content) return null;

  return (
    <section className="section-padding w-full bg-[#f8fafc]">
      <div className="section-container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <h2 className="section-heading">{config.heading}</h2>
          <span className="section-accent" />
          <p className="mt-5 text-base leading-relaxed text-[#3c4456]/85 sm:text-lg">{config.content}</p>
        </motion.div>
      </div>
    </section>
  );
}
