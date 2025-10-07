import { useState, useMemo } from 'react';
import { useGoogleSheetData } from '@/hooks/useGoogleSheetData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { Loader2, Package } from 'lucide-react';

const SHOW_PRICES = import.meta.env.VITE_SHOW_PRICES !== 'false';
const SHOW_POINTS = import.meta.env.VITE_SHOW_POINTS !== 'false';

const CombosPage = () => {
  const { data: combos, loading, error } = useGoogleSheetData('combos');
  const { data: productos } = useGoogleSheetData('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = combos
      .map(c => c.categoria)
      .filter((cat): cat is string => Boolean(cat));
    return Array.from(new Set(cats));
  }, [combos]);

  const filteredCombos = useMemo(() => {
    return combos.filter((combo) => {
      const matchesSearch = combo.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || combo.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [combos, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Catálogo de Combos</h1>
          <p className="text-lg text-muted-foreground">
            Paquetes especiales con los mejores precios
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar combos..."
          />
          <CategorySelector
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCombos.map((combo) => {
            const comboProductos = combo.items
              .map(id => productos.find(p => p.id === id))
              .filter(Boolean);

            return (
              <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={combo.imagen || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop'}
                    alt={combo.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-bold text-lg">{combo.nombre}</h3>
                  
                  {combo.categoria && (
                    <Badge variant="secondary">{combo.categoria}</Badge>
                  )}

                  {comboProductos.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Incluye:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {comboProductos.map((p) => (
                          <li key={p!.id} className="flex items-center gap-2">
                            • {p!.nombre}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {SHOW_PRICES && (
                    <p className="text-xl font-semibold text-primary">
                      ${typeof combo.precio === 'number' ? combo.precio.toFixed(2) : combo.precio}
                    </p>
                  )}
                </CardContent>
                {SHOW_POINTS && combo.valor_puntos && (
                  <CardFooter className="px-4 py-3 bg-muted/50">
                    <p className="text-sm font-medium">
                      🎯 {typeof combo.valor_puntos === 'number' ? combo.valor_puntos : combo.valor_puntos} puntos
                    </p>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>

        {filteredCombos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron combos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombosPage;
