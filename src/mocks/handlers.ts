import { http, HttpResponse } from 'msw';
import { productosMock, recetarioMock, combosMock, puntosMock } from './data';

export const handlers = [
  http.get('/api/productos', () => {
    return HttpResponse.json(productosMock);
  }),
  
  http.get('/api/recetario', () => {
    return HttpResponse.json(recetarioMock);
  }),
  
  http.get('/api/combos', () => {
    return HttpResponse.json(combosMock);
  }),
  
  http.get('/api/puntos', () => {
    return HttpResponse.json(puntosMock);
  }),
];
