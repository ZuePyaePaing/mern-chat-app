import useCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "react-use-cookie";

const ProfileSection = () => {
  const [user, setUser] = useCookie("my_user");
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("my_token");
    removeCookie("my_user");
    navigate("/login");
  };
  const userData = JSON.parse(user);
  return (
    <div>
      ProfileSection
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <img src={userData.avatar} alt="user image" />
      </div>
      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileSection;
