'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const PLACEHOLDER_SRC = '/images/product-placeholder.svg';

type ProductImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

function resolveSrc(src: string | null | undefined): string {
  return src && (src.startsWith('http') || src.startsWith('/')) ? src : PLACEHOLDER_SRC;
}

export function ProductImage({
  src,
  alt,
  className,
  sizes = '96px',
  priority,
}: ProductImageProps) {
  const [current, setCurrent] = useState(() => resolveSrc(src));

  useEffect(() => {
    setCurrent(resolveSrc(src));
  }, [src]);

  const unoptimized = current.startsWith('http');

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes}
      className={cn('object-contain', className)}
      unoptimized={unoptimized}
      priority={priority}
      onError={() => {
        if (current !== PLACEHOLDER_SRC) setCurrent(PLACEHOLDER_SRC);
      }}
    />
  );
}
