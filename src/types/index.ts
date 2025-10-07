export type Producto = {
  id: string;
  nombre: string;
  precio: number | string;
  precio_mayoreo?: number | string;
  imagen?: string;
  categoria?: string;
  valor_puntos?: number | string;
};

export type Receta = {
  id: string;
  nombre: string;
  ingredientes: string[];
  pasos: string;
  imagen?: string;
  categorias?: string[];
};

export type Combo = {
  id: string;
  nombre: string;
  precio: number | string;
  items: string[];
  imagen?: string;
  categoria?: string;
  valor_puntos?: number | string;
};

export type Punto = {
  id: string;
  nombre: string;
  precio: number | string;
  imagen?: string;
  categoria?: string;
  valor_puntos?: number | string;
};
