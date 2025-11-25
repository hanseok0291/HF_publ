import { create } from "zustand";

type AddressCheckStore = {
  jibunAddr: string;
  zipNo: string;
  disposeLatitude: number;
  disposeLongitude: number;
  emdNm: string;
  setJibunAddr: (jibunAddr: string) => void;
  setZipNo: (zipNo: string) => void;
  setDisposeLatitude: (disposeLatitude: number) => void;
  setDisposeLongitude: (disposeLongitude: number) => void;
  setEmdNm: (emdNm: string) => void;
  resetAddress: () => void;
};

const useAddressCheck = create<AddressCheckStore>((set) => ({
  jibunAddr: "",
  setJibunAddr: (value) => set({ jibunAddr: value }),
  zipNo: "",
  setZipNo: (value) => set({ zipNo: value }),
  disposeLatitude: 0,
  setDisposeLatitude: (value) => set({ disposeLatitude: value }),
  disposeLongitude: 0,
  setDisposeLongitude: (value) => set({ disposeLongitude: value }),
  emdNm: "",
  setEmdNm: (value) => set({ emdNm: value }),
  resetAddress: () =>
    set({
      jibunAddr: "",
      zipNo: "",
      disposeLatitude: 0,
      disposeLongitude: 0,
      emdNm: ""
    })
}));

export default useAddressCheck;
