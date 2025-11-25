import { create } from "zustand";

type OpenAccordionState = {
  openMenus: Set<string>;
  toggleMenu: (menuName: string) => void;
};

export const useOpenAccordion = create<OpenAccordionState>((set) => ({
  openMenus: new Set(),
  toggleMenu: (menuName) =>
    set((state) => {
      const newOpenMenus = new Set(state.openMenus);
      if (newOpenMenus.has(menuName)) {
        newOpenMenus.delete(menuName);
      } else {
        newOpenMenus.add(menuName);
      }
      return { openMenus: newOpenMenus };
    })
}));
