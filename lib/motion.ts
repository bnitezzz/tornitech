import type { Transition, Variants } from 'framer-motion';

/** Shared easing — soft decelerate used across the site */
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT_ONCE = { once: true, margin: '-48px' as const, amount: 0.2 as const };

export const transitionBase: Transition = {
  duration: 0.45,
  ease: EASE_PREMIUM,
};

export const transitionFast: Transition = {
  duration: 0.3,
  ease: EASE_PREMIUM,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
};

/** Instant visible state for prefers-reduced-motion */
export const reducedMotionVisible: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
