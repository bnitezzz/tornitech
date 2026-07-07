'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const certifications = [
  { name: 'ISO 9001', abbr: 'ISO' },
  { name: 'DIN', abbr: 'DIN' },
  { name: 'ASTM', abbr: 'ASTM' },
  { name: 'API', abbr: 'API' },
  { name: 'ANSI', abbr: 'ANSI' },
];

export function PartnersSection() {
  return (
    <section className="w-full bg-[#f2f2f7] px-4 pb-16 pt-10 md:px-8 md:pb-20 lg:px-[134px]">
      <div className="mx-auto flex w-full max-w-[1171px] flex-col gap-10">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Marcas y Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h3 className="w-full max-w-[361px] text-center text-[25px] font-extrabold uppercase tracking-wide text-[#3c4456]">
              MARCAS Y CERTIFICACIONES
            </h3>
            <div className="grid w-full max-w-[480px] grid-cols-3 gap-6 sm:gap-8">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center justify-center rounded-[10px] border border-[#316d92]/20 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#316d92]/40 hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
                >
                  <span className="text-xl font-extrabold text-[#316d92] uppercase">{cert.abbr}</span>
                  <span className="mt-1 text-xs text-[#3c4456]">{cert.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Socio Comercial - Panama Fasteners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-6"
          >
            <h3 className="w-full max-w-[361px] text-center text-[25px] font-extrabold uppercase tracking-wide text-[#3c4456]">
              NUESTRO SOCIO COMERCIAL
            </h3>
            <div className="card-elevated w-full max-w-[574px] rounded-[10px] border border-slate-100 bg-white p-[23px]">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[235px_minmax(0,1fr)] md:items-center md:gap-4">
                <div className="relative h-[284px] w-full overflow-hidden rounded-[10px] md:w-[235px]">
                  <Image
                    src="https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Panama Fasteners Inc"
                    fill
                    sizes="(min-width: 768px) 235px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-h-[284px] flex-col items-center justify-center px-2 text-center">
                  <h2 className="w-full text-xl font-extrabold uppercase tracking-wide text-[#3c4456] md:max-w-[273px]">
                    PANAMA FASTENERS INC
                  </h2>
                  <p className="mt-3 w-full font-bold text-base text-[#3c4456] md:max-w-[275px]">
                    Aliado estratégico internacional que garantiza calidad, disponibilidad y soporte.
                  </p>
                  <div className="mt-10 h-px w-full max-w-[221px] bg-[#316d92]/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
