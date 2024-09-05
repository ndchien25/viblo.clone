import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import MainHeader from "@/components/MainHeader";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <Banner />
      <div className="flex-auto">
        <Navbar />
        <div className="text-white text-center font-bold text-xl mb-2 leading-5 py-4 h-12 bg-gradient-to-r from-sky-500 to-indigo-500">
          <Link className="hover:underline" to="https://facebook.com">
            {`>> Tham gia Facebook group "Viblo Community" để cùng nhau học tập và kết nối <<`}
          </Link>
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
