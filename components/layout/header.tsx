'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

const NAV_GRADIENT = 'linear-gradient(93.49deg, rgba(49,109,146,1) 0.65%, rgba(160,172,175,1) 84.31%)';
const NAV_GRADIENT_TRANSPARENT = 'linear-gradient(93.49deg, rgba(49,109,146,0.98) 0.65%, rgba(160,172,175,0.98) 84.31%)';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Nosotros', href: '/#nosotros' },
  { name: 'Servicios', href: '/#productos' },
  { name: 'Contacto', href: '/#contacto' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Main header */}
      <header className="sticky top-0 z-50 w-full px-1 pt-[17px] sm:px-3 lg:px-0">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex min-h-[50px] w-full max-w-[1440px] items-center justify-between gap-4 rounded-[10px] px-4 py-[1px] sm:px-6 md:px-8 lg:pl-[56px] lg:pr-[27px] xl:pl-[87px]"
          style={{ background: NAV_GRADIENT }}
        >
          {/* Logo */}
          <Link href="/" className="relative h-[34px] w-[106px] shrink-0 sm:h-[40px] sm:w-[125px] lg:h-[48px] lg:w-[150px]" aria-label="Tornitech home">
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
                  className="text-base font-normal text-[#f2f2f2] whitespace-nowrap transition-opacity hover:opacity-75"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <Link
            href="/#contacto"
            className="hidden md:inline-flex items-center justify-center min-w-[135px] rounded-[50px] bg-[#fab43a] px-6 py-[7px] text-sm font-normal text-[#316d92] transition-colors hover:bg-[#f0a52a]"
          >
            Cotizar
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                    className="block py-3 text-xl font-medium text-white border-b border-white/20"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 inline-flex items-center justify-center w-full rounded-[50px] bg-[#fab43a] px-6 py-3 text-base font-medium text-[#316d92]"
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
