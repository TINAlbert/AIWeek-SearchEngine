import { api } from "./api";
import type { UserProfile } from "../types/user";
import type { UserProfileApi } from "../types/user.api";
import { mapUserProfileApiToUserProfile } from "../types/user.mapper";

export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await api.get<UserProfileApi>("/users/me");
  return mapUserProfileApiToUserProfile(res.data);
};

export const uploadUserAvatar = async (file: File): Promise<{ message: string; fileName: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post("/users/me/avatar", formData);
  return res.data;
};

export const getUserAvatar = async (): Promise<Blob> => {
  const res = await api.get("/users/me/avatar", {
    responseType: "blob",
  });
  return res.data;
};
