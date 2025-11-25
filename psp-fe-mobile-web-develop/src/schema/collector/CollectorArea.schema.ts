import { z } from "zod";
import { FileSchema } from "./reason/Reason.schema";

export const CollectorAreaSchema = z.object({
  content: z.string().min(1, "내용을 입력해주세요"),
  files: z
    .array(FileSchema)
    .max(10, "이미지는 최대 10개까지 업로드 가능합니다")
    .optional()
});
export type CollectorAreaFormType = z.infer<typeof CollectorAreaSchema>;
