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
    <section
      id="capacidades"
      className="section-bg-sectors relative w-full pb-24 pt-10 md:pb-28 md:pt-12 lg:pb-32 lg:pt-14"
    >
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={WHY_CHOOSE_US.heading}
          subheading={WHY_CHOOSE_US.subheading}
          inverse
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
            <motion.article key={item.title} variants={itemVariants} className="h-full w-full">
              <div className="card-elevated group flex h-full w-full flex-col overflow-hidden rounded-lg border border-[#fab43a]/35 bg-white shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#fab43a] hover:shadow-[0_12px_28px_-8px_rgba(250,180,58,0.35)] sm:rounded-xl">
                <div className="relative h-[100px] w-full shrink-0 overflow-hidden bg-[#f0f5f8] sm:h-[118px] md:h-[128px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 45vw, 174px"
                    className={
                      item.imageVariant === 'icon'
                        ? 'object-contain p-2.5 sm:p-3'
                        : 'img-zoom object-cover'
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-2.5 py-3 sm:px-3.5 sm:py-3.5">
                  <h3 className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-wide text-[#052042] sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#3c4456] sm:mt-1.5 sm:text-xs">
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
