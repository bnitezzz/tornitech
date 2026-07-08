'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

/**
 * Animates a number from 0 to `target` once `start` becomes true.
 * Respects prefers-reduced-motion by jumping straight to the target value.
 */
export function useCountUp(target: number, start: boolean, duration = 1.6) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [start, target, duration]);

  return value;
}
