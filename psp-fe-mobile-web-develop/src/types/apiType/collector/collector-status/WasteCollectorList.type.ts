import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";

export type WasteCollectorListType = {
  requestId: string;
  disposeNumber: string;
  requestName: string;
  requestNumber: string;
  disposeStatus: TypeOf<typeof COLLECT_STATUS_ENUM>;
  representWasteName: string;
  wasteKindQuantity: number;
  totalQuantity: number;
  disposeAddress: string;
  disposeDetailAddress: string;
  focusYn: boolean;
};

export type WasteCollectorDetailType = {
  requestId: string;
  disposeNumber: string;
  disposeStatus: TypeOf<typeof COLLECT_STATUS_ENUM>;
  disposeStatusChangeDateTime: string;
  requestName: string;
  requestNumber: string;
  requestDateTime: string;
  zipCode: string;
  disposeAddress: string;
  disposeDetailAddress: string;
  specialNotes: string;
  wasteList: {
    wasteCollectId: string;
    wasteFee: number;
    wasteDetailClssName: string;
    wasteClassificationName: string;
    wasteKindQuantity: number;
    aiDecisionYn: boolean;
    paymentYn: boolean;
    changeWasteCollectResDto: {
      wasteCollectId: string;
      wasteFee: number;
      wasteDetailClssName: string;
      wasteClassificationName: string;
      wasteKindQuantity: number;
      aiDecisionYn: boolean;
    } | null;
  }[];
  additionPaymentYn: false;
  disposeRefusalReason: string | null;
  additionPaymentFee: 0;
  // TODO : 이미지 처리 API 반환값 확인 필요 -> 수미님 전달 완료
  imageFileList: string[];
  disposeDateTime: string;
  operationDateTime: string;
  adminUploadFileList: string[];
  legalEmdNm: string;
  keyLocgovName: string;
  keyIsttName: string;
  keyManName: string;
};
