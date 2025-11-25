import { z } from "zod";

export const DetailTrashSchema = z.object({
  id: z.string().min(1),
  purchaseQuantity: z.number().min(1, { message: "수량을 입력해 주세요." })
});

export const TrashSchema = z.object({
  trashBagList: z.array(DetailTrashSchema),
  paymentMethod: z.enum(
    ["PMT_MEAN_001", "PMT_MEAN_002", "PMT_MEAN_003", "PMT_MEAN_004"],
    {
      required_error: "You need to select a notification type."
    }
  )
});

export const SecondStepFormTrashSchema = z.object({
  trashBagList: z.array(DetailTrashSchema)
});
