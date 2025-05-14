import { useEffect, useState } from "react";
import { contactsService } from "../services/contacts";
import type { Contact } from "../types/contact";
import type { ContactListResponse } from "../types/contact";

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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  useEffect(() => {
    if (isMobile && viewMode !== 'cards') setViewMode('cards');
  }, [isMobile, viewMode]);

  useEffect(() => {
    setLoading(true);
    contactsService
      .list({ page, pageSize, search })
      .then((res) => {
        const paged: ContactListResponse = res.data;
        console.log("Paged contacts:", paged);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-4">
        Contactos
        {!isMobile && (
          <>
            <button
              className={`px-2 py-1 rounded text-xs border ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setViewMode('table')}
            >
              Tabla
            </button>
            <button
              className={`px-2 py-1 rounded text-xs border ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setViewMode('cards')}
            >
              Tarjetas
            </button>
          </>
        )}
      </h1>
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
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Teléfono</th>
                <th className="px-4 py-2 border-b">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No hay contactos.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-4 py-2 border-b">{contact.name}</td>
                    <td className="px-4 py-2 border-b">{contact.email}</td>
                    <td className="px-4 py-2 border-b">{contact.phone}</td>
                    <td className="px-4 py-2 border-b">{contact.address || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {contacts.length === 0 ? (
            <div className="col-span-full text-center py-4 text-gray-500">No hay contactos.</div>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="bg-white border border-gray-200 rounded shadow p-4 flex flex-col gap-2 min-w-0 w-full max-w-full box-border">
                <div className="font-bold text-lg break-words">{contact.name}</div>
                <div className="text-sm text-gray-600 break-words">{contact.email}</div>
                <div className="text-sm break-words">{contact.phone}</div>
                <div className="text-xs text-gray-500 break-words">{contact.address || "-"}</div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Paginación enriquecida */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
        <div className="text-gray-600 text-sm mb-2 sm:mb-0">
          Total: <b>{total}</b> contactos
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPreviousPage}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages || 1}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => (hasNextPage ? p + 1 : p))}
            disabled={!hasNextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
