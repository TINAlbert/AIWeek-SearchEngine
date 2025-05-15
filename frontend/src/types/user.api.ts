// Tipos que reflejan la respuesta cruda de la API (UserProfileDto)
export interface UserProfileApi {
  id: string;
  userName: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  avatarFileName?: string | null;
}
