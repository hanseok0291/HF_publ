import { ResultAddressType } from "@/types/collector/collector-area/CollectorAreaDetailStore.type";
import { create } from "zustand";

const useResultAddress = create<ResultAddressType>((set) => ({
  resultAddress: "",
  setResultAddress: (value: string) => set({ resultAddress: value }),
  reset: () => set({ resultAddress: "" })
}));

export default useResultAddress;
