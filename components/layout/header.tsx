'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Clock, MapPin, Phone } from 'lucide-react';
import { NAVIGATION } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { useSiteContact } from '@/components/providers/site-contact-provider';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { EASE_PREMIUM } from '@/lib/motion';
import {
  getPreferredScrollBehavior,
  getSectionIdFromHref,
  scrollToSectionId,
} from '@/lib/scroll';

const NAV_GRADIENT = 'linear-gradient(93.49deg, rgba(49,109,146,1) 0.65%, rgba(160,172,175,1) 84.31%)';
const NAV_GRADIENT_TRANSPARENT = 'linear-gradient(93.49deg, rgba(49,109,146,0.98) 0.65%, rgba(160,172,175,0.98) 84.31%)';

/** Must match real section ids on the homepage */
const SECTION_IDS = ['inicio', 'productos', 'catalogos', 'nosotros', 'contacto'] as const;

function InfoTicker() {
  const contact = useSiteContact();
  const infoTickerItems = useMemo(
    () => [
      { icon: Clock, text: contact.businessHours },
      { icon: MapPin, text: contact.address },
      { icon: Phone, text: contact.phone },
    ],
    [contact.address, contact.businessHours, contact.phone]
  );

  return (
    <div className="w-full overflow-hidden bg-[#052042] py-2.5 text-white/80" aria-label="Información de contacto">
      <div className="flex w-max items-center animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {infoTickerItems.map((item, index) => (
              <li key={`${copy}-${index}`} className="flex shrink-0 items-center gap-2 whitespace-nowrap px-6 text-xs font-medium tracking-wide sm:px-8 sm:text-[13px]">
                <item.icon className="h-3.5 w-3.5 shrink-0 text-[#fab43a]" strokeWidth={1.75} />
                <span>{item.text}</span>
                <span className="ml-5 h-1 w-1 shrink-0 rounded-full bg-white/25" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useFocusTrap(mobileMenuRef, {
    isActive: isMobileMenuOpen,
    returnFocusRef: menuToggleRef,
  });

  const handleNavClick = useCallback(
    (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      const sectionId = getSectionIdFromHref(href);
      if (!sectionId) return;

      // Same-page anchor: custom smooth scroll with sticky-header offset
      event.preventDefault();
      const behavior = getPreferredScrollBehavior();
      const scrolled = scrollToSectionId(sectionId, behavior);
      if (scrolled) {
        setActiveSection(sectionId === 'top' ? 'inicio' : sectionId);
      }
      setIsMobileMenuOpen(false);
    },
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initial hash support (direct URL or refresh mid-page)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      scrollToSectionId(hash, 'auto');
      setActiveSection(hash === 'top' ? 'inicio' : hash);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      <InfoTicker />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
          isScrolled ? 'nav-glass shadow-[0_8px_28px_-10px_rgba(5,32,66,0.4)]' : ''
        }`}
        style={isScrolled ? undefined : { background: NAV_GRADIENT }}
      >
        <nav
          aria-label="Navegación principal"
          className={`page-header-inner flex items-center justify-between gap-4 transition-all duration-300 ease-out ${
            isScrolled ? 'min-h-[56px] py-2' : 'min-h-[64px] py-2'
          }`}
        >
          <Link
            href="/#inicio"
            onClick={(e) => handleNavClick('/#inicio', e)}
            className={`focus-ring-inverse relative shrink-0 rounded-sm transition-all duration-300 ${
              isScrolled
                ? 'h-[34px] w-[108px] sm:h-[38px] sm:w-[122px] lg:h-[44px] lg:w-[140px]'
                : 'h-[38px] w-[118px] sm:h-[44px] sm:w-[138px] lg:h-[52px] lg:w-[160px]'
            }`}
            aria-label="Tornitech — Inicio"
          >
            <Image
              src={ASSETS.logo.primary}
              alt="Tornitech"
              fill
              priority
              sizes="150px"
              className="object-contain object-left"
            />
          </Link>

          <ul className="hidden flex-1 items-baseline justify-center gap-5 md:flex lg:gap-10 xl:gap-[42px]">
            {NAVIGATION.map((item) => {
              const sectionId = getSectionIdFromHref(item.href) ?? '';
              const isActive = activeSection === sectionId;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`focus-ring-inverse group relative inline-block whitespace-nowrap py-1 text-base font-normal transition-colors duration-200 hover:text-white ${
                      isActive ? 'text-white' : 'text-[#f2f2f2]'
                    }`}
                  >
                    {item.name}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-[#fab43a] transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/#contacto"
            onClick={(e) => handleNavClick('/#contacto', e)}
            className={`btn-yellow-pill focus-ring-inverse hidden text-sm md:inline-flex transition-all duration-300 ${
              isScrolled ? 'min-w-[120px] px-5 py-[6px]' : 'min-w-[135px] px-6 py-[7px]'
            }`}
          >
            Cotizar
          </Link>

          <button
            ref={menuToggleRef}
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus-ring-inverse rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            className="fixed inset-0 z-40 md:hidden"
            id="mobile-menu"
          >
            <div
              className="absolute inset-0"
              style={{ background: NAV_GRADIENT_TRANSPARENT }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className="relative space-y-4 px-8 pt-24"
            >
              {NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: 0.3, ease: EASE_PREMIUM }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="focus-ring-inverse block rounded-sm border-b border-white/20 py-3 text-xl font-medium text-white transition-colors hover:text-[#fab43a]"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contacto"
                onClick={(e) => handleNavClick('/#contacto', e)}
                className="btn-yellow-pill focus-ring-inverse mt-6 w-full px-6 py-3 text-base"
              >
                Cotizar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
