import { create } from "zustand";

type FindUserInfoType = {
  response: { code: number | null; message: string; content: string };
  setInfo: (value: FindUserInfoType) => void;
  resetInfo: () => void;
};

export const useFindUserInfo = create<FindUserInfoType>((set) => ({
  response: { code: null, message: "", content: "" },
  setInfo: (userData: FindUserInfoType) =>
    set((state) => ({
      response: {
        ...state.response,
        ...userData
      }
    })),

  resetInfo: () =>
    set({
      response: { code: null, message: "", content: "" }
    })
}));
