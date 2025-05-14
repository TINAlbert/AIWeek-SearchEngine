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

  useEffect(() => {
    setLoading(true);
    contactsService
      .list({ page, pageSize })
      .then((res) => {
        const paged: ContactListResponse = res.data;
        setContacts(paged.data);
        setTotal(paged.total);
        setTotalPages(paged.totalPages);
        setHasNextPage(paged.hasNextPage);
        setHasPreviousPage(paged.hasPreviousPage);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contactos</h1>
      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
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
