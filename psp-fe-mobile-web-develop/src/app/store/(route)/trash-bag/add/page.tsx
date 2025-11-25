"use client";

import { AccountPurchaseResponse } from "@/types/apiType/Common.type";
import { ApiError } from "@/types/HttpClient.type";
import {
  PaymentMethodType,
  ResultTrashFormValues
} from "@/types/store/waste-sticker/AddWasteSticker.type";
import { PurchaseResType } from "@/types/store/waste-sticker/PurchaseRes.type";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import { getPaymentMethod, requestPaymentUi } from "@/apis/common/paymentApi";
import { createTrashBag } from "@/apis/trash-bag/trashBagApis";
import { PayOpenType } from "@/app/constant/store/PayType.enum";
import LoadingMessage from "@/components/common/LoadingMessage";
import MainContainer from "@/components/common/MainContainer";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import AddWasteStickerResult from "@/components/store/waste-sticker/purchase/AddWasteStickerResult";
import PurchaseDate from "@/components/store/waste-sticker/purchase/PurchaseDate";
import PurchaseType from "@/components/store/waste-sticker/purchase/PurchaseType";
import { toast } from "@/hooks/use-toast";
import usePurcase from "@/stores/usePurcase";
import useParchaseSuccessCheck from "@/stores/usePurchaseSuccessCheck";
import { formatDateWithTime, formatNumberWithoutCommas } from "@/utils/formatUtils";
import { isWebView } from "@/utils/WebViewHandler";
import RenderModal from "../../waste-sticker/add/_components/RenderModal";

export default function Page() {
  const { isSuccess, clearSelection } = useParchaseSuccessCheck();
  const currentDate = new Date();
  const formatDate = formatDateWithTime(currentDate.toISOString());
  const queryParams = useSearchParams();
  //신청 완료
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [failSubmit, setFailSubmit] = useState(false);
  const [paymentAccount, setPaymentAccount] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState(false);
  // 가상 계좌 (NonUI)
  const [accountData, setAccountData] =
    useState<AccountPurchaseResponse | null>(null);
  //담당자 확인 후 구매 신청건 - 직접 수납
  const [showReceipt, setShowReceipt] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const router = useRouter();

  const { resetList, addStickers, selectTrashBag } = usePurcase(
    useShallow((state) => ({
      resetList: state.resetList,
      addStickers: state.addStickers,
      selectTrashBag: state.selectedList
    }))
  );

  const selectTrashBagFee =
    selectTrashBag.reduce((sum, item) => sum + item.fee, 0) < 0;

  // 선택된 모든 종량제 봉투의 fee 총합이 0인지 확인
  const isTrashBagFeeZero =
    selectTrashBag.reduce((sum, item) => sum + item.fee, 0) === 0;

  const createTrashList = async (data: ResultTrashFormValues) => {
    try {
      const params = {
        trashBagList: addStickers.map((item: any) => ({
          trashBagId: item.id,
          purchaseQuantity: formatNumberWithoutCommas(item.purchaseQuantity)
        })),
        paymentMethod: data.paymentMethod,
        openType: isWebView() ? PayOpenType.APP : PayOpenType.WEB
      };
      const response = await createTrashBag(params);
      setFetchData(response.content.requestId);
      if (!selectTrashBagFee) {
        await fetchPaymentRequest(data, response.content);
      }
    } catch (error: any) {
      toast({ description: `${(error as ApiError).message}` });
    }
  };

  // 결제 수단 리스트 조회
  const getPaymentMethodList = async () => {
    const localId = getCookie("localGovernmentId");

    if (localId) {
      getPaymentMethod({ localGovernmentId: localId })
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            setPaymentMethodData(res.content);
          } else {
            console.error("결제 수단 데이터가 정상적이지 않음");
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  const fetchPaymentRequest = async (
    data: ResultTrashFormValues,
    reqParam: PurchaseResType
  ) => {
    console.log("fetchPaymentRequest 함수 시작, params:", {
      data,
      reqParam
    });
    try {
      setLoadingModal(true);
      // 결제 금액이 총 0원일 경우 결제 성공 모달창 출력
      if (isTrashBagFeeZero) return setSuccessSubmit(true);

      const localGovernmentId =
        getCookie("localGovernmentId")?.toString() ?? "-";

      const params = {
        requestId: reqParam.requestId,
        userId: reqParam.userId,
        paymentMethod: data.paymentMethod,
        nextUrl: `${location.origin}/store/payment/result`,
        cancUrl: `${location.origin}/store/payment/cancel`,
        locGovId: localGovernmentId,
        openType: isWebView() ? PayOpenType.APP : PayOpenType.WEB
      };

      // 다른 결제 방식 처리
      const paymentResult = await requestPaymentUi(params);

      if (data.paymentMethod === "PMT_MEAN_002" && paymentResult) {
        setAccountData(paymentResult);
        return setVirtualAccount(true);
      }
      if (params.paymentMethod === "PMT_MEAN_003" && paymentResult === null)
        return setPaymentAccount(true);
      // 내통장결제인 경우 먼저 처리
      if (params.paymentMethod === "PMT_MEAN_004" && paymentResult === null)
        return setShowReceipt(true);

      if (paymentResult === true) {
        console.log("결제 성공, 성공 모달 표시");
        setSuccessSubmit(true);
      } else if (paymentResult === false) {
        console.log("결제 실패, 실패 모달 표시");
        setFailSubmit(true);
      } else {
        console.log("예상치 못한 결제 결과:", paymentResult);
        setFailSubmit(true);
      }
    } catch (error) {
      console.error("fetchPaymentRequest 에러 발생:", error);
      setErrorMessage(error);
      setFailSubmit(true);
    } finally {
      setLoadingModal(false);
    }
  };

  const [paymentMethodData, setPaymentMethodData] = useState<
    PaymentMethodType[]
  >([]);

  useEffect(() => {
    const hasOk = queryParams.has("ok");
    if (!hasOk) {
      resetList();
      clearSelection();
    } else {
      getPaymentMethodList();
    }
  }, []);

  const handleSubmitClose = () => {
    if (setSuccessSubmit) {
      setSuccessSubmit(false);
      router.push(`/store/trash-bag/detail/${fetchData}`);
    }
  };

  return (
    <MainContainer>
      {loadingModal ? (
        <LoadingMessage
          title="결제 처리중"
          content="결제 처리 중입니다. 잠시만 기다려주세요..."
          isArrowHeader={false}
        />
      ) : (
        <>
          <ArrowAndMenuHeader headerTitle="봉투 구매 신청" isModal />
          <section className="px-[20px] pt-[20px] flex flex-col gap-[32px]">
            <PurchaseDate formatDate={formatDate} />
            <PurchaseType pushLink="/store/trash-bag/add/item/1" />
            {isSuccess && (
              <AddWasteStickerResult
                successSubmit={successSubmit}
                setSuccessSubmit={setSuccessSubmit}
                createList={createTrashList}
                listType="trashBag"
                paymentMethodList={paymentMethodData}
              />
            )}
          </section>
          <RenderModal
            failSubmit={failSubmit}
            fetchData={fetchData}
            paymentAccount={paymentAccount}
            setFailSubmit={setFailSubmit}
            setPaymentAccount={setPaymentAccount}
            setShowReceipt={setShowReceipt}
            setSuccessSubmit={setSuccessSubmit}
            showReceipt={showReceipt}
            successSubmit={successSubmit}
            virtualAccount={virtualAccount}
            setVirtualAccount={setVirtualAccount}
            accountData={accountData}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
    </MainContainer>
  );
}
