import { AllMainMenuType } from "@/types/apiType/Common.type";
import { create } from "zustand";

export type MenuList = {
  // 전체 메뉴  리스트
  menuList: AllMainMenuType[];
  setMenuList: (menuList: AllMainMenuType[]) => void;
};

const useMenuList = create<MenuList>((set) => ({
  menuList: [],
  setMenuList: (value) => set({ menuList: value })
}));

export default useMenuList;
