import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", to: "/dashboard", icon: "🏠" },
  { label: "Contactos", to: "/contacts", icon: "📇" },
  { label: "Usuarios", to: "/users", icon: "👤" },
  { label: "Salir", to: "/logout", icon: "🚪" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop
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
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          >
            {collapsed ? 'AI' : 'AIWeek'}
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${location.pathname.startsWith(item.to) ? "bg-blue-100 text-blue-700" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`transition-all duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
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
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-blue-100 ${location.pathname.startsWith(item.to) ? "bg-blue-100 text-blue-700" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Padding for content */}
      <div className={`md:ml-${collapsed ? '20' : '56'} pt-16 md:pt-0 transition-all duration-200`} />
    </>
  );
}
