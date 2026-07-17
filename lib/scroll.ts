/**
 * Smooth-scroll helpers for in-page navbar anchors.
 * Accounts for the sticky header so section titles are not hidden underneath.
 */

export const STICKY_HEADER_OFFSET = 108;

/** Extra slack so the active link flips when the section title is under the nav. */
const SCROLL_SPY_OFFSET = STICKY_HEADER_OFFSET + 24;

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

/**
 * Pick the nav section whose top has most recently crossed under the sticky header.
 * Works across interstitial blocks (proceso, capacidades, etc.) that are not in the nav.
 */
export function getActiveNavSectionId(sectionIds: readonly string[]): string {
  if (typeof window === 'undefined' || sectionIds.length === 0) {
    return sectionIds[0] ?? 'inicio';
  }

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Near page end: force last nav item (Contacto) so it can activate.
  if (docHeight - scrollBottom < 80) {
    return sectionIds[sectionIds.length - 1] ?? 'inicio';
  }

  let activeId = sectionIds[0] ?? 'inicio';

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - SCROLL_SPY_OFFSET <= 0) {
      activeId = id;
    }
  }

  return activeId;
}

/** Prefer reduced-motion when available. */
export function getPreferredScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
