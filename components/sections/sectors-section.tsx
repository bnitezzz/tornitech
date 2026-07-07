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
    <section className="relative w-full bg-[#052042] pb-28 pt-14 md:pb-32 md:pt-20">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <h2 className="section-heading-inverse">SECTORES QUE ATENDEMOS</h2>
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
          className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6"
        >
          {sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-[14px] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            >
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 19vw"
                className="img-zoom object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <h3 className="absolute bottom-3 left-1/2 w-[calc(100%-16px)] -translate-x-1/2 text-center font-extrabold text-sm uppercase tracking-wide text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] sm:text-base md:text-lg">
                {sector.title}
              </h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
