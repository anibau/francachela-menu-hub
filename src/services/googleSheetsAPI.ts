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
  mostrar: row.mostrar === true || row.MOSTRAR === true || row.mostrar === 'true' || row.MOSTRAR === 'true' || row.mostrar === 'TRUE' || row.MOSTRAR === 'TRUE',
});

const normalizeReceta = (row: any): Receta => {
  const ingredientesRaw = row.ingredientes ?? row.INGREDIENTES;
  const categoriasRaw = row.categorias ?? row.CATEGORIAS;
  
  return {
    id: String(row.id ?? row.ID),
    nombre: row.nombre ?? row.NOMBRE,
    ingredientes: typeof ingredientesRaw === 'string' 
      ? ingredientesRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(ingredientesRaw) ? ingredientesRaw : []),
    cantidades: row.cantidades ?? row.CANTIDADES ?? '',
    pasos: row.pasos ?? row.PASOS ?? '',
    imagen: row.imagen ?? row.IMAGEN,
    categorias: typeof categoriasRaw === 'string'
      ? categoriasRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(categoriasRaw) ? categoriasRaw : []),
    mostrar: row.mostrar === true || row.MOSTRAR === true || row.mostrar === 'true' || row.MOSTRAR === 'true' || row.mostrar === 'TRUE' || row.MOSTRAR === 'TRUE',
  };
};

const normalizeCombo = (row: any): Combo => {
  const itemsRaw = row.items ?? row.ITEMS;
  
  return {
    id: String(row.id ?? row.ID),
    nombre: row.nombre ?? row.NOMBRE,
    precio: Number(row.precio ?? row.PRECIO) || row.precio,
    items: typeof itemsRaw === 'string'
      ? itemsRaw.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(itemsRaw) ? itemsRaw : []),
    imagen: row.imagen ?? row.IMAGEN,
    categoria: row.categoria ?? row.CATEGORIA,
    valor_puntos: Number(row.valor_puntos ?? row.VALOR_PUNTOS ?? row['VALOR_PUNTOS']) || row.valor_puntos,
    mostrar: row.mostrar === true || row.MOSTRAR === true || row.mostrar === 'true' || row.MOSTRAR === 'true' || row.mostrar === 'TRUE' || row.MOSTRAR === 'TRUE',
  };
};

const normalizePunto = (row: any): Punto => ({
  id: String(row.id ?? row.ID),
  nombre: row.nombre ?? row.NOMBRE,
  precio: Number(row.precio ?? row.PRECIO) || row.precio,
  imagen: row.imagen ?? row.IMAGEN,
  categoria: row.categoria ?? row.CATEGORIA,
  valor_puntos: Number(row.valor_puntos ?? row.VALOR_PUNTOS ?? row['VALOR_PUNTOS']) || row.valor_puntos,
  mostrar: row.mostrar === true || row.MOSTRAR === true || row.mostrar === 'true' || row.MOSTRAR === 'true' || row.mostrar === 'TRUE' || row.MOSTRAR === 'TRUE',
});

export const getProductos = async (): Promise<Producto[]> => {
  try {
    const url = USE_MOCKS 
      ? '/api/productos' 
      : import.meta.env.VITE_SHEETS_URL_PRODUCTOS;
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(normalizeProducto).filter((p: Producto) => p.mostrar !== false);
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
    return data.map(normalizeReceta).filter((r: Receta) => r.mostrar !== false);
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
    return data.map(normalizeCombo).filter((c: Combo) => c.mostrar !== false);
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
    return data.map(normalizePunto).filter((p: Punto) => p.mostrar !== false);
  } catch (error) {
    console.error('Error fetching puntos:', error);
    return [];
  }
};
