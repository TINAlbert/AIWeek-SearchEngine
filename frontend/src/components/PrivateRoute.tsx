import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { user } = useAuth();
  // Si no hay usuario autenticado, redirige a login
  if (!user) return <Navigate to="/login" replace />;
  // Si está autenticado, renderiza la ruta hija
  return <Outlet />;
}
