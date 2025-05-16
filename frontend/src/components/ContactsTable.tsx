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
            <th className="px-4 py-3 text-left font-semibold">Empresa</th>
            <th className="px-4 py-3 text-left font-semibold">Perfiles</th>
            {/* <th className="px-4 py-3 text-left font-semibold">Ciudad</th> */}
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-0">
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
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{contact.companyName || "-"}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {contact.profiles && contact.profiles.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {contact.profiles.slice(0, 2).map((profile) => (
                        <span key={profile.id} className="inline-block bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5 text-xs font-medium">
                          {profile.name}
                        </span>
                      ))}
                      {contact.profiles.length > 2 && (
                        <span
                          className="inline-block bg-gray-100 text-gray-500 border border-gray-200 rounded px-2 py-0.5 text-xs font-medium cursor-pointer"
                          title={contact.profiles.slice(2).map((p) => p.name).join(", ")}
                        >
                          +{contact.profiles.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300">-</span>
                  )}
                </td>
                {/* <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{contact.city || "-"}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
