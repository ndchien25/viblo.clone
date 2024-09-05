import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "@/components/MainHeader";

const MinimalLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MinimalLayout;