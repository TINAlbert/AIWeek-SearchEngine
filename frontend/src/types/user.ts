export interface UserProfile {
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
