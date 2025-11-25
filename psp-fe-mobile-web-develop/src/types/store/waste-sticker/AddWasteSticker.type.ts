import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { WasteStickerDataType } from "@/components/table-columns/stores/waste-sticker/WasteStickerColumns";
import {
  SecondStepFormTrashSchema,
  TrashSchema
} from "@/schema/store/purchase/AddTrashBag.schema";
import {
  ResultSchema,
  SecondStepFormSchema
} from "@/schema/store/purchase/AddWasteSticker.schema";

// 폼 전체의 타입 정의
export type SecondStepFormValues = z.infer<typeof SecondStepFormSchema>;
export type ResultFormValues = z.infer<typeof ResultSchema>;

export type SecondStepTrashFormValues = z.infer<
  typeof SecondStepFormTrashSchema
>;
export type ResultTrashFormValues = z.infer<typeof TrashSchema>;

// 품목 추가 컨테이너 컴포넌트 타입
export type AddDetailItemContainerType<T extends FieldValues> = {
  data?: WasteStickerDataType;
  register: UseFormRegister<T>;
  index: number;
  isDelete?: boolean;
  setValue?: any;
};

//결제 유형
export type PaymentMethodType = {
  paymentMethodId: string;
  paymentMethodName: string;
};

// 결제 방식 라디오 그룹 타입
export type PaymentRadioType = {
  // control: Control<ResultFormValues | ResultTrashFormValues>;
  control: Control<any>;
  paymentMethodList: PaymentMethodType[];
};
