import { z } from "zod";

const newPasswordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);
const easyToGuessPasswordRegex = new RegExp(
  /^(?:(\d{4,})|([a-z]{3,})|([A-Z]{3,})|([a-z]{4,})|([A-Z]{4,})|(.{1})\1+|((1234)|(abcd)|(password)|(qwerty)|(asdf)|(welcome))|(\d{4,}))$/
);

export const ChangePasswordSchema = z
  .object({
    password: z.string().trim().min(1, {
      message:
        "비밀번호는 문자와 숫자, 특수문자를 포함하여 8자리 이상 작성해 주세요."
    }),
    currentPassword: z
      .string()
      .trim()
      .regex(
        newPasswordRegex,
        "비밀번호는 문자와 숫자, 특수문자를 포함하여 8자리 이상 작성해 주세요."
      ),
    newPassword: z.string().trim().min(1, {
      message: "신규 비밀번호 확인에 동일한 비밀번호를 입력해 주세요."
    })
  })
  .refine((data) => data.newPassword !== data.password, {
    path: ["newPassword"],
    message: "최근 변경 비밀번호는 사용할 수 없습니다"
  })
  .refine((data) => data.newPassword === data.currentPassword, {
    path: ["currentPassword"],
    message: "신규 비밀번호 확인에 동일한 비밀번호를 입력해 주세요."
  });
// .refine((data) => easyToGuessPasswordRegex.test(data.newPassword), {
//   path: ["newPassword"],
//   message: "다른 비밀번호를 사용해 주세요."
// });
