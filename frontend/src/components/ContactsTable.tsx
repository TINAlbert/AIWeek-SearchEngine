import type { Contact } from "../types/contact";
import NoResults from "./NoResults";

interface ContactsTableProps {
  contacts: Contact[];
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <th className="px-4 py-3 text-left font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Teléfono</th>
            <th className="px-4 py-3 text-left font-semibold">Dirección</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-0">
                <NoResults message="No se encontraron contactos" suggestion="Prueba con otros criterios de búsqueda." className="py-12" />
              </td>
            </tr>
          ) : (
            contacts.map((contact, idx) => (
              <tr
                key={contact.id}
                className={
                  `transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`
                }
              >
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                  {/* Aquí podrías poner un avatar si lo tienes: <img ... /> */}
                  {contact.name}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{contact.email}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{contact.phone}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{contact.address || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
