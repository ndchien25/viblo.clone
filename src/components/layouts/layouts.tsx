import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import MainHeader from "./mainHeader";
import Navbar from "./Navbar";


const layout: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-auto">
        <Navbar />
      </div>
      <Outlet />
      < Toaster />
    </div >
  )
}

export default layout;