'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG, NAVIGATION } from '@/constants/site';
import { FOOTER_CATEGORIES } from '@/constants/content';
import { ASSETS } from '@/constants/assets';
import { useSiteContact } from '@/components/providers/site-contact-provider';
import { WhatsAppLink } from '@/components/ui/whatsapp-link';
import { getGoogleMapsUrl } from '@/lib/maps';
import { safeHttpUrl } from '@/lib/security';
import {
  getPreferredScrollBehavior,
  getSectionIdFromHref,
  scrollToSectionId,
} from '@/lib/scroll';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const contact = useSiteContact();
  const facebookUrl = safeHttpUrl(contact.social.facebook);
  const linkedinUrl = safeHttpUrl(contact.social.linkedin);
  const instagramUrl = safeHttpUrl(contact.social.instagram);

  const handleNavClick = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    const sectionId = getSectionIdFromHref(href);
    if (!sectionId) return;
    event.preventDefault();
    scrollToSectionId(sectionId, getPreferredScrollBehavior());
  };

  return (
    <footer className="w-full bg-[#052042] py-14 md:py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="focus-ring-inverse relative mb-6 block h-[40px] w-[125px] rounded-sm" aria-label="Tornitech — Inicio">
              <Image
                src={ASSETS.logo.primary}
                alt="Tornitech"
                fill
                sizes="125px"
                className="object-contain object-left"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" strokeWidth={1.75} />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" strokeWidth={1.75} />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" strokeWidth={1.75} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-6 font-extrabold uppercase tracking-wide text-white">Navegación</h4>
            <nav aria-label="Enlaces del pie de página" className="space-y-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-6 font-extrabold uppercase tracking-wide text-white">Productos</h4>
            <nav aria-label="Categorías de productos" className="space-y-3">
              {FOOTER_CATEGORIES.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-6 font-extrabold uppercase tracking-wide text-white">Contacto</h4>
            <address className="space-y-4 not-italic">
              {contact.phones.map((number) => (
                <a
                  key={number}
                  href={`tel:${number.replace(/[^0-9+]/g, '')}`}
                  className="focus-ring-inverse flex items-start gap-3 rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {number}
                </a>
              ))}
              <a
                href={`mailto:${contact.email}`}
                className="focus-ring-inverse flex items-start gap-3 rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                {contact.email}
              </a>
              <a
                href={getGoogleMapsUrl(contact.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring-inverse flex items-start gap-3 rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                {contact.address}
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                {contact.businessHours}
              </div>
            </address>

            <div className="mt-6">
              <WhatsAppLink
                messageType="general_quote"
                className="btn-yellow focus-ring-inverse min-h-[46px] w-full px-6 py-3 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp
              </WhatsAppLink>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-white/50 md:text-left">
              © {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/privacidad" className="focus-ring-inverse rounded-sm transition-colors hover:text-[#fab43a]">
                Aviso de Privacidad
              </Link>
              <Link href="/terminos" className="focus-ring-inverse rounded-sm transition-colors hover:text-[#fab43a]">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
