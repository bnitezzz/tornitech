'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import {
  getPreferredScrollBehavior,
  getSectionIdFromHref,
  scrollToSectionId,
} from '@/lib/scroll';
import { cn } from '@/lib/utils';

type PromoBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: 'navy' | 'blue' | 'soft';
  className?: string;
};

export function PromoBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  variant = 'navy',
  className,
}: PromoBannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const isSoft = variant === 'soft';

  const onCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const sectionId = getSectionIdFromHref(ctaHref);
    if (!sectionId) return;
    event.preventDefault();
    scrollToSectionId(sectionId, getPreferredScrollBehavior());
  };

  const panelClass =
    variant === 'soft'
      ? 'section-bg-soft-solid border border-[#316d92]/12 text-[#052042] shadow-[0_8px_24px_-12px_rgba(5,32,66,0.18)]'
      : variant === 'blue'
        ? 'bg-gradient-to-r from-[#316d92] via-[#3c7a9e] to-[#052042] text-white shadow-[0_10px_28px_-12px_rgba(5,32,66,0.45)]'
        : 'bg-gradient-to-r from-[#052042] via-[#0a3358] to-[#316d92] text-white shadow-[0_10px_28px_-12px_rgba(5,32,66,0.45)]';

  return (
    <section className={cn('w-full py-6 md:py-8', className)} aria-label={title}>
      <div className="section-container">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
          className={cn(
            'relative overflow-hidden rounded-xl px-5 py-6 sm:px-8 sm:py-7 md:rounded-2xl md:px-10',
            panelClass
          )}
        >
          {!isSoft && (
            <div
              className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#fab43a]/15 blur-2xl"
              aria-hidden="true"
            />
          )}
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="min-w-0 max-w-2xl">
              {eyebrow && (
                <p
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.14em]',
                    isSoft ? 'text-[#316d92]' : 'text-[#fab43a]'
                  )}
                >
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-1 text-lg font-extrabold leading-snug tracking-wide sm:text-xl md:text-2xl">
                {title}
              </h2>
              {description && (
                <p
                  className={cn(
                    'mt-1.5 text-sm leading-relaxed sm:text-[15px]',
                    isSoft ? 'text-[#3c4456]/85' : 'text-white/80'
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            <Link
              href={ctaHref}
              onClick={onCtaClick}
              className={cn(
                'btn-yellow inline-flex shrink-0 items-center justify-center gap-2 self-start px-5 py-2.5 text-sm sm:self-center',
                isSoft ? 'focus-ring' : 'focus-ring-inverse'
              )}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
