import type { Contact } from "../types/contact";
import NoResults from "./NoResults";

interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  return (
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
              <td colSpan={4}>
                <NoResults message="No se encontraron contactos" suggestion="Prueba con otros criterios de búsqueda." />
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
  );
}
