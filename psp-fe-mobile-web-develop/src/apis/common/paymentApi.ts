import { AccountPurchaseResponse } from "@/types/apiType/Common.type";
import { ApiError, ApiFunction } from "@/types/HttpClient.type";
import {
  WebViewData,
  WebViewRecvMessageType,
  WebViewRecvSchema
} from "@/types/WebViewType";
import { TypeOf } from "zod";
import { PayOpenType } from "@/app/constant/store/PayType.enum";
import { PAY_METHOD_ENUM } from "@/enums/Common.enum";
import { getRequest, postRequest } from "@/lib/httpClients";
import {
  handleCloseWindowCallApp,
  handleOpenWindowCallApp
} from "@/utils/WebViewHandler";

/**
 * [COMMON] 결제 UI 요청 API
 * @description 백엔드 API를 통해 백엔드 서버를 Proxy로서 헥토파인낸셜 PG 결제 UI를 호출한다.
 * @returns { boolean | null } 결제 상태를 반환한다. 결제성공: true, 결제실패: false, 결제대기: null
 * @since 2025.03.23 헥토PG의 내통장결제가 타 결제수단과 다르게 새 탭이 열린 다음 JS로 다시 새 탭을 여는 방식으로 처리하기 때문에 탭이 닫히는걸 감지할 수 없기 때문에 내통장결제는 탭의 닫힘을 감지하지 않는다.
 *        탭 닫힘을 감지할 수 없고, 김기욱 책임님이 전달해주신 바에 따르면 같은 결제에 대한 예외 처리가 헥토 PG 내부에서 적용되어 있으므로 내 통장결제는 탭 감지를 제외하고, 로더를 보여주지 않는것으로 결정하였다.
 */
