import axios from "axios";
import { toast } from "react-hot-toast";

// Crea una instancia de Axios para la API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Interceptor para añadir el token de acceso a cada petición
export function setupInterceptors(getAccessToken: () => string | null, onRefreshToken: () => Promise<void>) {
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Si el error es 401, intenta refrescar el token
      if (error.response?.status === 401) {
        try {
          await onRefreshToken();
          return api(error.config); // Reintenta la petición original
        } catch (refreshError) {
          // Si falla el refresh, propaga el error
          return Promise.reject(refreshError);
        }
      }
      // Manejo global de errores (4xx/5xx excepto 401)
      const message = error.response?.data?.message || error.message || "Ocurrió un error inesperado";
      toast.error(message);
      return Promise.reject(error);
    }
  );
}
