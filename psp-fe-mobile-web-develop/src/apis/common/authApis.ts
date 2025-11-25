import { VerificationLoginType } from "@/types/apiType/Common.type";
import { ApiFunction } from "@/types/HttpClient.type";
import { postRequest } from "@/lib/httpClients";

export const requestFirstLogin: ApiFunction<
  { loginId: string; password: string },
  {
    adminId: string;
    secondAuthType: string;
    secondAuthValue: string;
    expiredDate: string;
  }
> = (params) => postRequest({ url: `/v1/login`, params });

export const verificationLogin: ApiFunction<
  { adminId: string; verificationCode: string; osType: string },
  VerificationLoginType
> = (params) => postRequest({ url: `/v1/login/verification`, params });

// 임시 비밀번호
export const temporaryPasswordLogin: ApiFunction<
  { adminId: string },
  boolean
> = (params) => postRequest({ url: `/v1/temporary-password`, params });

// 계정 찾기기
export const findUserInfo: ApiFunction<
  { name: string; cellPhoneNumber: string },
  {}
> = (params) => postRequest({ url: `/v1/find-account`, params });

export const sendGuestCode: ApiFunction<
  { name: string; cellPhoneNumber: string; localGovernmentId: string },
  {}
> = (params) =>
  postRequest({
    url: `/v1/guest/send-code`,
    params
  });

export const sendCode: ApiFunction<{ adminId: string }, number> = (params) =>
  postRequest({ url: `/v1/login/code-send`, params });

export const tokenRefresh: ApiFunction<
  { refreshToken: string },
  VerificationLoginType
> = (params) =>
  postRequest({
    url: `/v1/refresh-token`,
    params
  });
