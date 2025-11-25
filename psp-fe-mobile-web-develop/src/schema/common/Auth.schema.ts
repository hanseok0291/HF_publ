import { Control, UseControllerProps } from "react-hook-form";
import { z } from "zod";

// 로그인 zod Schema
export const LoginSchema = z.object({
  loginId: z
    .string()
    .min(1, { message: "아이디를 입력해 주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자리여야 합니다." })
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message: "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다."
  //   }
  // )
});

// 사용자 계정 찾기 zod Schema
export const FindInfoSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  cellPhoneNumber: z
    .string()
    .min(1, { message: "전화번호는 최소한 13자리여야 합니다." })
});

// 휴대폰 및 이메일 인증 번호 zod Schema
const phoneVerifySchema = z.object({
  adminId: z.string(),
  verificationCode: z.string().min(1, { message: "인증번호를 입력해주세요." })
});

export type LoginValues = z.infer<typeof LoginSchema>;
export type FindInfoValues = z.infer<typeof FindInfoSchema>;
export type PhoneVerifyValues = z.infer<typeof phoneVerifySchema>;
export type VerifyInputProps = UseControllerProps<PhoneVerifyValues> & {
  control: Control<PhoneVerifyValues>;
};
