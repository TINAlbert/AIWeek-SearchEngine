import type { UserProfileApi } from "./user.api";
import type { UserProfile } from "./user";

export function mapUserProfileApiToUserProfile(api: UserProfileApi): UserProfile {
  return {
    id: api.id,
    userName: api.userName,
    email: api.email,
    role: api.role,
    firstName: api.firstName,
    lastName: api.lastName,
    isActive: api.isActive,
    createdAt: api.createdAt,
    updatedAt: api.updatedAt,
    avatarFileName: api.avatarFileName ?? null,
  };
}
