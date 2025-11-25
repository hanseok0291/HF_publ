import { DrawerSelectType } from "@/types/store/stores/DrawerSelect.type";
import { create } from "zustand";

const useDrawerSelect = create<DrawerSelectType>((set) => ({
  // 기존 속성들
  selectedPayment: "",
  selectedPaymentStatus: "",
  selectedReceiptStatus: "",
  selectedReceiptType: "",
  selectedSearchFilter: "",
  selectedAdminPower: "",

  // BasicDrawerGroup의 속성들 추가
  selectedLegalEmdNm: "",
  selectedWasteTopMenu: "",
  selectedCollectorStatus: "",
  selectedWasteMiddleMenu: "",

  // 기존 setter 함수들
  setSelectedPayment: (value: string) => set({ selectedPayment: value }),
  setSelectedPaymentStatus: (value: string) =>
    set({ selectedPaymentStatus: value }),
  setSelectedReceiptStatus: (value: string) =>
    set({ selectedReceiptStatus: value }),
  setSelectedReceiptType: (value: string) =>
    set({ selectedReceiptType: value }),
  setSelectedSearchFilter: (value: string) =>
    set({ selectedSearchFilter: value }),
  setSelectedAdminPower: (value: string) => set({ selectedAdminPower: value }),

  // BasicDrawerGroup의 setter 함수들 추가
  setSelectedLegalEmdNm: (value: string) => set({ selectedLegalEmdNm: value }),
  setSelectedWasteTopMenu: (value: string) =>
    set({ selectedWasteTopMenu: value }),
  setSelectedCollectorStatus: (value: string) =>
    set({ selectedCollectorStatus: value }),
  setSelectedWasteMiddleMenu: (value: string) =>
    set({ selectedWasteMiddleMenu: value })
}));

export default useDrawerSelect;
