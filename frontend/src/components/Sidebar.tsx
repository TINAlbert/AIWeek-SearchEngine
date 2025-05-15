import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, BookUser, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import avatarPlaceholder from '/avatar-placeholder.png';

const AVATAR_PLACEHOLDER = avatarPlaceholder;

const mainMenuItems = [
  { label: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
  { label: "Contactos", to: "/contacts", icon: <BookUser className="w-5 h-5" /> },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [open, setOpen] = useState(false); // mobile
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  let avatarUrl = AVATAR_PLACEHOLDER;
  // Solo usar la URL del backend si hay avatarFileName
  if (user && user.avatarFileName) {
    avatarUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/users/me/avatar?${user.updatedAt}`;
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile navbar */}
      <nav className="md:hidden flex items-center justify-between bg-white shadow px-4 py-2 fixed top-0 left-0 right-0 z-20">
        <button
          className="text-2xl focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <span className="font-bold text-blue-600 text-lg">AIWeek</span>
      </nav>
      {/* Sidebar (desktop) */}
      <aside
        className={`hidden md:flex flex-col bg-white shadow-lg h-screen fixed top-0 left-0 z-10 transition-all duration-200 ${collapsed ? 'w-20' : 'w-56'}`}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b">
          <button
            className={`font-bold text-blue-600 text-xl transition-all duration-200 flex items-center focus:outline-none select-none ${collapsed ? 'w-10 justify-center' : 'w-auto justify-center'}`}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          >
            {collapsed ? 'AI' : 'AIWeek'}
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          {mainMenuItems.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to) && item.to !== "/";
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`transition-all duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 pb-6 flex flex-col items-start gap-2">
          {user && (
            collapsed ? (
              <div className="flex flex-col items-center w-full">
                <Link to="/profile">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow bg-gray-100 mx-auto hover:ring-2 hover:ring-blue-400 transition"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 p-2 rounded-full hover:bg-red-100 text-red-600 transition self-center"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center w-full gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 flex-1 group min-w-0"
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow bg-gray-100 group-hover:ring-2 group-hover:ring-blue-400 transition"
                  />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-semibold text-gray-800 truncate max-w-[120px] group-hover:text-blue-700">{user.firstName} {user.lastName}</span>
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )
          )}
        </div>
      </aside>
      {/* Drawer (mobile) */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <span className="font-bold text-blue-600 text-xl">AIWeek</span>
          <button className="text-2xl" onClick={() => setOpen(false)} aria-label="Cerrar menú">×</button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          {mainMenuItems.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to) && item.to !== "/";
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4 pb-6 flex flex-col items-start gap-2">
          {user && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 w-full group justify-start"
                onClick={() => setOpen(false)}
              >
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow bg-gray-100 group-hover:ring-2 group-hover:ring-blue-400 transition"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate max-w-[120px] group-hover:text-blue-700">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</span>
                </div>
              </Link>
              <button
                onClick={() => { setOpen(false); handleLogout(); }}
                className="mt-2 p-2 rounded-full hover:bg-red-100 text-red-600 transition self-start"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </aside>
      {/* Padding for content */}
      <div className={`md:ml-${collapsed ? '20' : '56'} pt-16 md:pt-0 transition-all duration-200`} />
    </>
  );
}
