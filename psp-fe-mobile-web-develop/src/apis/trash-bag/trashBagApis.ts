import { TrashBagListType } from "@/types/apiType/trash-bag/TrashBag.type";
import { PaymentType } from "@/types/apiType/waste-sticker/WasteSticker.type";
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

/** COMMON > 종량제 봉투 품목 > 폐기물 검색 */
export const getTrashBag: ApiFunction<
  {
    localGovernmentId: string;
    standardName: string;
  },
  {
    stickerId: string;
    topStandardName: string;
    middleStandardName: string;
    standardName: string;
    fee: number;
  }
> = (params) =>
  getRequest({
    url: `/v1/trash-bag`,
    params
  });

/** 종량제 구매 관리 > 종량제 구매 신청 */
export const createTrashBag: ApiFunction<
  {
    trashBagList: {
      trashBagId: string;
      purchaseQuantity: number;
    }[];
    paymentMethod: string;
    openType: string;
  },
  PurchaseResType
> = (params) =>
  postRequest({
    url: `/v1/store/trash-bag/purchase`,
    params
  });

/**
 * @description 종량제 구매 내역 페이지 API 함수
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
export const getTrashBagList: PageableSWR<
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
    trashBagDeliveryId: string;
    orderDate: string;
    purchaseQuantity: number;
    totalOrderAmount: number;
    paymentMethodCodeName: string | null;
    paymentStatusCodeName: string;
    paymentStatusCode: string;
    receiptTypeCodeName: string;
    receiptYn: boolean;
  }
> = (params) => useCustomSWR("/v1/store/trash-bag/purchase", params);

/**
 * @description 종량제 봉투 구매 내역 상세 페이지 API 함수
 * @param trashBagDeliveryId - 상세 페이지
 * @returns
 */
export const getTrashBagDetail: ApiFunction<
  {
    trashBagDeliveryId: string;
  },
  {
    trashBagDeliveryId: string;
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
    trashBagList: TrashBagListType[];
    payment: PaymentType[];
  }
> = ({ trashBagDeliveryId }) =>
  getRequest({
    url: `/v1/store/trash-bag/purchase/${trashBagDeliveryId}`
  });
