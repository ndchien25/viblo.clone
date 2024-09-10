import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import { Toaster } from "@/components/ui/toaster";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
