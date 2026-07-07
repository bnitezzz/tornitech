'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG, NAVIGATION } from '@/constants/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#052042] py-12">
      <div className="container mx-auto px-4 max-w-[1170px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="focus-ring-inverse relative mb-6 block h-[40px] w-[125px] rounded-sm" aria-label="Tornitech home">
              <Image
                src="/logo-tornitech.png"
                alt="Tornitech"
                fill
                sizes="125px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed text-sm">
              Distribuidor mayorista de tornillería, anclajes y sistemas de fijación para la industria.
            </p>
            <div className="flex gap-3">
              {SITE_CONFIG.social.facebook && (
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" strokeWidth={1.75} />
                </a>
              )}
              {SITE_CONFIG.social.linkedin && (
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" strokeWidth={1.75} />
                </a>
              )}
              {SITE_CONFIG.social.instagram && (
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring-inverse flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fab43a] hover:text-[#3c4456]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" strokeWidth={1.75} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-extrabold text-white uppercase tracking-wide mb-6">Navegación</h4>
            <nav className="space-y-3">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-extrabold text-white uppercase tracking-wide mb-6">Productos</h4>
            <nav className="space-y-3">
              <Link href="/#productos" className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]">
                Tornillería
              </Link>
              <Link href="/#productos" className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]">
                Anclajes
              </Link>
              <Link href="/#productos" className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]">
                Fijación Estructural
              </Link>
              <Link href="/#productos" className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]">
                Herramientas
              </Link>
              <Link href="/#catalogos" className="focus-ring-inverse block rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]">
                Catálogos
              </Link>
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-extrabold text-white uppercase tracking-wide mb-6">Contacto</h4>
            <address className="not-italic space-y-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="focus-ring-inverse flex items-start gap-3 rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="focus-ring-inverse flex items-start gap-3 rounded-sm text-sm text-white/70 transition-colors hover:text-[#fab43a]"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                {SITE_CONFIG.address}
              </div>
            </address>

            <div className="mt-6">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-yellow focus-ring-inverse min-h-[46px] w-full px-6 py-3 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center md:text-left">
              © {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/privacidad" className="focus-ring-inverse rounded-sm transition-colors hover:text-[#fab43a]">
                Aviso de Privacidad
              </Link>
              <Link href="/terminos" className="focus-ring-inverse rounded-sm transition-colors hover:text-[#fab43a]">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
