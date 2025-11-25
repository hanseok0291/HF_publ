import { WasteMenuItem } from "@/types/apiType/Common.type";
import { Control, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { paymentValidationSchema } from "../../../../schema/collector/collector-status/AddPayment.schema";

export type PaymentValidationType = z.infer<typeof paymentValidationSchema>;
export type AddPaymentFirstStepType = {
  control: Control<PaymentValidationType>;
  errors: FieldErrors<PaymentValidationType>;
};

export type WasteAllMenuType = {
  code: number;
  message: string;
  content: WasteMenuItem[];
};
