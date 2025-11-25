import {
  deleteCookie as deleteCookie_lib,
  getCookie as getCookie_lib,
  type OptionsType,
  setCookie as setCookie_lib
} from "cookies-next/client";
import { z } from "zod";
import { COOKIE_ENUM } from "@/enums/Cookies.enum";

/** 정의된 쿠키 이름인지 확인한다. */
export function checkCOOKIE_ENUM(cookieName: string) {
  return COOKIE_ENUM.safeParse(cookieName).success;
}

export function getCookie(cookieName: z.infer<typeof COOKIE_ENUM>) {
  return getCookie_lib(cookieName);
}

export function setCookie(
  cookieName: z.infer<typeof COOKIE_ENUM>,
  value: any,
  options: OptionsType = {}
) {
  if (!checkCOOKIE_ENUM(cookieName)) {
    return;
  }
  const newCookieOptions: OptionsType = {
    ...options
    // sameSite: "none"
  };

  setCookie_lib(cookieName, value, newCookieOptions);
}

export function deleteCookie(cookieName: z.infer<typeof COOKIE_ENUM>) {
  deleteCookie_lib(cookieName);
}

export function clearCookie() {
  Object.values(COOKIE_ENUM.Enum).forEach((cookieName) => {
    deleteCookie(cookieName);
  });
}

export function setUserInfoCookie(value: Record<string, any>) {
  const existUserInfoCookie = JSON.parse(getCookie("INFO") ?? "{}");
  console.log("!", existUserInfoCookie);
  const existExpireDate = existUserInfoCookie
    ? existUserInfoCookie["expireDate"]
    : undefined;
  const newExpireDate = value["expireDate"];

  const cookieOption = {
    expires: !!newExpireDate
      ? new Date(newExpireDate)
      : !!existExpireDate
        ? new Date(existExpireDate)
        : undefined
  };

  const newCookieValue = {
    ...existUserInfoCookie,
    ...value
  };
  console.log(newCookieValue);

  setCookie("INFO", newCookieValue, cookieOption);
}
