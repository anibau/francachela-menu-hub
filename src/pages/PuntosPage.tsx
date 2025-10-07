import { useState, useMemo } from 'react';
import { useGoogleSheetData } from '@/hooks/useGoogleSheetData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { Loader2, Star } from 'lucide-react';

const SHOW_PRICES = import.meta.env.VITE_SHOW_PRICES !== 'false';

const PuntosPage = () => {
  const { data: puntos, loading, error } = useGoogleSheetData('puntos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = puntos
      .map(p => p.categoria)
      .filter((cat): cat is string => Boolean(cat));
    return Array.from(new Set(cats));
  }, [puntos]);

  const filteredPuntos = useMemo(() => {
    return puntos.filter((punto) => {
      const matchesSearch = punto.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || punto.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [puntos, searchTerm, selectedCategory]);

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
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Star className="h-10 w-10 text-primary" />
            Redención de Puntos
          </h1>
          <p className="text-lg text-muted-foreground">
            Canjea tus puntos acumulados por productos exclusivos
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar recompensas..."
          />
          <CategorySelector
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPuntos.map((punto) => (
            <Card key={punto.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-primary/20">
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={punto.imagen || 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop'}
                  alt={punto.nombre}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                  <Star className="inline h-4 w-4 mr-1" />
                  {typeof punto.valor_puntos === 'number' ? punto.valor_puntos : punto.valor_puntos}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{punto.nombre}</h3>
                {punto.categoria && (
                  <Badge variant="secondary" className="mb-2">
                    {punto.categoria}
                  </Badge>
                )}
                {SHOW_PRICES && (
                  <p className="text-sm text-muted-foreground">
                    Valor: ${typeof punto.precio === 'number' ? punto.precio.toFixed(2) : punto.precio}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPuntos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron recompensas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuntosPage;