export const requestPaymentUi: (params: {
  /** 결제 정보가 속할 게시글 또는 내역의 ID */
  requestId: string;
  userId?: string;
  paymentMethod: TypeOf<typeof PAY_METHOD_ENUM>;
  locGovId: string;
  openType: string;
  // /** requestId에 해당하는 상세 정보를 조회하는 API 함수. 해당 함수를 interval로 실행하여 결제 상태를 확인한다. */
  // getDetailApi: (...params: any[]) => Promise<ApiResponse<Record<string, any> & { payment: PaymentRes[] }>>;
  /** @deprecated PG에서 nextUrl에 대한 처리가 완벽하지 않아 사용하지 않는다. */
  // nextUrl?: string;
  /** @deprecated PG에서 cancUrl에 대한 처리가 완벽하지 않아 사용하지 않는다. */
  // cancUrl?: string;
}) => Promise<any | null> = (params) => {
  return new Promise(async (resolve, reject) => {
    // 직접 수납 결제는 PG 결제를 통하지 않고 처리한다.
    if (params.paymentMethod === "PMT_MEAN_004") {
      resolve(null);
      return;
    }

    // 가상계좌는 NonUI로 PG 결제를 통하지 않고 처리한다.
    if (params.paymentMethod === "PMT_MEAN_002") {
      try {
        const result = await requestPaymentAccount({
          requestId: params.requestId,
          paymentMethod: params.paymentMethod,
          locGovId: params.locGovId,
          openType: params.openType,
          userId: params?.userId
        });

        if (result.code === 0) {
          resolve(result.content);
        } else {
          reject(result.message);
        }
        return;
      } catch (e) {
        reject((e as ApiError).message);
        return;
      }
    }

    /** 상세 조회 준비 여부 확인 */
    const getDetailIsReady = (condition: () => boolean): Promise<true> => {
      let intervalCount = 0;
      return new Promise((isReadyResolve) => {
        const interval = setInterval(() => {
          // 5분 경과 시 바로 상세 조회 API 인터벌을 시작한다.
          if (intervalCount > 600) {
            // (600 * 500ms = 300초 = 5분)
            clearInterval(interval);
            isReadyResolve(true);
          }

          // 500ms 마다 결제창 상태를 확인한다. 닫혔으면 상세 API 인터벌을 시작한다.
          intervalCount++;
          if (condition()) {
            clearInterval(interval);
            isReadyResolve(true);
          }
        }, 500);
      });
    };

    // Mobile WebView 인 경우
    if (params.openType === PayOpenType.APP) {
      try {
        const newParam = {
          requestId: params.requestId,
          paymentMethod: params.paymentMethod,
          locGovId: params.locGovId,
          openType: params.openType,
          appAdminId: params.userId ?? ""
        };

        const webViewData = {
          url: `${window.location.origin}/v1/payment/requestapp`,
          method: "POST",
          content: new URLSearchParams(newParam).toString()
        } as WebViewData;

        handleOpenWindowCallApp(webViewData);
      } catch (error) {
        console.log(error);
        reject(error);
        return;
      }

      let result = false;
      window.receiveReactNativeMessage = (message: string) => {
        try {
          const jsonMessage = JSON.parse(message);
          console.log("jsonMessage >> ", jsonMessage);

          const webviewData = WebViewRecvSchema.safeParse(jsonMessage);
          if (
            webviewData.success &&
            webviewData.data.type === WebViewRecvMessageType.Enum.CLOSED_WINDOW
          ) {
            result = true;
          }
        } catch (error) {
          reject(error);
          return;
        }
      };

      await getDetailIsReady(() => {
        return result;
      });
    } else {
      // PG 결제창 인스턴스
      let newWindow: Window | null = null;

      // 결제 UI 요청
      try {
        newWindow = (await postRequest({
          url: `/v1/payment/request`,
          redirect: "manual",
          params
        })) as Window | null;

        // PG 결제창 비정상 종료(내통장결제 제외)
        if (!newWindow || typeof newWindow.closed === "undefined") {
          throw new Error("Invalid window object");
        }
      } catch (error) {
        reject(error);
        return;
      }

      await getDetailIsReady(() => {
        return !newWindow || newWindow.closed;
      });
    }

    // 가상계좌 PG 창 / 내통장결제에서 즉시 결제 되지 않으므로, Promise 종료한다.
    if (ignoreWaitPayment(params.paymentMethod)) {
      resolve(null);
      return;
    }

    let intervalCount = 0;
    const detailCheckInterval = setInterval(async () => {
      // 인터벌 횟수 체크
      if (intervalCount > 10) {
        clearInterval(detailCheckInterval);
        reject(new Error("결제 상태 확인 시간이 초과되었습니다."));
        return;
      }

      intervalCount++;

      try {
        const { content } = await getPaymentStatus({
          requestId: params.requestId,
          openType: params.openType
        });
        // 결제 대기(진행 중)
        if (content !== null) {
          handleCloseWindowCallApp();
          clearInterval(detailCheckInterval);
          resolve(content);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  });
};

/**
 * 결과 대기 상태 처리 여부 체크하는 로직
 *
 * 가상계좌 PG 창 / 내통장결제에서 즉시 결제 되지 않으므로 대기하지 않음
 *
 * @param paymentMethod 결제 요청 메소드
 * @returns 대기 무시할 PayMentMethod 여부
 */
const ignoreWaitPayment = (paymentMethod: string): boolean => {
  const ignoreType = [
    PAY_METHOD_ENUM.Enum.PMT_MEAN_002 as string, // 가상계좌
    PAY_METHOD_ENUM.Enum.PMT_MEAN_003 as string //내통장결제
  ];

  return ignoreType.includes(paymentMethod);
};

/**
 * 결제 상태 결과 조회
 */
const getPaymentStatus: ApiFunction<
  { requestId: string; openType: string },
  boolean | null
> = ({ requestId, openType }) =>
  openType === PayOpenType.APP
    ? postRequest({
        url: `/v1/payment/paycheck`,
        params: { requestId: requestId, openType: openType }
      })
    : getRequest({
        url: `/v1/payment/check/${requestId}`
      });

/** 결제 수단 조회 */
export const getPaymentMethod: ApiFunction<
  {
    localGovernmentId: string;
  },
  {
    paymentMethodId: string;
    paymentMethodName: string;
  }
> = (params) =>
  getRequest({
    url: `/v1/payment/method`,
    params
  });

/**
 * 가상계좌 결제 정보 요청
 */
export const requestPaymentAccount: ApiFunction<
  {
    requestId: string;
    paymentMethod: string;
    locGovId: string;
    openType: string;
    userId: string | undefined;
  },
  AccountPurchaseResponse
> = (params) =>
  postRequest({
    url: `/v1/payment/fixvareq`,
    params
  });

/**
 * 가상계좌 입금대기 건 취소 요청
 */
export const requestPaymentAccountCancel: ApiFunction<
  {
    type: string;
    id: string;
    locGovId: string;
  },
  null
> = (params) =>
  postRequest({
    url: `/v1/store/${params.type}/delivery/cancel`,
    params: { id: params.id, locGovId: params.locGovId }
  });
