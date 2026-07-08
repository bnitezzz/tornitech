'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { WHY_CHOOSE_US } from '@/constants/content';
import { useConfigSection } from '@/hooks/use-configuracion';
import type { SectionHeading } from '@/types/configuracion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function WhyChooseUsSection() {
  const config = useConfigSection<SectionHeading>('why_choose_us', {
    heading: WHY_CHOOSE_US.heading,
    subheading: WHY_CHOOSE_US.subheading,
  });

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={config.heading}
          subheading={config.subheading}
          className="mb-8 md:mb-10"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-6"
        >
          {WHY_CHOOSE_US.items.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="h-full w-full"
            >
              <div className="card-elevated card-elevated-hover group flex h-full min-h-[240px] w-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white">
                <div className="relative h-[140px] w-full shrink-0 overflow-hidden sm:h-[150px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, 174px"
                    className={
                      item.imageVariant === 'icon'
                        ? 'object-contain bg-[#f8fafc] p-5'
                        : 'img-zoom object-cover'
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-4">
                  <h3 className="line-clamp-2 text-sm font-bold uppercase leading-tight tracking-wide text-[#052042] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#6b7280] sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
