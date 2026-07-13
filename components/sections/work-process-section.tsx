'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { WORK_PROCESS } from '@/constants/content';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

function ProcessStepCard({
  step,
  index,
}: {
  step: (typeof WORK_PROCESS.steps)[number];
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.08, duration: 0.45, ease: EASE_PREMIUM }}
      className="group flex flex-col items-center text-center"
    >
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[#316d92]/25 bg-white shadow-[0_2px_12px_rgba(49,109,146,0.1)] transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-[80px] sm:w-[80px]">
        <step.icon className="h-7 w-7 text-[#316d92] sm:h-8 sm:w-8" strokeWidth={1.75} />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#316d92]">
        Paso {step.number}
      </p>

      <h3 className="mt-1.5 text-base font-bold text-[#052042]">{step.title}</h3>
      <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-[#6b7280]">
        {step.description}
      </p>
    </motion.article>
  );
}

export function WorkProcessSection() {
  return (
    <section id="proceso" className="section-padding section-bg-soft w-full">
      <div className="section-container">
        <SectionHeader
          heading={WORK_PROCESS.heading}
          subheading={WORK_PROCESS.subheading}
          className="mb-8 md:mb-10"
        />

        <div className="relative">
          <div
            className="pointer-events-none absolute top-10 left-[12%] right-[12%] hidden h-px bg-[#316d92]/15 lg:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {WORK_PROCESS.steps.map((step, index) => (
              <ProcessStepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
