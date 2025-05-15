import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, BookUser, User } from "lucide-react";

const mainMenuItems = [
  { label: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
  { label: "Contactos", to: "/contacts", icon: <BookUser className="w-5 h-5" /> },
];
const profileMenuItem = { label: "Perfil", to: "/profile", icon: <User className="w-5 h-5" /> };

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [open, setOpen] = useState(false); // mobile
  const location = useLocation();

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
        <div className="mt-auto p-4 pb-6">
          {(() => {
            const isActive = location.pathname.startsWith(profileMenuItem.to);
            return (
              <Link
                to={profileMenuItem.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
              >
                <span className="text-lg">{profileMenuItem.icon}</span>
                <span className={`transition-all duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>{profileMenuItem.label}</span>
              </Link>
            );
          })()}
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
        <div className="mt-auto p-4 pb-6">
          {(() => {
            const isActive = location.pathname.startsWith(profileMenuItem.to);
            return (
              <Link
                to={profileMenuItem.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${isActive ? "bg-blue-100 text-blue-700" : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">{profileMenuItem.icon}</span>
                {profileMenuItem.label}
              </Link>
            );
          })()}
        </div>
      </aside>
      {/* Padding for content */}
      <div className={`md:ml-${collapsed ? '20' : '56'} pt-16 md:pt-0 transition-all duration-200`} />
    </>
  );
}
