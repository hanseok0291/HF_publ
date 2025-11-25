"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TypeOf } from "zod";
import { COOKIE_ENUM } from "@/enums/Cookies.enum";

const SESSION_TIME = 15 * 60 * 1000; // 15분 (프로덕션 환경)

export async function setServerCookie(name: string, token: string) {
  const cookieStore = await cookies();

  try {
    // token이 유효한 문자열인지 확인
    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("Invalid token provided");
    }

    // accessToken 설정
    cookieStore.set(name, token, {
      maxAge: SESSION_TIME,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });

    // tokenCreationTime 설정
    cookieStore.set("tokenCreationTime", Date.now().toString(), {
      maxAge: SESSION_TIME,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getServerCookie(name: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : null;
}

export async function deleteServerCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function clearAllServerCookie() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}

export async function clearServerCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("X-Access-Token");
  cookieStore.delete("adminId");
  cookieStore.delete("localGovernmentId");
  cookieStore.delete("positionName");
  cookieStore.delete("userName");
  cookieStore.delete("tokenCreationTime");
  cookieStore.delete("address");
  cookieStore.delete("logoImage");
  cookieStore.delete("institutionId");
}
export async function deleteClientCookieInServer(
  response: NextResponse,
  cookieName: TypeOf<typeof COOKIE_ENUM>
) {
  response.cookies.set(cookieName, "", { path: "/", maxAge: 0 });
}
