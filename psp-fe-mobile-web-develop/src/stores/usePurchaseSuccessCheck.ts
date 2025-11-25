import { create } from "zustand";

type PurchaseSuccessCheckType = {
  isSuccess: boolean;
  setSelection: () => void;
  clearSelection: () => void;
};

const useParchaseSuccessCheck = create<PurchaseSuccessCheckType>((set) => ({
  isSuccess: false,
  setSelection: () => set({ isSuccess: true }),
  clearSelection: () => set({ isSuccess: false })
}));

export default useParchaseSuccessCheck;
