import { TypeOf } from "zod";
import { PAY_METHOD_ENUM, PAY_STATUS_ENUM } from "@/enums/Common.enum";
import {
  RECEIPT_ENUM,
  STORE_DELIVERY_FILTER_ENUM
} from "@/enums/WasteSticker.enum";

export type WasteStickerListType = {
  searchStartDate: string;
  searchEndDate: string;
  paymentMethod: string;
  paymentStatus: string;
  receiptYn: string;
  receiptTypeCode: string;
  searchFilter: string;
  keyWord: string;
};

export type PurchasesSearchImplType = {
  searchStartDate: string;
  searchEndDate: string;
  receiptYn: boolean;
  receiptTypeCode: TypeOf<typeof RECEIPT_ENUM>;
  searchFilter: TypeOf<typeof STORE_DELIVERY_FILTER_ENUM>;
  keyWord: string;
  paymentMethod: TypeOf<typeof PAY_METHOD_ENUM>;
  paymentStatus: TypeOf<typeof PAY_STATUS_ENUM>;
};

// 스티커 구매 내역
export type StickerListType = {
  topStickerName: string;
  middleStickerName: string;
  stickerName: string;
  deliveryQuantity: number;
  fee: number;
};

export type PaymentType = {
  paymentId: string;
  paymentStatusCodeName: string | null;
  paymentMethodCodeName: string;
  paymentStatusCode: TypeOf<typeof PAY_STATUS_ENUM>;
  paymentMethodCode: string;
  // 카드사
  meanNm: string;
  // 승인 일시
  trdDtm: string | null;
  // 취소일시
  cancelDtm: string | null;
  // 수납여부
  paymentYn: boolean;
  // 결제금액
  trdAmt: number;
  settlerName: string | null;
  settlerCellPhoneNumber: string | null;
  // 가상 계좌 번호?
  paymentInfo: string | null;
  pmtPrdNm: string;
  cancelList: {
    // 승인일시
    trdDtm: string;
    // 취소 및 환불 금액
    cnclAmt: string;
    name: string;
    // 환불 사유
    cnclRsn: string;
  }[];
};

export type WasteStickerDetailResponseType = {
  stickerDeliveryId: string;
  localGovernmentName: string;
  name: string;
  email: string;
  telePhoneNumber: string;
  cellPhoneNumber: string;
  receiptTypeCodeName: string;
  receiptYn: boolean;
  stickerList: StickerListType[];
  payment: PaymentType[];
};

export type PaymentResponseType = {
  payment: PaymentType[];
  wasteListData: any;
};
