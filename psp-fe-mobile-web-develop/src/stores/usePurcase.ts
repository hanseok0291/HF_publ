import { create } from "zustand";

type WasteStickerDataType = {
  id: string;
  stickerId?: string;
  trashBagId?: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  holdInventory: number;
  singlenessStandardYn: boolean;
  type?: "accordion" | "text";
};

type addStickers = {
  id: string;
  stickerId?: string;
  trashBagId?: string;
  purchaseQuantity: number;
};

export type StickerPurchase = {
  //전체  리스트
  dataList: WasteStickerDataType[];
  setDataList: (stickerList: WasteStickerDataType[]) => void;

  //선택한 스티커 리스트
  selectedList: WasteStickerDataType[];
  setSelectedList: (selectedList: WasteStickerDataType[]) => void;
  removeSticker: (id: string) => void;
  resetList: () => void;

  addStickers: addStickers[];
  setAddStickers: (addStickers: addStickers[]) => void;

  totalQuantity: number;
  setTotalQuantity: (newQuantity: number) => void;
  resetTotal: () => void;
};

const usePurcase = create<StickerPurchase>((set) => ({
  dataList: [],
  setDataList: (value) => set({ dataList: value }),

  selectedList: [],
  setSelectedList: (value) => set({ selectedList: value }),

  //스티커 제거
  removeSticker: (id) =>
    set((state) => ({
      selectedList: state.selectedList.filter((sticker) => sticker.id !== id),
      addStickers: state.addStickers.filter((sticker) => sticker.id !== id)
    })),

  resetList: () =>
    set(() => ({
      selectedList: []
    })),

  addStickers: [],
  setAddStickers: (value) => set({ addStickers: value }),

  totalQuantity: 0,
  setTotalQuantity: (newQuantity) =>
    set(() => ({
      totalQuantity: isNaN(newQuantity) ? 0 : newQuantity
    })),
  resetTotal: () =>
    set(() => ({
      totalQuantity: 0,
      selectedList: []
    }))
}));

export default usePurcase;
