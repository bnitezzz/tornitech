'use client';

import { motion } from 'framer-motion';

type SectionHeaderProps = {
  heading: string;
  subheading?: string;
  inverse?: boolean;
  className?: string;
  align?: 'center' | 'left';
};

export function SectionHeader({
  heading,
  subheading,
  inverse = false,
  className = '',
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
    >
      <h2 className={inverse ? 'section-heading-inverse' : 'section-heading'}>{heading}</h2>
      <span className={`section-accent ${align === 'left' ? 'mx-0' : ''}`} />
      {subheading && (
        <p
          className={`mt-1 max-w-[640px] text-base leading-relaxed sm:text-lg ${
            inverse ? 'text-white/75' : 'text-[#3c4456]/70'
          }`}
        >
          {subheading}
        </p>
      )}
    </motion.header>
  );
}
