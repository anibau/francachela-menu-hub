import { useState, useMemo } from 'react';
import { useGoogleSheetData } from '@/hooks/useGoogleSheetData';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { Loader2 } from 'lucide-react';

const ProductosPage = () => {
  const { data: productos, loading, error } = useGoogleSheetData('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = productos
      .map(p => p.categoria)
      .filter((cat): cat is string => Boolean(cat));
    return Array.from(new Set(cats));
  }, [productos]);

  const filteredProductos = useMemo(() => {
    return productos.filter((producto) => {
      const matchesSearch = producto.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || producto.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productos, searchTerm, selectedCategory]);

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
          <h1 className="text-4xl font-bold">Catálogo de Productos</h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestra selección premium de bebidas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar productos..."
          />
          <CategorySelector
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProductos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        {filteredProductos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron productos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductosPage;
