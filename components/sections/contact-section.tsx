'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactAside } from '@/components/contact/contact-aside';
import { useContactForm } from '@/hooks/use-contact-form';
import { CONTACT_CONTENT } from '@/constants/content';
import { EASE_PREMIUM, VIEWPORT_ONCE, fadeUp, reducedMotionVisible } from '@/lib/motion';

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = prefersReducedMotion ? reducedMotionVisible : fadeUp;
  const form = useContactForm();

  return (
    <section id="contacto" className="section-padding section-bg-contact relative w-full overflow-hidden">
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-[1080px] 2xl:max-w-[1200px]">
          <SectionHeader
            heading="Contacto"
            subheading={CONTACT_CONTENT.responseTime}
            className="mb-5 md:mb-7 [&_h2]:text-[#052042] [&_p]:text-[#3c4456]/80"
          />

          <motion.div
            variants={motionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="glass-panel rounded-2xl p-5 sm:p-7 lg:p-8"
          >
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
              <ContactForm {...form} />
              <ContactAside />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
