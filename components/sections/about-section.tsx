'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { ABOUT_CONTENT } from '@/constants/content';
import { ASSETS } from '@/constants/assets';

export function AboutSection() {
  return (
    <section id="nosotros" className="relative w-full bg-white py-16 md:py-24">
      <div className="section-container flex flex-col items-center">
        <SectionHeader
          heading={ABOUT_CONTENT.heading}
          className="max-w-[900px]"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 max-w-[800px] text-center text-body"
        >
          {ABOUT_CONTENT.intro}
        </motion.p>

        {/* Mission / Vision */}
        <div className="mt-14 grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-elevated flex flex-col rounded-[16px] border border-slate-100 bg-white p-8"
          >
            <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#052042]">
              {ABOUT_CONTENT.mission.title}
            </h3>
            <p className="mt-4 text-body-sm leading-relaxed">{ABOUT_CONTENT.mission.text}</p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col rounded-[16px] border border-[#316d92]/10 p-8"
            style={{
              background: 'linear-gradient(124deg, rgba(49,109,146,0.06) 0%, rgba(160,172,175,0.03) 100%)',
            }}
          >
            <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#052042]">
              {ABOUT_CONTENT.vision.title}
            </h3>
            <p className="mt-4 text-body-sm leading-relaxed">{ABOUT_CONTENT.vision.text}</p>
          </motion.article>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_CONTENT.pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-elevated rounded-[14px] border border-slate-100 bg-white p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#316d92]/10">
                <pillar.icon className="h-5 w-5 text-[#316d92]" strokeWidth={1.75} />
              </div>
              <h4 className="font-bold text-[#052042]">{pillar.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-14 h-[220px] w-full overflow-hidden rounded-[16px] sm:h-[280px] md:h-[320px]"
        >
          <Image
            src={ASSETS.about}
            alt="Componentes de fijación industrial en almacén"
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#052042]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white sm:bottom-8 sm:left-8">
            <ShieldCheck className="h-6 w-6 text-[#fab43a]" strokeWidth={1.75} />
            <p className="max-w-[400px] text-sm font-medium leading-relaxed sm:text-base">
              Material identificado con ficha técnica y norma de referencia en cada pedido.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
