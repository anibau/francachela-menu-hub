import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Receta, Producto } from '../types';
import { Badge } from './ui/badge';

interface RecipeModalProps {
  receta: Receta | null;
  productos: Producto[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecipeModal = ({ receta, productos, open, onOpenChange }: RecipeModalProps) => {
  if (!receta) return null;

  const ingredientes = receta.ingredientes
    .map(id => productos.find(p => p.id === id))
    .filter(Boolean) as Producto[];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{receta.nombre}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {receta.imagen && (
            <img
              src={receta.imagen}
              alt={receta.nombre}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {receta.categorias && receta.categorias.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {receta.categorias.map((cat, idx) => (
                <Badge key={idx} variant="secondary">{cat}</Badge>
              ))}
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg mb-3">Ingredientes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ingredientes.map((ingrediente) => (
                <div key={ingrediente.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  {ingrediente.imagen && (
                    <img
                      src={ingrediente.imagen}
                      alt={ingrediente.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span className="text-sm font-medium line-clamp-2">{ingrediente.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {receta.cantidades && (
            <div>
              <h3 className="font-bold text-lg mb-3">Cantidades</h3>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                {receta.cantidades.split('\n').filter(Boolean).map((cantidad, idx) => (
                  <li key={idx}>{cantidad}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg mb-3">Preparación</h3>
            <div className="prose prose-sm max-w-none whitespace-pre-line text-foreground">
              {receta.pasos}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
