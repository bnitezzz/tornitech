/** Domain model for industrial catalog products (maps to `products` table). */
export type Producto = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagen: string | null;
  categoria: string | null;
  marca: string | null;
  din: string | null;
  astm: string | null;
  grado: string | null;
  sku: string;
  material: string | null;
  stock: number;
  activo: boolean;
  pdf: string | null;
  fecha: string | null;
};
