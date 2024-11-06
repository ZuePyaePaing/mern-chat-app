import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <Outlet />
     
    </main>
  );
};

export default Layout;
