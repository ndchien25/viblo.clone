import Footer from "@/components/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const MinimalLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default MinimalLayout;