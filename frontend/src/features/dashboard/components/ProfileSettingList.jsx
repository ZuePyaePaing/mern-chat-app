import React from "react";
import { Link } from "react-router-dom";

const ProfileSettingList = ({ onSelectLable, selectedLableId }) => {
  const settingLable = [
    {
      id: 1,
      name: "General",
      href:''
    },
    {
      id: 2,
      name: "Edit Profile",
      href:'edit-profile'
    },
    {
      id: 3,
      name: "Security",
      href:'security'
    },
    {
      id: 4,
      name: "Notifications",
      href:'notifications'
    },
    {
      id: 5,
      name: " Integrations",
      href:'integrations'
    },
  ];
  return (
    <div className="space-y-2 p-2">
      {settingLable.map((item) => (
        <Link to={`/messages/settings/${item.href}`}
          key={item.id}
          className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${
            selectedLableId === item.id ? "bg-gray-300" : "hover:bg-gray-400"
          }`}
          onClick={() => onSelectLable(item.id)}
        >
          {item.name}
        </Link>
      ))}
      <hr />
      <div className="flex items-center justify-between mt-2 ">
        <div className="flex items-center  px-3 py-2 border border-red-600 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white">
          Logout
        </div>
        <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 ">
          Delete Account
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingList;
