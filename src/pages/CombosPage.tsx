import { useState, useMemo } from 'react';
import { useGoogleSheetData } from '@/hooks/useGoogleSheetData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { CategorySelector } from '@/components/CategorySelector';
import { Loader2, Gift } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 9;
const SHOW_PRICES = import.meta.env.VITE_SHOW_PRICES !== 'false';
const SHOW_POINTS = import.meta.env.VITE_SHOW_POINTS !== 'false';

const CombosPage = () => {
  const { data: combos, loading, error } = useGoogleSheetData('combos');
  const { data: productos } = useGoogleSheetData('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredCombos.length / ITEMS_PER_PAGE);
  const paginatedCombos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCombos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCombos, currentPage]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Gift className="h-10 w-10 text-primary" />
            Combos Especiales
          </h1>
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
          {paginatedCombos.map((combo) => {
            const comboItems = combo.items
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
                  <div>
                    <h3 className="font-bold text-lg mb-2">{combo.nombre}</h3>
                    {combo.categoria && (
                      <Badge variant="secondary" className="mb-2">
                        {combo.categoria}
                      </Badge>
                    )}
                  </div>

                  {comboItems.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold mb-1">Incluye:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {comboItems.map((item, idx) => (
                          <li key={idx}>{item?.nombre}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t space-y-1">
                    {SHOW_PRICES && (
                      <p className="text-lg font-bold text-primary">
                        S/. {combo.precio}
                      </p>
                    )}
                    {SHOW_POINTS && combo.valor_puntos && (
                      <p className="text-sm text-muted-foreground">
                        {combo.valor_puntos} puntos
                      </p>
                    )}
                  </div>
                </CardContent>
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

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CombosPage;
