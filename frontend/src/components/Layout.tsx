import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [collapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} />
      <div className={
        `transition-all duration-200 ${collapsed ? 'md:ml-20' : 'md:ml-56'} ` +
        'pt-4 md:pt-0'
      }>
        <main className="relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
