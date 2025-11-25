import { z } from "zod";
import { PAY_METHOD_ENUM } from "@/enums/Common.enum";

export const DetailItemSchema = z.object({
  id: z.string().min(1),
  purchaseQuantity: z.number().min(1, { message: "수량을 입력해 주세요." })
});

export const ResultSchema = z.object({
  list: z.array(DetailItemSchema),
  paymentMethod: PAY_METHOD_ENUM
});

export const SecondStepFormSchema = z.object({
  stickerList: z.array(DetailItemSchema)
});
