'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="nosotros" className="relative w-full bg-white py-12 text-[#3c4456]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 md:px-10 lg:px-[138px]">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex w-full max-w-[900px] flex-col items-center gap-8 text-center"
        >
          <h2 className="text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
            ¿QUIÉNES SOMOS?
          </h2>
          <p className="text-xl font-normal leading-relaxed text-[#3c4456] text-justify">
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
            <div className="relative mt-6 h-[200px] w-full">
              <Image
                src="https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Misión"
                fill
                sizes="(min-width: 1024px) 510px, 100vw"
                className="object-cover rounded-[10px]"
              />
            </div>
            <div
              className="mt-4 min-h-[250px] rounded-[10px] overflow-hidden flex flex-col items-center px-8 pb-10 pt-8"
              style={{
                background: 'linear-gradient(137deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 100%)',
                boxShadow: '0px 1px 4px rgba(11,55,0,0.27), inset 0px 4px 5px rgba(255,255,255,0.16)',
                backdropFilter: 'blur(7.5px)',
                WebkitBackdropFilter: 'blur(7.5px)',
              }}
            >
              <h3 className="w-full max-w-[184px] text-center text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
                MISIÓN
              </h3>
              <p className="mt-8 text-justify text-lg font-normal text-[#3c4456]">
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
              className="min-h-[266px] rounded-[10px] overflow-hidden flex flex-col items-center px-8 pb-10 pt-8"
              style={{
                background: 'linear-gradient(124deg, rgba(49,109,146,0.14) 0%, rgba(160,172,175,0.02) 100%)',
                boxShadow: '0px 1px 4px rgba(11,55,0,0.27), inset 0px 4px 5px rgba(255,255,255,0.16)',
                backdropFilter: 'blur(7.5px)',
                WebkitBackdropFilter: 'blur(7.5px)',
              }}
            >
              <h3 className="w-full max-w-[212px] text-center text-[40px] font-extrabold uppercase tracking-wide text-[#3c4456]">
                VISIÓN
              </h3>
              <p className="mt-8 text-justify text-lg font-normal text-[#3c4456]">
                Consolidarnos como el referente líder en elementos de fijación en Venezuela, impulsando con innovación y excelencia
                los proyectos industriales y de construcción más exigentes.
              </p>
            </div>
            <div className="relative mt-4 mb-6 h-[200px] w-full">
              <Image
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Visión"
                fill
                sizes="(min-width: 1024px) 479px, 100vw"
                className="object-cover rounded-[10px]"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
