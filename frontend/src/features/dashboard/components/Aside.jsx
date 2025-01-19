import { Link, Outlet } from "react-router-dom";
import {
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";
import { useState } from "react";

const Aside = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-[80%]"
      } fixed inset-y-0 left-0 h-full z-50 w-64 bg-gray-800 text-white transition duration-300 ease-in-out lg:static lg:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <span className="text-2xl font-semibold">MERN Chat</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <X className="h-6 w-6 lg:hidden" />
        </button>
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 lg:hidden "
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
      </div>
      <nav className="mt-8">
        <Link
          to={"/dashboard/messages"}
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <BarChart3 className="mr-3 h-6 w-6" />
          All Chat
        </Link>
        <Link
          to={"/dashboard/messages-group"}
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <Users className="mr-3 h-6 w-6" />
         Group
        </Link>
        <Link
          to={"/dashboard/settings"}
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="mr-3 h-6 w-6" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Aside;
