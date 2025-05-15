import { useEffect, useState } from "react";
import { contactsService } from "../services/contacts";
import type { Contact } from "../types/contact";
import type { ContactListResponse } from "../types/contact";
import ContactsTable from "../components/ContactsTable";
import ContactsCards from "../components/ContactsCards";
import Pagination from "../components/Pagination";
import ViewModeToggle from "../components/ViewModeToggle";
import { X, Download } from "lucide-react";

const PAGE_SIZE = 10;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Detectar si es móvil (tailwind: <640px)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && viewMode !== 'cards') setViewMode('cards');
  }, [isMobile, viewMode]);

  useEffect(() => {
    setLoading(true);
    contactsService
      .list({ page, pageSize, search })
      .then((res) => {
        const paged: ContactListResponse = res.data;
        setContacts(paged.data);
        setTotal(paged.total);
        setTotalPages(paged.totalPages);
        setHasNextPage(paged.hasNextPage);
        setHasPreviousPage(paged.hasPreviousPage);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search]);

  // Efecto para aplicar debounce a la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setSearch(searchInput.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center">
      <div className={
        `w-full px-2 sm:px-4 md:px-8 mt-2 sm:mt-14${isMobile && totalPages > 1 ? ' pb-20' : ''}`
      }>
        <h1 className="text-2xl font-bold text-gray-800 mb-1 sm:mb-6">Contactos</h1>
        <div className="flex flex-col gap-2 sm:gap-4 mb-2 sm:mb-6 sticky top-0 z-10 bg-gray-50 pb-2">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full p-0">
            {/* Barra de búsqueda y botones */}
            <div className="w-full flex items-center justify-between border-b border-gray-100 px-3 sm:px-6 h-16 gap-3 sm:gap-6">
              <div className="flex items-center flex-1 min-w-0 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </span>
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, etc."
                  className="pl-10 pr-8 h-10 border border-gray-200 rounded-lg bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-800 text-base shadow-sm transition"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    type="button"
                    aria-label="Limpiar búsqueda"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring"
                    onClick={() => setSearchInput("")}
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-2">
                <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} isMobile={isMobile} size="sm" />
                <button
                  type="button"
                  className="flex items-center justify-center w-9 h-9 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm"
                  title="Exportar contactos"
                  onClick={() => {/* lógica de exportar aquí */}}
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
            {/* Contenido tabla/tarjetas */}
            {search && (
              <div className="px-4 pt-4 text-sm text-gray-500">Buscando: <b>{search}</b></div>
            )}
            <div className="mt-2 px-2 sm:px-4 pb-2">
              {loading ? (
                <div className="text-center py-16">Cargando...</div>
              ) : viewMode === 'table' ? (
                <ContactsTable contacts={contacts} />
              ) : (
                <ContactsCards
                  contacts={contacts}
                  scrollable={true}
                  maxHeight={'70vh'}
                />
              )}
            </div>
            {/* Desktop pagination */}
            <div className="hidden sm:flex justify-end px-4 pb-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onPageChange={setPage}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile fixed pagination */}
      {isMobile && totalPages > 1 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-20 sm:hidden shadow-md">
          <div className="max-w-2xl mx-auto px-2 py-2">
            <Pagination
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onPageChange={setPage}
              total={total}
            />
          </div>
        </div>
      )}
    </div>
  );
}
