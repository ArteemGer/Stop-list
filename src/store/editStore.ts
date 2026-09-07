import { StopReason } from "@/types/menuItem";
import { create } from "zustand";

interface EditStore {
  stockInput: string;
  reason: StopReason | null;

  setStockInput: (value: string) => void;
  setReason: (reason: StopReason) => void;

  reset: (stock: number) => void;
}

export const useEditStore = create<EditStore>((set) => ({
  stockInput: "0",
  reason: null,

  setStockInput: (value) => set({ stockInput: value }),
  setReason: (reason) => set({ reason }),

  reset: (stock) => set({ stockInput: String(stock), reason: null }),
}));
