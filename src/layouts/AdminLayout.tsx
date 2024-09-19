import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SideBar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AdminLayout;
