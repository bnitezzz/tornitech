'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="nosotros" className="relative w-full bg-white py-14 text-[#3c4456] md:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 md:px-10 lg:px-[138px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex w-full max-w-[900px] flex-col items-center gap-6 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <h2 className="section-heading">¿QUIÉNES SOMOS?</h2>
            <span className="section-accent" />
          </div>
          <p className="text-left text-xl font-normal leading-relaxed text-[#3c4456]">
            CCS Tornitech C.A. distribuye al mayor y detal tornillería, anclajes y sistemas de fijación nacionales e importados.
            Su aliado estratégico para proyectos petroleros, eléctricos, de construcción, industriales y automotrices.
          </p>
        </motion.header>

        {/* Misión / Visión cards */}
        <div className="mt-16 grid w-full grid-cols-1 gap-y-20 lg:grid-cols-2 lg:items-start lg:gap-x-24">
          {/* Misión */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col max-w-[510px]"
          >
            <div className="group relative mt-6 h-[200px] w-full overflow-hidden rounded-[10px]">
              <Image
                src="https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Misión"
                fill
                sizes="(min-width: 1024px) 510px, 100vw"
                className="img-zoom object-cover"
              />
            </div>
            <div className="card-elevated mt-4 flex min-h-[250px] flex-col items-center rounded-[10px] border border-slate-100 bg-white px-8 pb-10 pt-8">
              <h3 className="w-full max-w-[184px] text-center text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
                MISIÓN
              </h3>
              <p className="mt-6 text-left text-lg font-normal leading-relaxed text-[#3c4456]/85">
                Impulsar la industria venezolana con soluciones de fijación de vanguardia, respaldadas por calidad internacional,
                asesoría técnica y una logística eficiente.
              </p>
            </div>
          </motion.article>

          {/* Visión */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col max-w-[479px] justify-self-end"
          >
            <div
              className="card-elevated flex min-h-[266px] flex-col items-center rounded-[10px] border border-[#316d92]/10 px-8 pb-10 pt-8"
              style={{
                background: 'linear-gradient(124deg, rgba(49,109,146,0.08) 0%, rgba(160,172,175,0.04) 100%)',
              }}
            >
              <h3 className="w-full max-w-[212px] text-center text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
                VISIÓN
              </h3>
              <p className="mt-6 text-left text-lg font-normal leading-relaxed text-[#3c4456]/85">
                Consolidarnos como el referente líder en elementos de fijación en Venezuela, impulsando con innovación y excelencia
                los proyectos industriales y de construcción más exigentes.
              </p>
            </div>
            <div className="group relative mt-4 mb-6 h-[200px] w-full overflow-hidden rounded-[10px]">
              <Image
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Visión"
                fill
                sizes="(min-width: 1024px) 479px, 100vw"
                className="img-zoom object-cover"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
