import { useState, useEffect, useCallback } from 'react';
import { getProductos, getRecetario, getCombos, getPuntos } from '../services/googleSheetsAPI';
import { Producto, Receta, Combo, Punto } from '../types';

type EndpointName = 'productos' | 'recetario' | 'combos' | 'puntos';
type DataType<T extends EndpointName> = 
  T extends 'productos' ? Producto[] :
  T extends 'recetario' ? Receta[] :
  T extends 'combos' ? Combo[] :
  T extends 'puntos' ? Punto[] :
  never;

export function useGoogleSheetData<T extends EndpointName>(endpointName: T) {
  const [data, setData] = useState<DataType<T>>([] as DataType<T>);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result;
      let rawResult;
      switch (endpointName) {
        case 'productos':
          rawResult = await getProductos();
          result = rawResult;
          break;
        case 'recetario':
          result = await getRecetario();
          break;
        case 'combos':
          result = await getCombos();
          break;
        case 'puntos':
          result = await getPuntos();
          break;
        default:
          throw new Error(`Unknown endpoint: ${endpointName}`);
      }
      setData(result as DataType<T>);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
      setData([] as DataType<T>);
    } finally {
      setLoading(false);
    }
  }, [endpointName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}
