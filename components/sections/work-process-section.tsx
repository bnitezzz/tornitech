'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { WORK_PROCESS } from '@/constants/content';

function ProcessStepCard({
  step,
  index,
}: {
  step: (typeof WORK_PROCESS.steps)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[#316d92] bg-white shadow-[0_2px_8px_rgba(49,109,146,0.12)] transition-transform duration-300 group-hover:scale-105 xl:h-[80px] xl:w-[80px]">
        <step.icon className="h-7 w-7 text-[#316d92] xl:h-8 xl:w-8" strokeWidth={1.75} />
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#316d92] text-xs font-bold text-white">
          {step.number}
        </span>
      </div>
      <h3 className="mb-2 text-center text-base font-bold text-[#052042] xl:text-[15px]">
        {step.title}
      </h3>
      <p className="max-w-[180px] text-center text-sm leading-relaxed text-[#6b7280]">
        {step.description}
      </p>
    </motion.article>
  );
}

export function WorkProcessSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={WORK_PROCESS.heading}
          subheading={WORK_PROCESS.subheading}
          className="mb-10 md:mb-14"
        />

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute top-[40px] left-[4%] right-[4%] hidden h-px bg-[#316d92]/20 xl:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
            {WORK_PROCESS.steps.map((step, index) => (
              <ProcessStepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
