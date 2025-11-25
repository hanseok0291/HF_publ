import { z } from "zod";

export const COOKIE_ENUM = z.enum([
  "X-Access-Token",
  "X-Refresh-Token",
  "ROLE",
  "INFO",
  // ExpiredPassword. 만료된 비밀번호 또는 임시 비밀번호를 사용한 로그인인지의 여부
  "EP"
]);
