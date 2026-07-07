'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

const NAV_GRADIENT = 'linear-gradient(93.49deg, rgba(49,109,146,1) 0.65%, rgba(160,172,175,1) 84.31%)';
const NAV_GRADIENT_TRANSPARENT = 'linear-gradient(93.49deg, rgba(49,109,146,0.98) 0.65%, rgba(160,172,175,0.98) 84.31%)';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Servicios', href: '/#productos' },
  { name: 'Contacto', href: '/#contacto' },
];

const infoTickerItems = [
  { icon: Clock, text: SITE_CONFIG.businessHours },
  { icon: MapPin, text: SITE_CONFIG.address },
  { icon: Phone, text: SITE_CONFIG.phone },
];

function InfoTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#052042] py-2 text-white/80">
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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      {/* Info ticker */}
      <InfoTicker />

      {/* Main header */}
      <header className="sticky top-0 z-50 w-full">
        <nav
          aria-label="Primary navigation"
          className={`mx-auto flex min-h-[50px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 py-[1px] transition-shadow duration-300 sm:px-6 md:px-8 lg:pl-[56px] lg:pr-[27px] xl:pl-[87px] ${
            isScrolled ? 'shadow-[0_8px_24px_-8px_rgba(5,32,66,0.45)]' : 'shadow-none'
          }`}
          style={{ background: NAV_GRADIENT }}
        >
          {/* Logo */}
          <Link href="/" className="focus-ring-inverse relative h-[34px] w-[106px] shrink-0 rounded-sm sm:h-[40px] sm:w-[125px] lg:h-[48px] lg:w-[150px]" aria-label="Tornitech home">
            <Image
              src="/logo-tornitech.png"
              alt="Tornitech"
              fill
              priority
              sizes="150px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden flex-1 items-baseline justify-center gap-8 md:flex lg:gap-[59px]">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="focus-ring-inverse group relative inline-block whitespace-nowrap py-1 text-base font-normal text-[#f2f2f2] transition-colors hover:text-white"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-[#fab43a] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <Link
            href="/#contacto"
            className="btn-yellow-pill focus-ring-inverse hidden min-w-[135px] px-6 py-[7px] text-sm md:inline-flex"
          >
            Cotizar
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus-ring-inverse rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0"
              style={{ background: NAV_GRADIENT_TRANSPARENT }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-8 space-y-4">
              {navigationItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
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
