import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { accessToken } = useAuth();
  // Si no hay token, redirige a login
  if (!accessToken) return <Navigate to="/login" replace />;
  // Si está autenticado, renderiza la ruta hija
  return <Outlet />;
}
