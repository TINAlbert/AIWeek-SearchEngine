import { api } from "./api";
import type {
  Contact,
  ContactListResponse,
  ContactCreateDto,
  ContactUpdateDto,
} from "../types/contact";

// Servicio para consumo de endpoints de contactos
export const contactsService = {
  // Listar contactos con filtros y paginación
  list: (params?: { page?: number; pageSize?: number; search?: string }) =>
    api.get<ContactListResponse>("/contacts", { params }),

  // Obtener detalle de un contacto
  get: (id: number) => api.get<Contact>(`/contacts/${id}`),

  // Crear un nuevo contacto
  create: (data: ContactCreateDto) => api.post<Contact>("/contacts", data),

  // Editar un contacto existente
  update: (id: number, data: ContactUpdateDto) =>
    api.put<Contact>(`/contacts/${id}`, data),

  // Eliminar un contacto
  remove: (id: number) => api.delete<void>(`/contacts/${id}`),
};
