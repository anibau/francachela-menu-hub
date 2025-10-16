export const parseItemsList = (items: string | string[]): string[] => {
  
  if (Array.isArray(items)) {
    return items;
  }
  
  const parsed = items?.split(',').map(item => item.trim()) || [];
  return parsed;
};

import { Producto } from '@/types';

export const findProductsByIds = (productos: Producto[], ids: string | string[]) => {

  const itemIds = parseItemsList(ids);

  
  const foundProducts = itemIds
    .map(id => {
      const found = productos.find(p => {
        const match = String(p.id) === String(id);
        return match;
      });
      return found;
    })
    .filter(Boolean);
    
  return foundProducts;
};