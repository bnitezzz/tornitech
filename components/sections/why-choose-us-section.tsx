'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { WHY_CHOOSE_US } from '@/constants/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function WhyChooseUsSection() {
  return (
    <section id="capacidades" className="section-padding-tight section-bg-fade-top w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={WHY_CHOOSE_US.heading}
          subheading={WHY_CHOOSE_US.subheading}
          className="mb-5 md:mb-7"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6"
        >
          {WHY_CHOOSE_US.items.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              className="h-full w-full"
            >
              <div className="card-elevated card-elevated-hover group flex h-full w-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white sm:rounded-xl">
                <div className="relative h-[84px] w-full shrink-0 overflow-hidden sm:h-[100px] md:h-[110px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, 174px"
                    className={
                      item.imageVariant === 'icon'
                        ? 'object-contain bg-[#f8fafc] p-3 sm:p-4'
                        : 'img-zoom object-cover'
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-2.5 py-2.5 sm:px-3.5 sm:py-3">
                  <h3 className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-wide text-[#052042] sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#6b7280] sm:mt-1.5 sm:text-xs">
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
