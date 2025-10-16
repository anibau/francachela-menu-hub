export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
) => {
  // Siempre mostrar al menos 3 páginas si hay disponibles
  const minVisible = Math.min(3, totalPages);
  const actualMaxVisible = Math.min(maxVisible, totalPages);

  const pages: number[] = [];

  // Si hay pocas páginas, mostrarlas todas
  if (totalPages <= actualMaxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Siempre incluir la primera y última página
  pages.push(1);
  if (currentPage > 3) {
    pages.push(-1); // -1 representa ellipsis
  }

  // Calcular el rango alrededor de la página actual
  const rangeStart = Math.max(2, currentPage - 1);
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push(-1); // -1 representa ellipsis
  }
  if (currentPage < totalPages) {
    pages.push(totalPages);
  }

  return pages;
};