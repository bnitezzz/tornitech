'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { HorizontalScroll } from '@/components/ui/horizontal-scroll';
import { WHY_CHOOSE_US } from '@/constants/content';

export function WhyChooseUsSection() {
  return (
    <section id="capacidades" className="section-padding-tight section-bg-fade-top w-full">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={WHY_CHOOSE_US.heading}
          subheading={WHY_CHOOSE_US.subheading}
          className="mb-6 md:mb-8"
        />

        <HorizontalScroll ariaLabel="Capacidades Tornitech" className="w-full">
          {WHY_CHOOSE_US.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              className="w-[min(72vw,200px)] shrink-0 snap-start sm:w-[180px] lg:w-[188px]"
            >
              <div className="card-elevated card-elevated-hover group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white">
                <div className="relative h-[110px] w-full shrink-0 overflow-hidden sm:h-[118px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className={
                      item.imageVariant === 'icon'
                        ? 'object-contain bg-[#f8fafc] p-4'
                        : 'img-zoom object-cover'
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 py-3">
                  <h3 className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-wide text-[#052042] sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-[#6b7280] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}
