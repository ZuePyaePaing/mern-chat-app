import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useMessageStore;
