import { create } from "zustand";

type AddPaymentStoreType = {
  firstItemFee: number;
  firstItemQuantity: number;
  secondItemFee: number;
  secondItemQuantity: number;
  secondeItemName: string;
  // 수거불가에서 사용자가 전에 선택한 폐기물물
  originItemName: string;
  originItemFee: number;
  originWasteId: string;
  setFirstItemFee: (value: number) => void;
  setFirstItemQuantity: (value: number) => void;
  setSecondItemFee: (value: number) => void;
  setSecondItemQuantity: (value: number) => void;
  setSecondeItemName: (value: string) => void;
  // 수거불가에서 사용자가 전에 선택한 폐기물물
  setOriginItemName: (value: string) => void;
  setOriginItemFee: (value: number) => void;
  setOriginWasteId: (value: string) => void;

  reset: () => void;
};

const useAddPayment = create<AddPaymentStoreType>((set, get) => ({
  firstItemFee: 0,
  firstItemQuantity: 0,
  secondItemFee: 0,
  secondItemQuantity: 0,
  secondeItemName: "",
  originItemFee: 0,
  originItemName: "",
  originWasteId: "",

  setFirstItemFee: (value: number) => {
    set({ firstItemFee: value });
    return get().firstItemFee; // Return the updated value
  },
  setFirstItemQuantity: (value: number) => {
    set({ firstItemQuantity: value });
    return get().firstItemQuantity;
  },
  setSecondItemFee: (value: number) => set({ secondItemFee: value }),
  setSecondItemQuantity: (value: number) => set({ secondItemQuantity: value }),
  setSecondeItemName: (value: string) => set({ secondeItemName: value }),
  setOriginItemName: (value: string) => set({ originItemName: value }),
  setOriginItemFee: (value: number) => set({ originItemFee: value }),
  setOriginWasteId: (value: string) => set({ originWasteId: value }),
  reset: () =>
    set({
      firstItemFee: 0,
      secondeItemName: "",
      secondItemFee: 0,
      firstItemQuantity: 0,
      secondItemQuantity: 0
    })
}));

export default useAddPayment;
