// Tipos que representan la estructura real de los datos recibidos desde la API para contactos
import type { Profile } from "./profile";

export type ApiContact = {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  companyId?: number;
  companyName?: string;
  profiles: Profile[];
  createdAt: string;
  updatedAt: string;
};

export type ApiContactListResponse = {
  data: ApiContact[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
