import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#171817] dark:bg-[#101112] dark:text-[#f1f1ed]">

      <Navbar />

      <Sidebar />

      <main className="pt-[68px] lg:pl-[230px]">

        <div className="mx-auto min-h-[calc(100vh-68px)] max-w-[1700px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

          <Outlet />

        </div>

      </main>

    </div>
  );
}

export default MainLayout;