import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "@/components/MainHeader";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <Outlet />
    </div>
  );
};

export default RootLayout;
