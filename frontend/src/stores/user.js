import { create } from "zustand";

const useUserIdStore = create((set) => ({
  selectedUser: null,
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) => set({ selectedUserId }),
  fetchUser: async (userId) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("my_token="))
      ?.split("=")[1];

    const response = await fetch(
      `http://localhost:5000/api/v1/auth/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { user } = await response.json();
    set({ selectedUser: user });
  },
}));

export default useUserIdStore;
