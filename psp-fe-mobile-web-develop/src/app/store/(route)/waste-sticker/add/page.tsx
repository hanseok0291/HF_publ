"use client";

import { AccountPurchaseResponse } from "@/types/apiType/Common.type";
import { ApiError } from "@/types/HttpClient.type";
import {
  PaymentMethodType,
  ResultFormValues
} from "@/types/store/waste-sticker/AddWasteSticker.type";
import { PurchaseResType } from "@/types/store/waste-sticker/PurchaseRes.type";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import Link from "next/link";
import { getPaymentMethod, requestPaymentUi } from "@/apis/common/paymentApi";
import { createSticker } from "@/apis/waste-sticker/wasteStickerApis";
import { PayOpenType } from "@/app/constant/store/PayType.enum";
import LoadingMessage from "@/components/common/LoadingMessage";
import MainContainer from "@/components/common/MainContainer";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import AccordionMenu from "@/components/header/AccordionMenu";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import AddWasteStickerResult from "@/components/store/waste-sticker/purchase/AddWasteStickerResult";
import PurchaseDate from "@/components/store/waste-sticker/purchase/PurchaseDate";
import PurchaseType from "@/components/store/waste-sticker/purchase/PurchaseType";
import { toast } from "@/hooks/use-toast";
import usePurcase from "@/stores/usePurcase";
import useParchaseSuccessCheck from "@/stores/usePurchaseSuccessCheck";
import {
  formatDateWithTime,
  formatNumberWithoutCommas
} from "@/utils/formatUtils";
import { isWebView } from "@/utils/WebViewHandler";
import { clearServerCookie } from "@/utils/cookieUtil.sever";
import { useRouter } from "next/navigation";
import RenderModal from "./_components/RenderModal";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSuccess, clearSelection } = useParchaseSuccessCheck();
  const currentDate = new Date();
  const formatDate = formatDateWithTime(currentDate.toISOString());
  const queryParams = useSearchParams();
  const [isShowLogoutConfirm, setIsShowLogoutConfirm] = useState(false);
  const [cookieData, setCookieData] = useState({
    userName: "-"
  });
  //신청 완료
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [failSubmit, setFailSubmit] = useState(false);
  // 직접 수납
  const [paymentAccount, setPaymentAccount] = useState(false);
  // 가상 계좌
  const [virtualAccount, setVirtualAccount] = useState(false);
  //담당자 확인 후 구매 신청건 - 직접 수납
  const [showReceipt, setShowReceipt] = useState(false);
  const [accountData, setAccountData] =
    useState<AccountPurchaseResponse | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [fetchData, setFetchData] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const { resetList, addStickers, selectSticker } = usePurcase(
    useShallow((state) => ({
      resetList: state.resetList,
      addStickers: state.addStickers,
      selectSticker: state.selectedList
    }))
  );

  const [paymentMethodData, setPaymentMethodData] = useState<
    PaymentMethodType[]
  >([]);

  useEffect(() => {
    const name = getCookie("userName")?.toString() ?? "-";
    setCookieData({
      userName: name
    });
  }, []);

  const handleLogOut = () => {
    clearServerCookie();
    router.replace("/store/login");
  };

  useEffect(() => {
    const hasOk = queryParams.has("ok");
    if (!hasOk) {
      resetList();
      clearSelection();
    } else {
      getPaymentMethodList();
    }
  }, []);
  // 선택된 모든 스티커의 fee 총합이 0보다 작은지 확인
  const selectStickerFee =
    selectSticker.reduce((sum, item) => sum + item.fee, 0) < 0;
  // 선택된 모든 스티커의 fee 총합이 0인지 확인
  const isStickerFeeZero =
    selectSticker.reduce((sum, item) => sum + item.fee, 0) === 0;

  const createStickerList = async (data: ResultFormValues) => {
    try {
      const params = {
        stickerList: addStickers.map((item: any) => ({
          stickerId: item.id,
          purchaseQuantity: formatNumberWithoutCommas(item.purchaseQuantity)
        })),
        paymentMethod: data.paymentMethod,
        openType: isWebView() ? PayOpenType.APP : PayOpenType.WEB
      };
      const response = await createSticker(params);
      setFetchData(response.content.requestId);
      if (!selectStickerFee) {
        await fetchPaymentRequest(data, response.content);
      } else {
        setFailSubmit(true);
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
    data: ResultFormValues,
    reqParam: PurchaseResType
  ) => {
    try {
      setLoadingModal(true);
      // 결제 금액이 총 0원일 경우 결제 성공 모달창 출력
      if (isStickerFeeZero) return setSuccessSubmit(true);

      const localGovernmentId =
        getCookie("localGovernmentId")?.toString() ?? "-";

      const params = {
        requestId: reqParam.requestId,
        paymentMethod: data.paymentMethod,
        nextUrl: `${location.origin}/store/payment/result`,
        cancUrl: `${location.origin}/store/payment/cancel`,
        locGovId: localGovernmentId,
        userId: reqParam.userId,
        openType: isWebView() ? PayOpenType.APP : PayOpenType.WEB
      };

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

  return (
    <div className="min-h-screen bg-gray10 lg:bg-white">
      {/* 모바일: 레이아웃 */}
      <div className="lg:hidden flex flex-col min-h-screen bg-white">
        {loadingModal ? (
          <MainContainer>
            <LoadingMessage
              title="결제 처리중"
              content="결제 처리 중입니다. 잠시만 기다려주세요..."
              isArrowHeader={false}
            />
          </MainContainer>
        ) : (
          <>
            <ArrowAndMenuHeader headerTitle="스티커 구매 신청" isModal />
            
            {/* 메인 콘텐츠 영역 */}
            <div className="flex-1 overflow-y-auto pb-[80px]">
              <section className="px-[20px] pt-[24px] pb-[24px] flex flex-col gap-[24px]">
                <PurchaseDate formatDate={formatDate} />
                <PurchaseType pushLink="/store/waste-sticker/add/item/1" />
                {isSuccess && (
                  <div>
                    <AddWasteStickerResult
                      successSubmit={successSubmit}
                      setSuccessSubmit={setSuccessSubmit}
                      createList={createStickerList}
                      listType="sticker"
                      paymentMethodList={paymentMethodData}
                    />
                  </div>
                )}
              </section>
            </div>

            {/* 모바일: 하단 고정 신청하기 버튼 */}
            {!isSuccess && (
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-[16px] z-10">
                <Button
                  disabled={true}
                  className="w-full h-[52px] text-[16px] font-semibold disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-white"
                >
                  신청하기
                </Button>
              </div>
            )}

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
              setVirtualAccount={setVirtualAccount}
              virtualAccount={virtualAccount}
              accountData={accountData}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </>
        )}
      </div>

      {/* PC: GNB + 사이드바 + 메인 콘텐츠 레이아웃 */}
      <div className="hidden lg:flex lg:flex-col lg:min-h-screen">
        {/* PC: GNB 헤더 */}
        <header className="flex items-center justify-between bg-main px-[40px] py-[16px]">
          {/* 왼쪽: 로고 + 판매소명 노출 버튼 */}
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <Image
                src="/images/logo_white.svg"
                alt="greenOne Logo"
                width={154}
                height={27}
                className="object-contain"
              />
            </div>
            <button className="px-[16px] py-[8px] border-[1px] border-solid border-white/40 rounded-full text-white text-[14px] font-medium">
              판매소명 노출
            </button>
          </div>

          {/* 오른쪽: 사용자명 + 로그아웃 */}
          <div className="flex items-center gap-[12px]">
            <span className="text-white text-[14px] font-medium">
              {cookieData.userName}
              <span className="font-normal">님</span>
            </span>
            <div className="w-[1px] h-[16px] bg-white/30"></div>
            <Modal
              trigger="로그아웃"
              triggerClassName="text-white text-[14px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
              open={isShowLogoutConfirm}
              onOpenChange={setIsShowLogoutConfirm}
              description={`로그아웃 하시겠습니까?`}
              onConfirm={handleLogOut}
              cancelButton={{ text: "취소" }}
            />
          </div>
        </header>

        {/* PC: 메인 레이아웃 (사이드바 + 콘텐츠) */}
        <div className="flex flex-1">
          {/* PC: 왼쪽 사이드바 */}
          <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col">
            <div className="p-[32px_16px] flex-1 overflow-y-auto">
              <AccordionMenu />
            </div>
            {/* 하단 로고 */}
            <div className="p-[24px] border-t border-gray-200">
              <Image
                src="/images/logo_color.svg"
                alt="Hecto Financial Logo"
                width={120}
                height={22}
                className="object-contain"
              />
            </div>
          </aside>

          {/* PC: 오른쪽 메인 콘텐츠 영역 */}
          <main className="flex-1 bg-white overflow-y-auto">
            {loadingModal ? (
              <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
                <LoadingMessage
                  title="결제 처리중"
                  content="결제 처리 중입니다. 잠시만 기다려주세요..."
                  isArrowHeader={false}
                />
              </div>
            ) : (
              <div className="px-[40px] py-[32px] h-full flex flex-col">
                {/* 브레드크럼 */}
                <nav className="mb-[24px] text-[14px] text-gray-600">
                  <Link href="/store" className="hover:text-main">
                    폐기물 스티커 구매 관리
                  </Link>
                  <span className="mx-[8px]">/</span>
                  <span className="text-gray-900">스티커 구매 신청</span>
                </nav>

                {/* 페이지 제목 */}
                <h1 className="text-[32px] font-bold text-[#0F0F10] mb-[40px]">
                  스티커 구매 신청
                </h1>

                {/* 폼 영역 */}
                <div className="flex flex-col gap-[32px] max-w-[800px] flex-1">
                  <PurchaseDate formatDate={formatDate} />
                  <PurchaseType pushLink="/store/waste-sticker/add/item/1" />
                  {isSuccess && (
                    <AddWasteStickerResult
                      successSubmit={successSubmit}
                      setSuccessSubmit={setSuccessSubmit}
                      createList={createStickerList}
                      listType="sticker"
                      paymentMethodList={paymentMethodData}
                    />
                  )}
                  
                  {/* PC: 신청하기 버튼 (구매 권종 미등록 시) - 최하단 오른쪽 */}
                  {!isSuccess && (
                    <div className="flex justify-end mt-auto">
                      <Button
                        disabled={true}
                        className="h-[48px] px-[24px] text-[16px] font-semibold disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-white"
                      >
                        신청하기
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 모달 (PC/모바일 공통) */}
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
        setVirtualAccount={setVirtualAccount}
        virtualAccount={virtualAccount}
        accountData={accountData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
