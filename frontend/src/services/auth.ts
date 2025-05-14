import axios from "axios";

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
  console.log("Servicio =>", response.data);
  return response.data;
}

export async function refreshToken(refreshToken: string): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const response = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
  return response.data;
}
