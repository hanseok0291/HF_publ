import { z } from "zod";

export const InputImageSchema = z.object({
  url: z.string().url(),
  altText: z.string()
});

export const FileSchema = z.custom<File>((value) => {
  return value instanceof File;
}, "파일을 선택해주세요");

// 파일 미리보기 스키마 추가
export const FileWithPreviewSchema = z.object({
  file: FileSchema,
  preview: z.string()
});

export const WasteRequestRejectedSchema = z.object({
  wasteId: z.string().nullable(),
  changeWasteId: z.string().nullable()
});

export const ReasonSchema = z.object({
  disposeRefusalReason: z.string().min(1, "내용을 입력해주세요"),
  additionPaymentYn: z.boolean(),
  wasteRequestRejectedReqDtoList: z.array(WasteRequestRejectedSchema),
  files: z
    .array(FileWithPreviewSchema)
    .max(10, "이미지는 최대 10개까지 업로드 가능합니다")
    .optional()
});

export type ReasonFormType = z.infer<typeof ReasonSchema>;
export type FileType = z.infer<typeof FileSchema>;
export type FileWithPreviewType = z.infer<typeof FileWithPreviewSchema>;
export type InputImageType = z.infer<typeof InputImageSchema>;
export type WasteRequestRejectedType = z.infer<
  typeof WasteRequestRejectedSchema
>;
