import { api } from "./api";
import type { IASearchResult } from "../types/ai";

function isAxiosErrorWithErrorData(err: unknown): err is { response: { data: { error: string } } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object" &&
    (err as { response: { data?: unknown } }).response?.data !== undefined &&
    typeof (err as { response: { data: { error?: unknown } } }).response.data.error === "string"
  );
}

const LONG_TIMEOUT = 300_000; // 300 segundos

export const aiService = {
  // async ping(): Promise<boolean> {
  //   try {
  //     await api.get("/ai/ping", { timeout: LONG_TIMEOUT });
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // },

  async generateSql(prompt: string): Promise<IASearchResult> {
    try {
      const res = await api.post<IASearchResult>(
        "/ai/generate-sql",
        { prompt },
        { timeout: LONG_TIMEOUT }
      );
      return res.data;
    } catch (err: unknown) {
      if (isAxiosErrorWithErrorData(err)) {
        throw new Error(err.response.data.error);
      }
      throw err;
    }
  },
};
