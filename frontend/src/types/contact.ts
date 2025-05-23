// Tipos para entidad Contact y operaciones relacionadas

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  city: string;
  companyId?: number;
  companyName?: string;
  profiles: import("./profile").Profile[];
  createdAt: string;
  updatedAt: string;
  name: string;
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
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  city: string;
  companyId?: number;
  profileIds: number[];
}

export interface ContactUpdateDto {
  firstName?: string;
  lastName?: string;
  document?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  city?: string;
  companyId?: number;
  profileIds?: number[];
}

export interface ContactAdvancedFilter {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  companyId?: number;
  companyName?: string;
  profileIds?: number[];
  page?: number;
  pageSize?: number;
}
