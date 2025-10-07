import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Producto } from '../types';

interface ProductCardProps {
  producto: Producto;
}

const SHOW_PRICES = import.meta.env.VITE_SHOW_PRICES !== 'false';
const SHOW_POINTS = import.meta.env.VITE_SHOW_POINTS !== 'false';

export const ProductCard = ({ producto }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={producto.imagen || 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop'}
          alt={producto.nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{producto.nombre}</h3>
        {producto.categoria && (
          <Badge variant="secondary" className="mb-2">
            {producto.categoria}
          </Badge>
        )}
        {SHOW_PRICES && (
          <div className="space-y-1">
            <p className="text-lg font-semibold text-primary">
              ${typeof producto.precio === 'number' ? producto.precio.toFixed(2) : producto.precio}
            </p>
            {producto.precio_mayoreo && (
              <p className="text-sm text-muted-foreground">
                Mayoreo: ${typeof producto.precio_mayoreo === 'number' ? producto.precio_mayoreo.toFixed(2) : producto.precio_mayoreo}
              </p>
            )}
          </div>
        )}
      </CardContent>
      {SHOW_POINTS && producto.valor_puntos && (
        <CardFooter className="px-4 py-3 bg-muted/50">
          <p className="text-sm font-medium">
            🎯 {typeof producto.valor_puntos === 'number' ? producto.valor_puntos : producto.valor_puntos} puntos
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
