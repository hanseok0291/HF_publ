import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";

export const loginVerifyOptions = [
  { label: "이메일", value: AUTH_METHOD_ENUM.Values.SCD_AUTH_001 },
  { label: "휴대전화", value: AUTH_METHOD_ENUM.Values.SCD_AUTH_002 }
];

export const useAccountOptions = [
  { label: "사용", value: true },
  { label: "미사용", value: false }
];
