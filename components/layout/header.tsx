'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Clock, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG, NAVIGATION } from '@/constants/site';
import { ASSETS } from '@/constants/assets';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { EASE_PREMIUM } from '@/lib/motion';

const NAV_GRADIENT = 'linear-gradient(93.49deg, rgba(49,109,146,1) 0.65%, rgba(160,172,175,1) 84.31%)';
const NAV_GRADIENT_TRANSPARENT = 'linear-gradient(93.49deg, rgba(49,109,146,0.98) 0.65%, rgba(160,172,175,0.98) 84.31%)';

const SECTION_IDS = ['inicio', 'productos', 'catalogos', 'nosotros', 'contacto'];

const infoTickerItems = [
  { icon: Clock, text: SITE_CONFIG.businessHours },
  { icon: MapPin, text: SITE_CONFIG.address },
  { icon: Phone, text: SITE_CONFIG.phone },
];

function InfoTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#052042] py-2 text-white/80" aria-label="Información de contacto">
      <div className="flex w-max items-center animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {infoTickerItems.map((item, index) => (
              <li key={`${copy}-${index}`} className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 text-xs font-medium tracking-wide sm:text-[13px]">
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
  const [activeSection, setActiveSection] = useState<string>('');
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useFocusTrap(mobileMenuRef, {
    isActive: isMobileMenuOpen,
    returnFocusRef: menuToggleRef,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
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

      <header className="sticky top-0 z-50 w-full">
        <nav
          aria-label="Navegación principal"
          className={`mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-4 transition-all duration-300 ease-out sm:px-6 md:px-8 lg:pl-[56px] lg:pr-[27px] xl:pl-[87px] ${
            isScrolled
              ? 'nav-glass min-h-[44px] py-1 shadow-[0_8px_28px_-10px_rgba(5,32,66,0.4)]'
              : 'min-h-[50px] py-[1px] shadow-none'
          }`}
          style={isScrolled ? undefined : { background: NAV_GRADIENT }}
        >
          <Link
            href="/"
            className={`focus-ring-inverse relative shrink-0 rounded-sm transition-all duration-300 ${
              isScrolled
                ? 'h-[30px] w-[96px] sm:h-[34px] sm:w-[110px] lg:h-[40px] lg:w-[130px]'
                : 'h-[34px] w-[106px] sm:h-[40px] sm:w-[125px] lg:h-[48px] lg:w-[150px]'
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
              const sectionId = item.href.replace('/#', '');
              const isActive =
                item.href === '/#' + activeSection ||
                (sectionId === 'inicio' && (activeSection === 'inicio' || activeSection === ''));
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (sectionId === 'inicio') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                        setActiveSection('inicio');
                        if (typeof window !== 'undefined') {
                          window.history.replaceState(null, '', '/#inicio');
                        }
                      }
                    }}
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
                    onClick={(e) => {
                      const sectionId = item.href.replace('/#', '');
                      if (sectionId === 'inicio') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveSection('inicio');
                        window.history.replaceState(null, '', '/#inicio');
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="focus-ring-inverse block rounded-sm border-b border-white/20 py-3 text-xl font-medium text-white transition-colors hover:text-[#fab43a]"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
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
