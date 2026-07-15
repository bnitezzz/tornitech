'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

function ProcessTimeline({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="mb-6 flex items-center justify-between px-1" aria-label="Pasos del proceso">
      {WORK_PROCESS.steps.map((step, index) => {
        const isActive = index === activeIndex;
        const isCompleted = index < activeIndex;

        return (
          <li key={step.number} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isActive ? 'step' : undefined}
              aria-label={`Paso ${step.number}: ${step.title}`}
              className={`focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300 ${
                isActive || isCompleted
                  ? 'border-[#316d92] bg-[#316d92] text-white'
                  : 'border-[#316d92]/30 bg-white text-[#316d92]'
              }`}
            >
              {step.number}
            </button>
            {index < WORK_PROCESS.steps.length - 1 && (
              <div
                className="mx-1.5 h-0.5 flex-1 rounded-full bg-[#316d92]/15"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-[#316d92] transition-all duration-300 ease-out"
                  style={{ width: isCompleted ? '100%' : isActive ? '40%' : '0%' }}
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ProcessMobileCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    if (slideWidth <= 0) return;
    const next = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.max(0, Math.min(next, WORK_PROCESS.steps.length - 1)));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncActiveFromScroll();
    el.addEventListener('scroll', syncActiveFromScroll, { passive: true });
    window.addEventListener('resize', syncActiveFromScroll);
    return () => {
      el.removeEventListener('scroll', syncActiveFromScroll);
      window.removeEventListener('resize', syncActiveFromScroll);
    };
  }, [syncActiveFromScroll]);

  const goToStep = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <ProcessTimeline activeIndex={activeIndex} onSelect={goToStep} />

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Carrusel de pasos del proceso"
      >
        {WORK_PROCESS.steps.map((step) => (
          <article
            key={step.number}
            className="w-full shrink-0 snap-center px-1"
            aria-label={`Paso ${step.number}: ${step.title}`}
          >
            <div className="flex min-h-[220px] flex-col items-center rounded-xl border border-slate-100 bg-white px-5 py-7 text-center shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_20px_-6px_rgba(15,23,42,0.12)]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#316d92]/25 bg-white shadow-[0_2px_12px_rgba(49,109,146,0.1)]">
                <step.icon className="h-7 w-7 text-[#316d92]" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#316d92]">
                Paso {step.number}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-[#052042]">{step.title}</h3>
              <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-[#6b7280]">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
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

        <ProcessMobileCarousel />

        <div className="relative hidden md:block">
          <div
            className="pointer-events-none absolute top-10 left-[12%] right-[12%] hidden h-px bg-[#316d92]/15 lg:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-6">
            {WORK_PROCESS.steps.map((step, index) => (
              <ProcessStepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
