import { create } from "zustand";

const useUserIdStore = create((set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) => set({ selectedUserId }),
}));

export default useUserIdStore;
