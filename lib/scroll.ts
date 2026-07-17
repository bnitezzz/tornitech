/**
 * Smooth-scroll helpers for in-page navbar anchors.
 * Accounts for the sticky header so section titles are not hidden underneath.
 */

const STICKY_HEADER_OFFSET = 108;

export function getSectionIdFromHref(href: string): string | null {
  if (!href.includes('#')) return null;
  const hash = href.split('#')[1]?.trim();
  return hash || null;
}

export function scrollToSectionId(sectionId: string, behavior: ScrollBehavior = 'smooth'): boolean {
  if (sectionId === 'inicio' || sectionId === 'top') {
    window.scrollTo({ top: 0, behavior });
    window.history.replaceState(null, '', '/#inicio');
    return true;
  }

  const target = document.getElementById(sectionId);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  window.history.replaceState(null, '', `/#${sectionId}`);
  return true;
}

/** Prefer reduced-motion when available. */
export function getPreferredScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
