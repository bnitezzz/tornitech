'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { useClientes, useTestimonios, useFaqs } from '@/hooks/use-contenido';
import type { ClientRow, TestimonialRow, FaqRow } from '@/hooks/use-contenido';
import { useConfigSection } from '@/hooks/use-configuracion';

export function ClientsSection() {
  const config = useConfigSection('clients_section', { heading: 'CLIENTES', subheading: '' });
  const { data: clientes = [] } = useClientes();
  if (!clientes.length) return null;

  return (
    <section className="section-padding w-full bg-[#f8fafc]">
      <div className="section-container">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8" />
        <div className="flex flex-wrap items-center justify-center gap-6">
          {clientes.map((c: ClientRow) => (
            <motion.div key={c.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#052042] shadow-sm">
              {c.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const config = useConfigSection('testimonials_section', { heading: 'TESTIMONIOS', subheading: '' });
  const { data: items = [] } = useTestimonios();
  if (!items.length) return null;

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((t: TestimonialRow, i: number) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-slate-100 bg-[#f8fafc] p-6"
            >
              <p className="text-sm leading-relaxed text-[#3c4456]">&ldquo;{t.content}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-[#052042]">
                {t.author_name}
                {t.company ? ` · ${t.company}` : ''}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const config = useConfigSection('faq_section', { heading: 'PREGUNTAS FRECUENTES', subheading: '' });
  const { data: faqs = [] } = useFaqs();
  if (!faqs.length) return null;

  return (
    <section className="section-padding w-full bg-[#f8fafc]">
      <div className="section-container mx-auto max-w-3xl">
        <SectionHeader heading={config.heading} subheading={config.subheading} className="mb-8" />
        <div className="space-y-3">
          {faqs.map((faq: FaqRow, i: number) => (
            <motion.details
              key={faq.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group rounded-xl border border-slate-100 bg-white px-5 py-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-[#052042] marker:content-none">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
