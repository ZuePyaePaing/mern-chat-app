import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useCookie from "react-use-cookie";
import useUserIdStore from "../../../stores/user";
import { useEffect, useState } from "react";import useMessageStore from "../../../stores/messsage";

export default function MessageUserList() {
  const [users, setUsers] = useState([]);
  const [token] = useCookie("my_token");
  const [user] = useCookie("my_user");

  const { setSelectedUserId, selectedUserId } = useUserIdStore();

  
  const parsedUser = user ? JSON.parse(user) : null;
  const senderId = parsedUser?._id;


  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { users: allUsers } = await response.json();
      const filteredUsers = allUsers?.filter(u => u._id !== senderId) || [];
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [senderId, token]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto scrollbar">
        <div className="space-y-2 p-2">

          {users.map((user) => (
            <Link
              to={`/messages/${user._id}`}
              key={user._id}
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${
                selectedUserId === user._id ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setSelectedUserId(user._id)}
            >
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.time}</p>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {user.lastMessage}
                </p>
              </div>
              {user.unreadCount && (
                <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {user.unreadCount}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}