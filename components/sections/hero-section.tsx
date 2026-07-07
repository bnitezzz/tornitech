'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f2f2f2]">
      <div className="relative min-h-[620px] w-full md:min-h-[720px] lg:min-h-[896px]">
        {/* Background industrial image */}
        <Image
          src="/images/hero-section.jpg"
          alt="Tornillería industrial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Left-to-right gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(97.74deg, rgba(242,242,242,1) 3.72%, rgba(67,72,73,0) 72.53%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1440px] items-start px-4 pt-28 pb-16 sm:px-6 md:min-h-[720px] md:px-10 md:pt-36 lg:min-h-[896px] lg:px-[52px] lg:pt-[118px]">
          {/* Glass card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 w-full max-w-[350px] rounded-[19px] border border-white/[0.12] p-4 sm:p-6 md:p-8 lg:px-[23px] lg:pt-[26px] lg:pb-[40px] sm:max-w-[420px] md:mt-10 md:max-w-[500px] lg:ml-[46px] lg:mt-[150px] lg:max-w-[622px]"
            style={{
              background:
                'linear-gradient(140.57deg, rgba(255,255,255,0.063) 5.96%, rgba(255,255,255,0.012) 68.72%)',
              boxShadow:
                '0px 1px 4px rgba(15,23,42,0.18), inset 0px 4px 5px rgba(255,255,255,0.16)',
              backdropFilter: 'blur(7.5px)',
              WebkitBackdropFilter: 'blur(7.5px)',
            }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full font-extrabold uppercase text-[#3c4456] text-[28px] leading-[1.18] tracking-wide sm:text-[32px] md:text-[36px] lg:text-[40px] lg:max-w-[612px]"
              >
                TORNILLERÍA Y SISTEMAS DE FIJACIÓN PARA LA INDUSTRIA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-4 max-w-[539px] text-base leading-[1.55] text-[#3c4456] sm:text-lg md:mt-5 md:text-xl lg:mt-[22px]"
              >
                Suministro especializado para sectores automotriz, metalmecánico, manufactura y construcción.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-7 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-[36px] lg:gap-[41px]"
              >
                <Link
                  href="/#contacto"
                  className="btn-yellow focus-ring min-h-[46px] w-full px-4 py-3 text-center text-lg"
                >
                  Solicitar cotización
                </Link>
                <Link
                  href="/#catalogos"
                  className="btn-yellow focus-ring min-h-[46px] w-full px-4 py-3 text-center text-lg"
                >
                  Ver catálogo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
