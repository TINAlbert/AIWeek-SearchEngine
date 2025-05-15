import type { Contact } from "../types/contact";
import NoResults from "./NoResults";

interface ContactsCardsProps {
  contacts: Contact[];
  scrollable?: boolean;
  maxHeight?: string;
}

export default function ContactsCards({ contacts, scrollable = false, maxHeight }: ContactsCardsProps) {
  return (
    <div
      className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full ${scrollable ? 'overflow-y-auto' : ''}`}
      style={{
        maxHeight: scrollable ? (maxHeight || 'calc(100vh - 250px)') : undefined,
        minHeight: 0,
        marginBottom: 0,
      }}
    >
      {contacts.length === 0 ? (
        <NoResults message="No se encontraron contactos" suggestion="Prueba con otros criterios de búsqueda." className="col-span-full" />
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-md p-5 flex flex-col gap-3 min-w-0 w-full max-w-full box-border transition hover:shadow-lg hover:-translate-y-1 duration-150"
          >
            <div className="flex items-center gap-3 mb-2">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                {contact.name?.[0] || '?'}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base text-gray-900 leading-tight">{contact.name}</span>
                <span className="text-xs text-gray-400">{contact.email}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"/></svg>
                {contact.phone || '-'}
              </span>
              <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 10V6a5 5 0 0 0-10 0v4"/><rect width="20" height="12" x="2" y="10" rx="2"/><path d="M7 22h10"/></svg>
                {contact.address || '-'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
