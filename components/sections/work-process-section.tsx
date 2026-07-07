'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Envíanos su requerimiento',
    description: 'Compártenos sus especificaciones o plano del producto que necesita',
  },
  {
    number: '2',
    title: 'Analizamos las especificaciones',
    description: 'Nuestro equipo técnico revisa y valida la mejor opción para tu proyecto',
  },
  {
    number: '3',
    title: 'Generamos la cotización',
    description: 'Te enviamos una propuesta competitiva y ajustada a tus necesidades',
  },
  {
    number: '4',
    title: 'Despachamos su pedido',
    description: 'Entregamos en tiempo y forma con seguimiento personalizado',
  },
];

export function WorkProcessSection() {
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center gap-3 md:mb-[58px]"
        >
          <h2 className="section-heading text-center">¿CÓMO TRABAJAMOS?</h2>
          <span className="section-accent" />
        </motion.header>

        {/* Desktop: horizontal */}
        <div className="relative hidden md:block w-full">
          {/* Connecting line */}
          <div className="absolute top-[45px] left-[10%] right-[10%] h-px bg-[#316d92]/30" />

          <div className="grid grid-cols-4 gap-[52px]">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="group relative flex flex-col items-center"
              >
                {/* Step circle */}
                <div className="relative z-10 mb-[34px] flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#316d92] bg-white shadow-[0_2px_8px_rgba(49,109,146,0.12)] transition-transform duration-300 ease-out group-hover:scale-105">
                  <span className="text-[40px] font-semibold text-[#316d92]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-6 min-h-[46px] text-center text-[19px] font-bold text-[#3c4456]">
                  {step.title}
                </h3>
                <p className="max-w-[230px] text-center text-base text-[#316d92]">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {steps.map((step, index) => (
            <motion.article
              key={`mobile-${step.number}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-[90px] w-[90px] items-center justify-center rounded-full border-2 border-[#316d92] bg-white">
                <span className="text-[40px] font-semibold text-[#316d92]">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 max-w-[230px] text-[19px] font-bold text-[#3c4456]">
                {step.title}
              </h3>
              <p className="max-w-[230px] text-base text-[#316d92]">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
