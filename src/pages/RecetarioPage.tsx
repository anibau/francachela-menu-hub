import { useState, useMemo } from 'react';
import { useGoogleSheetData } from '@/hooks/useGoogleSheetData';
import { RecipeModal } from '@/components/RecipeModal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { Loader2, ChefHat } from 'lucide-react';
import { Receta } from '@/types';

const RecetarioPage = () => {
  const { data: recetas, loading, error } = useGoogleSheetData('recetario');
  const { data: productos } = useGoogleSheetData('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Receta | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    recetas.forEach((receta) => {
      if (receta.categorias) {
        receta.categorias.forEach(cat => cats.add(cat));
      } else {
        // Inferir categorías desde ingredientes
        receta.ingredientes.forEach(id => {
          const producto = productos.find(p => p.id === id);
          if (producto?.categoria) {
            cats.add(producto.categoria);
          }
        });
      }
    });
    return Array.from(cats);
  }, [recetas, productos]);

  const filteredRecetas = useMemo(() => {
    return recetas.filter((receta) => {
      const matchesSearch = receta.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (selectedCategory === 'all') {
        return matchesSearch;
      }

      // Verificar en categorías explícitas
      if (receta.categorias?.includes(selectedCategory)) {
        return matchesSearch;
      }

      // Verificar en categorías inferidas de ingredientes
      const hasIngredientCategory = receta.ingredientes.some(id => {
        const producto = productos.find(p => p.id === id);
        return producto?.categoria === selectedCategory;
      });

      return matchesSearch && hasIngredientCategory;
    });
  }, [recetas, productos, searchTerm, selectedCategory]);

  const handleRecipeClick = (receta: Receta) => {
    setSelectedRecipe(receta);
    setModalOpen(true);
  };

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
            <ChefHat className="h-10 w-10 text-primary" />
            Recetario de Cócteles
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubre las mejores recetas para tus celebraciones
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar recetas..."
          />
          <CategorySelector
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecetas.map((receta) => {
            const recetaCategorias = receta.categorias || 
              Array.from(new Set(
                receta.ingredientes
                  .map(id => productos.find(p => p.id === id)?.categoria)
                  .filter(Boolean)
              ));

            return (
              <Card 
                key={receta.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleRecipeClick(receta)}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={receta.imagen || 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=400&fit=crop'}
                    alt={receta.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-3">{receta.nombre}</h3>
                  
                  {recetaCategorias.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recetaCategorias.map((cat, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {receta.ingredientes.length} ingrediente{receta.ingredientes.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRecetas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron recetas
            </p>
          </div>
        )}

        <RecipeModal
          receta={selectedRecipe}
          productos={productos}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
};

export default RecetarioPage;
