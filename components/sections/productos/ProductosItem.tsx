'use client';

type ProductosItemProps = {
  nombre: string;
};

export function ProductosItem({ nombre }: ProductosItemProps) {
  return (
    <li className="flex items-start gap-2 text-sm leading-snug text-[#3c4456]/85">
      <span
        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#316d92]"
        aria-hidden="true"
      />
      <span className="line-clamp-2">{nombre}</span>
    </li>
  );
}
