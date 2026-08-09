import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090B0D] text-white">

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}