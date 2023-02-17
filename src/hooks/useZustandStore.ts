import { create } from "zustand";

interface StoreState {
  messageScroll: number;
  updateMessageScroll: (newAmount: number) => void;
}

export const useZustandStore = create<StoreState>((set) => ({
  messageScroll: 0,
  updateMessageScroll: (newAmount: number) => set({ messageScroll: newAmount }),
}));
