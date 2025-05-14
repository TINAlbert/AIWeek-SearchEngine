import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type LoginResponse, refreshToken as refreshTokenService } from "../services/auth";
import { setupInterceptors, api } from "../services/api";
import toast from "react-hot-toast";

interface AuthContextType {
  user: LoginResponse["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const login = (data: LoginResponse) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    setupInterceptors(
      () => accessToken,
      async () => {
        if (!refreshToken) throw new Error("No refresh token");
        try {
          const res = await refreshTokenService(refreshToken);
          setAccessToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          setUser(res.user);
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
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
