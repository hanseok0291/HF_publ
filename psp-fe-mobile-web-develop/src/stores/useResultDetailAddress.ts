import { ResultDetailAddressType } from "@/types/collector/collector-area/CollectorAreaDetailStore.type";
import { create } from "zustand";

const useResultDetailAddress = create<ResultDetailAddressType>((set) => ({
  bdName: "",
  jibunAddress: "",
  setBdName: (value: string) => set({ bdName: value }),
  setJibunAddress: (value: string) => set({ jibunAddress: value }),
  reset: () => set({ bdName: "", jibunAddress: "" })
}));

export default useResultDetailAddress;
