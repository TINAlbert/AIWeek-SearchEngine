import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`pt-16 md:pt-0 transition-all duration-200 ${collapsed ? 'md:ml-20' : 'md:ml-56'}`}>
        <main className="relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
