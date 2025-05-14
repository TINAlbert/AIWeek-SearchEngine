import axios from "axios";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
  return response.data;
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  const response = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
  return response.data;
}
