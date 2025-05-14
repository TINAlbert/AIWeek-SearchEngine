// Tipos para entidad Contact y operaciones relacionadas

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListResponse {
  data: Contact[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ContactCreateDto {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface ContactUpdateDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}
