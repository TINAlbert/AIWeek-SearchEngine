interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  total: number;
}

export default function Pagination({ page, totalPages, hasNextPage, hasPreviousPage, onPageChange, total }: PaginationProps) {
  // Mostrar máximo 5 páginas en la paginación compacta
  const getPageNumbers = () => {
    const maxPages = 5;
    if (totalPages <= maxPages) return Array.from({ length: totalPages }, (_, i) => i + 1);
    let start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxPages - 1);
    if (end - start < maxPages - 1) start = Math.max(1, end - maxPages + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4" aria-label="Paginación de contactos">
      <div className="text-gray-600 text-sm mb-2 sm:mb-0">
        Total: <b>{total}</b> contactos
      </div>
      <div className="flex items-center gap-1" role="navigation" aria-label="Paginación">
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          aria-label="Primera página"
          title="Primera página"
        >
          «
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={!hasPreviousPage}
          aria-label="Página anterior"
          title="Anterior"
        >
          ‹
        </button>
        {getPageNumbers().map((p) => (
          <button
            key={p}
            className={`px-2 py-1 rounded border ${p === page ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Página ${p}`}
            title={`Página ${p}`}
            disabled={p === page}
          >
            {p}
          </button>
        ))}
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(hasNextPage ? page + 1 : page)}
          disabled={!hasNextPage}
          aria-label="Página siguiente"
          title="Siguiente"
        >
          ›
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          aria-label="Última página"
          title="Última página"
        >
          »
        </button>
      </div>
    </nav>
  );
}
