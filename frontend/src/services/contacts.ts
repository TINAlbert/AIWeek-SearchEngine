import { api } from "./api";
import type {
  Contact,
  ContactCreateDto,
  ContactUpdateDto,
} from "../types/contact";
import type { ApiContact, ApiContactListResponse } from "../types/contact.api";
import { mapApiContactToContact, mapApiContactListResponseToContactListResponse } from "../types/contact.mapper";

// Servicio para consumo de endpoints de contactos
export const contactsService = {
  // Listar contactos con filtros y paginación
  list: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    const res = await api.get<ApiContactListResponse>("/contacts", { params });
    const mapped = mapApiContactListResponseToContactListResponse(res.data);
    return { ...res, data: mapped };
  },

  // Obtener detalle de un contacto
  get: async (id: number) => {
    const res = await api.get<ApiContact>(`/contacts/${id}`);
    const mapped: Contact = mapApiContactToContact(res.data);
    return { ...res, data: mapped };
  },

  // Crear un nuevo contacto
  create: (data: ContactCreateDto) => api.post<Contact>("/contacts", data),

  // Editar un contacto existente
  update: (id: number, data: ContactUpdateDto) =>
    api.put<Contact>(`/contacts/${id}`, data),

  // Eliminar un contacto
  remove: (id: number) => api.delete<void>(`/contacts/${id}`),
};
