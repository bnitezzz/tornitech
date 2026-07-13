'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProductosSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function ProductosSearch({
  value,
  onChange,
  placeholder = 'Buscar producto...',
}: ProductosSearchProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Label htmlFor="productos-search" className="sr-only">
        Buscar producto
      </Label>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#316d92]/70"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <Input
        id="productos-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="focus-ring h-11 rounded-lg border-slate-200 bg-white pl-10 text-sm text-[#052042] placeholder:text-[#6b7280]/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      />
    </div>
  );
}
