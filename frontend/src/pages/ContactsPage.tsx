import { useEffect, useState } from "react";
import { contactsService } from "../services/contacts";
import type { Contact } from "../types/contact";
import type { ContactListResponse } from "../types/contact";
import ContactsTable from "../components/ContactsTable";
import ContactsCards from "../components/ContactsCards";
import Pagination from "../components/Pagination";
import ViewModeToggle from "../components/ViewModeToggle";

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
    <div className="p-4 flex flex-col">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Contactos</h1>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} isMobile={isMobile} />
      </div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre, email, etc."
          className="border rounded px-3 py-1 w-full max-w-xs"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {search && (
        <div className="mb-2 text-sm text-gray-500">Buscando: <b>{search}</b></div>
      )}
      <div>
        {loading ? (
          <div className="text-center py-8">Cargando...</div>
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
      <div className="mt-8">
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
  );
}
