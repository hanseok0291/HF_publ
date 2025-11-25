import { TypeOf, z } from "zod";

export const PARAM_ERROR = "error";
export const PARAM_MESSAGE = "message";

/** 에러 타입 */
export const ERROR_TYPE_ENUM = z.enum([
  "ACCESS_DENIED", // 접근 거부
  "ETC" // 정의되지 않은 기타 에러
]);

export const ERROR_TYPE: Record<TypeOf<typeof ERROR_TYPE_ENUM>, string> = {
  ACCESS_DENIED: "접근 권한이 만료되었습니다. 다시 로그인해 주세요.",
  ETC: "일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요."
} as const;
