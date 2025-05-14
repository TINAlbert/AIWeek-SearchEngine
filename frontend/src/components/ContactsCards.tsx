import type { Contact } from "../types/contact";

interface ContactsCardsProps {
  contacts: Contact[];
}

export default function ContactsCards({ contacts }: ContactsCardsProps) {
  return (
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
  );
}
