import { api } from "./api";
import type { Company } from "../types/company";

export const companyService = {
  list: async (): Promise<Company[]> => {
    const res = await api.get<Company[]>("/companies");
    return res.data;
  },
};
