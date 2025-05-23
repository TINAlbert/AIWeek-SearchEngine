import axios from "axios";
import { toast } from "react-hot-toast";

// Crea una instancia de Axios para la API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

// Guardar los IDs de los interceptores para poder eliminarlos
let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

// Interceptor para añadir el token de acceso a cada petición
export function setupInterceptors(getAccessToken: () => string | null, onRefreshToken: () => Promise<void>) {
  // Eliminar interceptores previos si existen
  if (requestInterceptorId !== null) {
    api.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== null) {
    api.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
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
      // Evita mostrar toast para 404 de avatar
      const isAvatar404 =
        error.response?.status === 404 &&
        typeof error.config?.url === "string" &&
        (/\/users\/(me|[\w-]+)\/avatar$/.test(error.config.url));
      if (!isAvatar404) {
        const message = error.response?.data?.message || error.message || "Ocurrió un error inesperado";
        toast.error(message);
      }
      return Promise.reject(error);
    }
  );
}
