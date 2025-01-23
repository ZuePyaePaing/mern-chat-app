import { useState } from "react";

import MessageUserList from "./MessageListPage";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <section className="flex flex-1 flex-col overflow-hidden">
      <div className="flex h-screen bg-gray-900 text-gray-100">
        <div className="w-full sm:w-1/3 lg:w-1/4 border-r border-gray-700">
          <MessageUserList />
        </div>
        <div className="hidden sm:block sm:w-2/3 lg:w-3/4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
