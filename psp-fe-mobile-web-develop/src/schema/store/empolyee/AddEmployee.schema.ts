import { z } from "zod";
import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";

const phoneRegex = new RegExp(/^(010)-?([0-9]{3,4})-?([0-9]{4})$/);
const telephoneRegex = new RegExp(/^(02|031)-?([0-9]{3,4})-?([0-9]{4})$/);

export const AddEmployeeSchema = z.object({
  name: z.string().trim().nonempty({ message: "이름을 입력해 주세요." }),
  email: z
    .string({ message: "이메일을 입력해 주세요." })
    .email({ message: "이메일 형식이 아닙니다." }),
  // password: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "비밀번호 형식이 아닙니다." })
  //   .nullable(),
  // password: z.string().optional(),
  secondAuthKindCode: AUTH_METHOD_ENUM,
  useYn: z.boolean({ message: "계정 사용 여부를 선택해 주세요." }),
  telePhoneNumber: z
    .string()
    .regex(telephoneRegex, { message: "유선 전화번호 형식이 아닙니다." })
    .optional(),
  cellPhoneNumber: z
    .string({ message: "담당자 휴대전화 번호를 입력해 주세요." })
    .regex(phoneRegex, { message: "휴대 전화번호 형식이 아닙니다." }),
  authorityGroupId: z.string({ message: "담당자의 관리 권한을 선택해 주세요." })
});

export const EditEmployeeSchema = z.object({
  keyManId: z.string(),
  authorityGroupId: z.string().nullable(),
  secondAuthKindCode: AUTH_METHOD_ENUM,
  useYn: z.boolean({ message: "계정 사용 여부를 선택해 주세요." }),
  telePhoneNumber: z
    .string()
    .regex(telephoneRegex, { message: "유선 전화번호 형식이 아닙니다." })
    .nullable(),
  cellPhoneNumber: z.string()
});
