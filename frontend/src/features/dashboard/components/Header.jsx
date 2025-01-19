import React from "react";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 shadow">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-gray-500 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full bg-gray-100 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center">
        <button className="mr-4 text-gray-500 hover:text-gray-700">
          <Bell className="h-6 w-6" />
        </button>
        <img
          src="/placeholder.svg?height=32&width=32"
          alt="User avatar"
          className="h-8 w-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
