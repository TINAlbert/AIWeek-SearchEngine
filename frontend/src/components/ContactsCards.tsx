import type { Contact } from "../types/contact";
import NoResults from "./NoResults";
import { Phone, MapPin, Building2 } from "lucide-react";

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
                <Phone className="w-4 h-4" />
                {contact.phone || '-'}
              </span>
              <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
                <Building2 className="w-4 h-4" />
                {contact.address || '-'}
              </span>
              <span className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
                <MapPin className="w-4 h-4" />
                {contact.city || '-'}
              </span>
            </div>
            {contact.profiles && contact.profiles.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {contact.profiles.map((profile) => (
                  <span key={profile.id} className="inline-block bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5 text-xs font-medium">
                    {profile.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
