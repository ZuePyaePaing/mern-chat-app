import React, { useState } from 'react';
import { Menu, X, Home, User, Settings, HelpCircle } from 'lucide-react';

const ResponsiveLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const NavItem = ({ icon: Icon, text }) => (
    <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </a>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">My App</h1>
        <nav className="space-y-2">
          <NavItem icon={Home} text="Home" />
          <NavItem icon={User} text="Profile" />
          <NavItem icon={Settings} text="Settings" />
          <NavItem icon={HelpCircle} text="Help" />
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden">
          <div className="flex flex-col w-64 h-full bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My App</h1>
              <button onClick={toggleSidebar} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2">
              <NavItem icon={Home} text="Home" />
              <NavItem icon={User} text="Profile" />
              <NavItem icon={Settings} text="Settings" />
              <NavItem icon={HelpCircle} text="Help" />
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <header className="bg-gray-800 text-white p-4 md:hidden">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My App</h1>
            <button onClick={toggleSidebar} className="text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Homepage</h2>
          <p className="mb-4">This is a responsive layout with a sidebar and main content area.</p>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Featured Content</h3>
            <p>Here you can add your main page content, widgets, or any other elements you'd like to display.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
