import { useEffect, useState } from "react";
import { contactsService } from "../services/contacts";
import type { Contact } from "../types/contact";

const PAGE_SIZE = 10;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    contactsService
      .list({ page, pageSize: PAGE_SIZE })
      .then((res) => {
        setContacts(res.data.data);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [page]);

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
      {/* Paginación básica */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {page} de {Math.ceil(total / PAGE_SIZE) || 1}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(total / PAGE_SIZE)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
