// Tipos que representan la estructura real de los datos recibidos desde la API para contactos
import type { Contact, ContactListResponse } from "./contact";

export type ApiContact = Omit<Contact, 'name'> & { firstName: string; lastName: string };
export type ApiContactListResponse = Omit<ContactListResponse, 'data'> & { data: ApiContact[] };
