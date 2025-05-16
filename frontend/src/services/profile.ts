import { api } from "./api";
import type { Profile } from "../types/profile";

export const profileService = {
  async list(): Promise<Profile[]> {
    const res = await api.get("/profiles");
    return res.data;
  },
};
