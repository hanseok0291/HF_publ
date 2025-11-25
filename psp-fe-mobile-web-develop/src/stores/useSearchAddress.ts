import { SearchAddressType } from "@/types/collector/SearchAddress.type";
import { create } from "zustand";

const useSearchAddress = create<SearchAddressType>((set) => ({
  search: "",
  setSearch: (value: string) => set({ search: value })
}));

export default useSearchAddress;
