import { Outlet } from "react-router-dom";
import Aside from "./Aside";
const DashboardLayout = () => {
  return (
    <main className="h-screen flex">
      <div className="h-screen w-64  border-r dark:border-gray-700 bg-white dark:bg-gray-900">
        <Aside />
      </div>
      <div className="flex-grow h-full overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
