'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const sectors = [
  {
    title: 'PETROLERA',
    image: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'CONSTRUCCIÓN',
    image: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'ELÉCTRICA',
    image: 'https://images.pexels.com/photos/236089/pexels-photo-236089.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'AUTOMOTRIZ',
    image: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'FERRETERA',
    image: 'https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export function SectorsSection() {
  return (
    <section className="relative w-full bg-[#052042] py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <h2 className="section-heading-inverse text-white/80">SECTORES QUE ATENDEMOS</h2>
          <span className="section-accent" />
          <p className="mt-1 text-xl font-normal text-white/80 sm:text-2xl md:text-[28px]">
            Soluciones claves por industria
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 w-full overflow-x-auto"
        >
          <div className="flex min-w-max items-center gap-[43px] px-1 py-3">
            {sectors.map((sector, index) => (
              <motion.article
                key={sector.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group relative h-[150px] w-[202px] flex-shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              >
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  sizes="202px"
                  className="img-zoom object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-[15px] left-1/2 w-[calc(100%-24px)] -translate-x-1/2 text-center font-extrabold text-[22px] uppercase tracking-wide whitespace-nowrap text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                  {sector.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
