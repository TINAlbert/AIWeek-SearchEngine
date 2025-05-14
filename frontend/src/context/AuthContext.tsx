import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken as refreshTokenService } from "../services/auth";
import { setupInterceptors, api } from "../services/api";
import toast from "react-hot-toast";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: { token: string; refreshToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem("refreshToken"));

  const navigate = useNavigate();

  const login = (data: { token: string; refreshToken: string }) => {
    setAccessToken(data.token);
    setRefreshToken(data.refreshToken);
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    console.log("[LOGIN] Guardado en localStorage:", {
      accessToken: data.token,
      refreshToken: data.refreshToken,
    });
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("[LOGOUT] Tokens eliminados de localStorage");
  };

  useEffect(() => {
    // Log de valores leídos al montar
    console.log("[AuthProvider] Estado inicial:", {
      accessToken,
      refreshToken,
      localStorageAccessToken: localStorage.getItem("accessToken"),
      localStorageRefreshToken: localStorage.getItem("refreshToken"),
    });
    // Si no hay accessToken o refreshToken, forzar logout y redirigir a login
    if (!accessToken || !refreshToken) {
      logout();
      navigate("/login", { replace: true });
      return;
    }
    setupInterceptors(
      () => accessToken,
      async () => {
        if (!refreshToken) throw new Error("No refresh token");
        try {
          const res = await refreshTokenService(refreshToken);
          setAccessToken(res.token);
          setRefreshToken(res.refreshToken);
          localStorage.setItem("accessToken", res.token);
          localStorage.setItem("refreshToken", res.refreshToken);
        } catch (e: unknown) {
          toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
          logout();
          navigate("/login", { replace: true });
          throw e;
        }
      }
    );
  }, [accessToken, refreshToken, navigate]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
