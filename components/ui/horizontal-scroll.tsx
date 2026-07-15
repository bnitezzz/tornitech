'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type HorizontalScrollProps = {
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
  showControls?: boolean;
};

export function HorizontalScroll({
  children,
  className,
  ariaLabel,
  showControls = true,
}: HorizontalScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener('scroll', updateControls, { passive: true });
    const ro = new ResizeObserver(updateControls);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateControls);
      ro.disconnect();
    };
  }, [updateControls, children]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(240, el.clientWidth * 0.75), behavior: 'smooth' });
  };

  return (
    <div className={cn('relative w-full', className)}>
      {showControls && (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between md:flex">
          <button
            type="button"
            aria-label="Anterior"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
            className="pointer-events-auto focus-ring -ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#052042] shadow-md transition disabled:opacity-0"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
            className="pointer-events-auto focus-ring -mr-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#052042] shadow-md transition disabled:opacity-0"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      )}

      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 sm:gap-4"
      >
        {children}
      </div>
    </div>
  );
}
