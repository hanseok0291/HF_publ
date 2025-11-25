import { PaymentType } from "../waste-sticker/WasteSticker.type";

export type TrashBagDetailResponseType = {
  trashBagDeliveryId: string;
  localGovernmentName: string;
  name: string;
  email: string;
  telePhoneNumber: string;
  cellPhoneNumber: string;
  receiptTypeCodeName: string;
  receiptYn: boolean;
  trashBagList: TrashBagListType[];
  payment: PaymentType[];
};

export type PaymentResponseType = {
  payment: {
    paymentId: string;
    paymentStatusCodeName: string | null;
    paymentMethodCodeName: string;
    // 카드사
    meanNm: string;
    // 승인 일시
    trdDtm: string;
    // 취소일시
    cancelDtm: string | null;
    // 수납여부부
    paymentYn: boolean;
    // 결제금액
    trdAmt: number;
    settlerName: string | null;
    settlerCellPhoneNumber: string | null;
    vtlAcntNo: string | null;
    trdNo: string;
    cancelAmt: number;
    cancelableAmt: string | null;
    previousPaymentItemList: string | null;
    paymentItemList: string | null;
  };
};

// 종량제 봉투 구매 내역
export type TrashBagListType = {
  topTrashBagName: string;
  trashBagName: string;
  deliveryQuantity: number;
  fee: number;
};
