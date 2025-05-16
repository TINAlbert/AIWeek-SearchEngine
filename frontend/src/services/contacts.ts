import { api } from "./api";
import type {
  Contact,
  ContactCreateDto,
  ContactUpdateDto,
  ContactAdvancedFilter,
} from "../types/contact";
import type { ApiContact, ApiContactListResponse } from "../types/contact.api";
import { mapApiContactToContact, mapApiContactListResponseToContactListResponse } from "../types/contact.mapper";

// Servicio para consumo de endpoints de contactos
export const contactsService = {
  // Listar contactos con filtros y paginación
  list: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    // Adaptar el nombre del parámetro de búsqueda a 'filter' para la API
    const { search, ...rest } = params || {};
    const apiParams = { ...rest, filter: search };
    const res = await api.get<ApiContactListResponse>("/contacts", { params: apiParams });
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

  // Búsqueda avanzada de contactos
  searchAdvanced: async (filter: ContactAdvancedFilter) => {
    const res = await api.post<ApiContactListResponse>("/contacts/search-advanced", filter);
    const mapped = mapApiContactListResponseToContactListResponse(res.data);
    return { ...res, data: mapped };
  },

  // Exportar contactos (simple o avanzado)
  exportContacts: async (payload: { Search?: string; AdvancedFilter?: any }) => {
    const res = await api.post("/contacts/export", payload, {
      responseType: "blob",
    });
    // Obtener nombre sugerido del header si existe
    let filename = "contactos_exportados.csv";
    const disposition = res.headers["content-disposition"];
    if (disposition) {
      const match = /filename="?([^";]+)"?/i.exec(disposition);
      if (match) filename = match[1];
    }
    return { blob: res.data, filename };
  },
};
