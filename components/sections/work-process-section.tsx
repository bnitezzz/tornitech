'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { WORK_PROCESS } from '@/constants/content';

const ICON_SIZE = 'h-6 w-6';

function ProcessStepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof WORK_PROCESS.steps)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      {!isLast && (
        <div
          className="pointer-events-none absolute top-7 left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-gradient-to-r from-[#316d92]/30 to-[#316d92]/10 md:block"
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#316d92]/15 bg-[#316d92]/[0.04] transition-colors duration-300 group-hover:border-[#316d92]/30 group-hover:bg-[#316d92]/[0.08]">
          <step.icon className={`${ICON_SIZE} text-[#316d92]`} strokeWidth={1.75} />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#052042] text-[10px] font-bold text-white">
            {step.number}
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-base font-bold text-[#052042]">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#6b7280]">{step.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkProcessSection() {
  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        <SectionHeader
          heading={WORK_PROCESS.heading}
          subheading={WORK_PROCESS.subheading}
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-4 lg:gap-6">
          {WORK_PROCESS.steps.map((step, index) => (
            <ProcessStepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === WORK_PROCESS.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
