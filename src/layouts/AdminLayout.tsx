import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
const AdminLayout: React.FC = () => {
  return (
    <div className="flex bg-[#f0f0f7]">
      <aside className="flex min-h-screen">
        <SideBar />
      </aside>
      <div className="flex flex-col flex-1">
        <Header />
        <Outlet />
      </div>
      
    </div>
  );
};

export default AdminLayout;
