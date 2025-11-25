import {
  PaymentType,
  StickerListType
} from "@/types/apiType/waste-sticker/WasteSticker.type";
import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { PurchaseResType } from "@/types/store/waste-sticker/PurchaseRes.type";
import { TypeOf } from "zod";
import { PAY_METHOD_ENUM, PAY_STATUS_ENUM } from "@/enums/Common.enum";
import {
  RECEIPT_ENUM,
  STORE_DELIVERY_FILTER_ENUM
} from "@/enums/WasteSticker.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";

/** COMMON > 스티커 품목 > 폐기물 검색 */
export const getStickerList: ApiFunction<
  {
    localGovernmentId: string;
    topStickerId: string;
    middleStickerId: string;
    standardName: string;
  },
  {
    stickerId: string;
    topStandardName: string;
    middleStandardName: string;
    standardName: string;
    fee: number;
    holdInventory: number;
    singlenessStandardYn: boolean;
  }
> = (params) =>
  getRequest({
    url: `/v1/sticker`,
    params
  });

/** COMMON > 스티커 품목 > 폐기물 품목 조회 */
export const getStickerTop: ApiFunction<
  {
    localGovernmentId: string;
  },
  {
    stickerId: string;
    standardName: string;
  }
> = (params) =>
  getRequest({
    url: `/v1/sticker/top`,
    params
  });

/** COMMON > 스티커 품목 > 폐기물 세부 품목 조회 */
export const getStickerMiddle: ApiFunction<
  {
    stickerId: string;
  },
  {
    stickerId: string;
    standardName: string;
  }
> = (params) =>
  getRequest({
    url: `/v1/sticker/middle`,
    params
  });

/** 스티커 구매 관리 > 스티커 구매 신청 */
export const createSticker: ApiFunction<
  {
    stickerList: {
      stickerId: string;
      purchaseQuantity: number;
    }[];
    paymentMethod: string;
    openType: string;
  },
  PurchaseResType
> = (params) =>
  postRequest({
    url: `/v1/store/sticker/purchase`,
    params
  });

/**
 * @description 스티커 구매 내역 페이지 API 함수
 * @param searchStartDate - DatePicker 시작 날짜
 * @param searchEndDate - DatePicker 종료 날짜
 * @param paymentMethod - 결제 수단 종류
 * @param paymentStatus - 결제 상태
 * @param receiptYn - 수령 여부
 * @param receiptTypeCode - 수령 방식 종류
 * @param searchFilter - 스티커 구매 내역 필터 종류
 * @param keyWord - 검색어
 * @returns
 */
export const getWasteStickerList: PageableSWR<
  {
    searchStartDate: string;
    searchEndDate: string;
    paymentMethod: TypeOf<typeof PAY_METHOD_ENUM> | null;
    paymentStatus: TypeOf<typeof PAY_STATUS_ENUM> | null;
    receiptYn: boolean | null;
    receiptTypeCode: TypeOf<typeof RECEIPT_ENUM> | null;
    searchFilter: TypeOf<typeof STORE_DELIVERY_FILTER_ENUM>;
    keyWord: string;
  },
  {
    stickerDeliveryId: string;
    orderDate: string;
    purchaseQuantity: number;
    totalOrderAmount: number;
    paymentMethodCode: string;
    paymentMethodCodeName: string;
    paymentStatusCode: string;
    paymentStatusCodeName: string;
    paymentCompleteDate: string;
    receiptTypeCodeName: string;
    receiptYn: boolean;
  }
> = (params) => useCustomSWR("/v1/store/sticker/purchase", params);

/**
 * @description 스티커 구매 내역 상세 페이지 API 함수
 * @param stickerDeliveryId - 상세 페이지
 * @returns
 */
export const getWasteStickerDetail: ApiFunction<
  {
    stickerDeliveryId: string;
  },
  {
    stickerDeliveryId: string;
    localGovernmentName: string;
    name: string;
    email: string;
    telePhoneNumber: string;
    cellPhoneNumber: string;
    receiptTypeCodeName: string;
    receiptYn: boolean;
    paymentMethodCodeName: string | null;
    paymentYn: boolean;
    paymentStatusCodeName: string;
    stickerList: StickerListType[];
    payment: PaymentType[];
  }
> = ({ stickerDeliveryId }) =>
  getRequest({
    url: `/v1/store/sticker/purchase/${stickerDeliveryId}`
  });
