import { Producto, Receta, Combo, Punto } from '../types';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

const normalizeProducto = (row: any): Producto => ({
  id: String(row.id ?? row.ID),
  nombre: row.nombre ?? row.NOMBRE,
  precio: Number(row.precio ?? row.PRECIO) || row.precio,
  precio_mayoreo: Number(row.precio_mayoreo ?? row.PRECIO_MAYOREO ?? row['PRECIO_MAYOREO']) || row.precio_mayoreo,
  imagen: row.imagen ?? row.IMAGEN,
  categoria: row.categoria ?? row.CATEGORIA,
  valor_puntos: Number(row.valor_puntos ?? row.VALOR_PUNTOS ?? row['VALOR_PUNTOS']) || row.valor_puntos,
});

const normalizeReceta = (row: any): Receta => ({
  id: String(row.id ?? row.ID),
  nombre: row.nombre ?? row.NOMBRE,
  ingredientes: typeof (row.ingredientes ?? row.INGREDIENTES) === 'string' 
    ? (row.ingredientes ?? row.INGREDIENTES).split(',').map((s: string) => s.trim())
    : (row.ingredientes ?? row.INGREDIENTES ?? []),
  pasos: row.pasos ?? row.PASOS ?? '',
  imagen: row.imagen ?? row.IMAGEN,
  categorias: typeof (row.categorias ?? row.CATEGORIAS) === 'string'
    ? (row.categorias ?? row.CATEGORIAS).split(',').map((s: string) => s.trim())
    : (row.categorias ?? row.CATEGORIAS),
});

const normalizeCombo = (row: any): Combo => ({
  id: String(row.id ?? row.ID),
  nombre: row.nombre ?? row.NOMBRE,
  precio: Number(row.precio ?? row.PRECIO) || row.precio,
  items: typeof (row.items ?? row.ITEMS) === 'string'
    ? (row.items ?? row.ITEMS).split(',').map((s: string) => s.trim())
    : (row.items ?? row.ITEMS ?? []),
  imagen: row.imagen ?? row.IMAGEN,
  categoria: row.categoria ?? row.CATEGORIA,
  valor_puntos: Number(row.valor_puntos ?? row.VALOR_PUNTOS ?? row['VALOR_PUNTOS']) || row.valor_puntos,
});

const normalizePunto = (row: any): Punto => ({
  id: String(row.id ?? row.ID),
  nombre: row.nombre ?? row.NOMBRE,
  precio: Number(row.precio ?? row.PRECIO) || row.precio,
  imagen: row.imagen ?? row.IMAGEN,
  categoria: row.categoria ?? row.CATEGORIA,
  valor_puntos: Number(row.valor_puntos ?? row.VALOR_PUNTOS ?? row['VALOR_PUNTOS']) || row.valor_puntos,
});

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const url = USE_MOCKS 
      ? '/api/productos' 
      : import.meta.env.VITE_SHEETS_URL_PRODUCTOS;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(normalizeProducto);
  } catch (error) {
    console.error('Error fetching productos:', error);
    return [];
  }
};

export const getRecetario = async (): Promise<Receta[]> => {
  try {
    const url = USE_MOCKS 
      ? '/api/recetario' 
      : import.meta.env.VITE_SHEETS_URL_RECETARIO;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(normalizeReceta);
  } catch (error) {
    console.error('Error fetching recetario:', error);
    return [];
  }
};

export const getCombos = async (): Promise<Combo[]> => {
  try {
    const url = USE_MOCKS 
      ? '/api/combos' 
      : import.meta.env.VITE_SHEETS_URL_COMBOS;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(normalizeCombo);
  } catch (error) {
    console.error('Error fetching combos:', error);
    return [];
  }
};

export const getPuntos = async (): Promise<Punto[]> => {
  try {
    const url = USE_MOCKS 
      ? '/api/puntos' 
      : import.meta.env.VITE_SHEETS_URL_PUNTOS;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(normalizePunto);
  } catch (error) {
    console.error('Error fetching puntos:', error);
    return [];
  }
};
