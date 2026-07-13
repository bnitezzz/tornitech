export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion?: string | null;
  orden: number;
  activo: boolean;
}

export interface ConfiguracionWeb {
  id: number;
  mostrar_productos: boolean;
  updated_at?: string;
}

export interface ProductoCategoria {
  categoria: string;
  productos: Producto[];
}
