import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.tabIndex !== -1 &&
      (element.offsetParent !== null || element.getClientRects().length > 0)
  );
}

type UseFocusTrapOptions = {
  /** When true, traps focus inside the container. */
  isActive: boolean;
  /** Element to restore focus to when the trap deactivates. */
  returnFocusRef?: RefObject<HTMLElement | null>;
  /** Focus this element when the trap activates (defaults to first focusable). */
  initialFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Keeps keyboard focus inside a modal or overlay while it is open (WCAG 2.4.3).
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  { isActive, returnFocusRef, initialFocusRef }: UseFocusTrapOptions
) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusTarget =
      initialFocusRef?.current ??
      getFocusableElements(containerRef.current)[0] ??
      containerRef.current;

    requestAnimationFrame(() => focusTarget.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusables = getFocusableElements(containerRef.current);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey) {
        if (active === first || !containerRef.current.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const returnTarget = returnFocusRef?.current ?? previouslyFocusedRef.current;
      returnTarget?.focus();
    };
  }, [containerRef, isActive, returnFocusRef, initialFocusRef]);
}
