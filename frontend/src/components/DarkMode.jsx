import React from "react";
import { useTheme } from "../hook/useTheme";
import { Sun, Moon } from "lucide-react";
const DarkMode = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        className="  bg-black text-white dark:text-black dark:bg-white  p-2 rounded-md shadow-md hover:dark:bg-gray-100 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Sun className=" size-6" />
        ) : (
          <Moon className=" size-6" />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
