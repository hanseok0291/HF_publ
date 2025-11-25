import { z } from "zod";

/** 사용자 권한 코드 */
export const ROLE_ENUM = z.enum(
  [
    "ROLE_ISTT", // 주민센터/수거업체
    "ROLE_STORE" // 판매소
  ],
  { required_error: "소속구분은 필수 선택 항목입니다." }
);
