import { z } from "zod";

export const ContactAnswerSchema = z.object({
  contents: z.string().min(1, { message: "최소 한 글자는 입력해야 합니다." })
});
