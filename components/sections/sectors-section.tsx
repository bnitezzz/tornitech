'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { SECTORS_CONTENT } from '@/constants/content';

type Sector = (typeof SECTORS_CONTENT.sectors)[number];

export function SectorsSection() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(dialogRef, {
    isActive: Boolean(selectedSector),
    returnFocusRef: triggerRef,
    initialFocusRef: closeButtonRef,
  });

  useEffect(() => {
    if (!selectedSector) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSector(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedSector]);

  const openSector = (sector: Sector, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setSelectedSector(sector);
  };

  return (
    <section className="relative w-full bg-[#052042] pb-20 pt-12 md:pb-24 md:pt-16">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={SECTORS_CONTENT.heading}
          subheading={SECTORS_CONTENT.subheading}
          inverse
          className="mb-8 md:mb-10"
        />

        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {SECTORS_CONTENT.sectors.map((sector, index) => (
            <motion.button
              key={sector.title}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              onClick={(e) => openSector(sector, e.currentTarget)}
              className="focus-ring-inverse group relative aspect-[4/5] w-full overflow-hidden rounded-xl text-left transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src={sector.image}
                alt={`Sector ${sector.title}`}
                fill
                sizes="(max-width: 640px) 45vw, 19vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#052042]/90 via-[#052042]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                  {sector.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#052042]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setSelectedSector(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sector-modal-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_24px_64px_-12px_rgba(5,32,66,0.35)] sm:max-h-[85vh] sm:rounded-2xl"
            >
              <div className="relative h-[200px] w-full shrink-0 sm:h-[240px]">
                <Image
                  src={selectedSector.image}
                  alt={selectedSector.title}
                  fill
                  sizes="640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052042]/70 to-transparent" />
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={() => setSelectedSector(null)}
                  aria-label="Cerrar"
                  className="focus-ring absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#052042] transition-colors hover:bg-white"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <h3
                  id="sector-modal-title"
                  className="absolute bottom-4 left-5 text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl"
                >
                  {selectedSector.title}
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-sm leading-relaxed text-[#3c4456]/85 sm:text-base">
                  {selectedSector.description}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#316d92]">
                    Productos y servicios
                  </p>
                  <ul className="mt-3 space-y-2">
                    {selectedSector.products.map((product) => (
                      <li
                        key={product}
                        className="flex items-center gap-2.5 text-sm text-[#3c4456]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#fab43a]" aria-hidden="true" />
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                <WhatsAppLink
                  messageType="general_quote"
                  className="btn-yellow focus-ring mt-6 w-full px-6 py-3 text-base font-semibold sm:w-auto"
                >
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </WhatsAppLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
