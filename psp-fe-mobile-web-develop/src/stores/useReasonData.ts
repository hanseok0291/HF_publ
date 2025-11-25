import { create } from "zustand";
import { FileWithPreview } from "@/app/collector/(route)/collector-status/reason/[id]/_components/ReasonClient";

type ReasonDataType = {
  memo: string;
  files: FileWithPreview[];
  currentRequestId: string;
  setMemo: (value: string) => void;
  setFiles: (value: FileWithPreview[]) => void;
  setCurrentRequestId: (value: string) => void;
  reset: () => void;
};

const useReasonData = create<ReasonDataType>((set) => ({
  memo: "",
  files: [],
  currentRequestId: "",
  setMemo: (value: string) => set({ memo: value }),
  setFiles: (value: FileWithPreview[]) => set({ files: value }),
  setCurrentRequestId: (value: string) => set({ currentRequestId: value }),
  reset: () => set({ memo: "", files: [], currentRequestId: "" })
}));

export default useReasonData;
