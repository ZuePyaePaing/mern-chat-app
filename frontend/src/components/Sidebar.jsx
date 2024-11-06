import React from "react";
import { Link } from "react-router-dom";
import {
  BadgeJapaneseYen,
  Calendar1,
  Factory,
  Folder,
  MessageCircleMore,
  Save,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className=" flex xl:w-[300px] lg:w-[200px] md:w-[100px] sm:w-[200px] w-[50px]  h-screen bg-black p-4">
      <div className=" h-screen w-[80px] flex flex-col items-center justify-between gap-y-4 text-white">
        <div className=" flex flex-col gap-y-4">
          <Link to="/">
            <div className="flex flex-col items-center">
              <BadgeJapaneseYen />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center">
              <MessageCircleMore />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center ">
              <Folder />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex flex-col items-center">
              <Calendar1 />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center">
              <Factory />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center">
              <Save />
              <p className="text-white text-sm">Balance</p>
            </div>
          </Link>
        </div>
        <Link to="/">
          <div className="flex flex-col items-center mb-6 text-white ">
            <Settings />
            <p className="text-white text-sm">Setting</p>
          </div>
        </Link>
      </div>
      <div className=" w-full h-screen"></div>
    </aside>
  );
};

export default Sidebar;
