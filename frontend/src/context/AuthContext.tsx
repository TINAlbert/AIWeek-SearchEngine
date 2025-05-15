import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken as refreshTokenService } from "../services/auth";
import { setupInterceptors, api } from "../services/api";
import toast from "react-hot-toast";
import { getUserProfile } from "../services/user";
import type { UserProfile } from "../types/user";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  loadingUser: boolean;
  login: (data: { token: string; refreshToken: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem("refreshToken"));
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();

  const login = async (data: { token: string; refreshToken: string }) => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setLoadingUser(true);
    setAccessToken(data.token);
    setRefreshToken(data.refreshToken);
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    try {
      const userProfile = await getUserProfile();
      setUser(userProfile);
      console.log("[LOGIN] Usuario actualizado:", userProfile);
    } catch {
      setUser(null);
      toast.error("No se pudo obtener el perfil de usuario.");
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setLoadingUser(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("[LOGOUT] Tokens eliminados de localStorage");
  };

  useEffect(() => {
    setLoadingUser(true);
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
          setUser(null);
          setLoadingUser(true);
          try {
            const userProfile = await getUserProfile();
            setUser(userProfile);
          } catch {
            setUser(null);
          } finally {
            setLoadingUser(false);
          }
        } catch (e: unknown) {
          toast.error("Sesión expirada. Por favor, inicia sesión de nuevo.");
          logout();
          navigate("/login", { replace: true });
          throw e;
        }
      }
    );
    setUser(null);
    setLoadingUser(true);
    (async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, [accessToken, refreshToken, navigate]);

  if (loadingUser) {
    return <div className="w-full h-screen flex items-center justify-center text-lg text-gray-500">Cargando usuario...</div>;
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, loadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
