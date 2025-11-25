import { ExtractContent } from "@/types/HttpClient.type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { requestFirstLogin } from "@/apis/common/authApis";

type UserType = Partial<
  ExtractContent<typeof requestFirstLogin> & {
    secondAuthType: string;
    nextStep: "prev" | "otp";
    // 비밀번호 찾기 계정 정보
    content: any;
  }
>;

type SaveUserInfoType = {
  user: UserType;
  setUser: (user: SaveUserInfoType["user"]) => void;
  resetUser: () => void;
};

export const useSaveUserInfo = create<SaveUserInfoType>()(
  persist(
    (set) => ({
      user: {
        adminId: undefined,
        expiredDate: undefined,
        secondAuthType: undefined,
        secondAuthValue: undefined,
        nextStep: undefined,
        content: undefined,
        positionName: undefined
      },
      setUser: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            ...user
          }
        })),
      resetUser: () =>
        set(() => ({
          user: {
            adminId: undefined,
            expiredDate: undefined,
            nextStep: undefined,
            secondAuthType: undefined,
            secondAuthValue: undefined,
            content: undefined,
            positionName: undefined
          }
        }))
    }),
    {
      name: "saveUserInfo",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
