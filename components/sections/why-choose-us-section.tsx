'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const items = [
  {
    title: ['VENTA', 'MAYOR Y DETAL'],
    description: 'PEDIDOS FLEXIBLES',
    image: 'https://images.pexels.com/photos/1267317/pexels-photo-1267317.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: ['CALIDAD', 'CERTIFICADA'],
    description: 'ISO, PROVEEDORES HOMOLOGADOS.',
    image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: ['ASESORÍA', 'ESPECIALIZADA'],
    description: 'INGENIEROS Y SOPORTE TÉCNICO.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: ['ALCANCE', 'MULTISECTORIAL'],
    description: 'ATENCIÓN MÚLTIPLES INDUSTRIAS',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: ['LOGÍSTICA ADAPTABLE'],
    description: 'ENTREGAS PROGRAMADAS',
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: ['TRATAMIENTOS TÉRMICOS'],
    description: 'SOLUCIONES PERSONALIZADAS',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function WhyChooseUsSection() {
  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto flex w-full max-w-[1244px] flex-col items-center px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex w-full flex-col items-center gap-3 md:mb-[54px]"
        >
          <h2 className="section-heading text-center">¿POR QUÉ ESCOGERNOS?</h2>
          <span className="section-accent" />
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-2 justify-items-center gap-x-[25px] gap-y-6 md:grid-cols-3 xl:grid-cols-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full w-full max-w-[174px]"
            >
              <div className="card-elevated card-elevated-hover group flex h-[264px] w-full flex-col overflow-hidden rounded-[10px] border border-slate-100 bg-white">
                <div className="relative h-[150px] w-full shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title.join(' ')}
                    fill
                    sizes="174px"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-4">
                  <h3 className="line-clamp-2 text-lg font-extrabold uppercase leading-tight text-[#3c4456]">
                    {item.title.map((line, li) => (
                      <span key={li}>
                        {line}
                        {li < item.title.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-[11px] line-clamp-2 text-sm font-bold text-[#316d92]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
