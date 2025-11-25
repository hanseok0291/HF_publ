import { z } from "zod";

// 첫번째 단계
const paymentItemSchema = z.object({
  items: z.string(),
  count: z.string().optional(),
  charge: z.string(),
  notSelect: z.boolean().optional()
});

export const paymentValidationSchema = z.object({
  wasteId: z
    .string()
    .min(1, "추가 결제가 필요한 폐기 처리 대상을 지정해 주세요."),
  changeWasteId: z
    .string()
    .min(1, "변경되어야 하는 폐기물 품목을 선택해 주세요.")
});

// 폐기물 ID 선택 스키마
// export const paymentValidationSchema = z
//   .object({
//     wasteId: z.string(), // 첫 번째 단계에서는 wasteId만 필수
//     changeWasteId: z.string().optional() // 두 번째 단계에서 사용될 changeWasteId (선택적)
//   })
//   .refine(
//     (data) => {
//       console.log("WasteId value:", data.wasteId);
//       console.log("Condition result:", data.wasteId.length > 0);
//       return data.wasteId.length > 0;
//     },
//     {
//       path: ["wasteId"],
//       message: "폐기물을 선택해주세요."
//     }
//   );

// export const paymentSecondStepValidationSchema = z
//   .object({
//     wasteId: z.string(),
//     changeWasteId: z.string()
//   })
//   .refine(
//     (data) => {
//       return data.wasteId.length > 0 && data.changeWasteId.length > 0;
//     },
//     {
//       path: ["changeWasteId"],
//       message: "변경할 폐기물을 선택해주세요."
//     }
//   );
