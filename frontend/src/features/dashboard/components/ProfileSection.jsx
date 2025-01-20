import useCookie from "react-use-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { removeCookie } from "react-use-cookie";
import ProfileSettingList from "./ProfileSettingList";
import { useState } from "react";
import DarkMode from "../../../components/DarkMode";
const ProfileSection = () => {
  const [user, setUser] = useCookie("my_user");
  const [selectedLableId, setSelectedLableId] = useState(1);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("my_token");
    removeCookie("my_user");
    navigate("/login");
  };
  const userData = JSON.parse(user);
  return (
    <div className=" w-[90%] mx-auto h-full p-4">
      <div className=" flex justify-between items-center">
        <div className=" flex items-end gap-x-4">
          <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-green-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className=" text-2xl font-bold dark:text-white text-black capitalize">
              {userData.name}
            </h2>
            <p className=" capitalize">my account</p>
          </div>
        </div>
        <DarkMode />
      </div>
      <div className=" flex gap-x-4">
        <div className=" w-64 h-screen ">
          <ProfileSettingList
            selectedLableId={selectedLableId}
            onSelectLable={setSelectedLableId}
          />
        </div>
        <div className="flex-grow h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
