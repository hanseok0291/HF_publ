"use client";

import {
  StickerListType,
  WasteStickerDetailResponseType
} from "@/types/apiType/waste-sticker/WasteSticker.type";
import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { requestPaymentAccountCancel } from "@/apis/common/paymentApi";
import { getWasteStickerDetail } from "@/apis/waste-sticker/wasteStickerApis";
import Button from "@/components/common/Button";
import MainContainer from "@/components/common/MainContainer";
import Modal from "@/components/common/Modal";
import CloseHeader from "@/components/header/CloseHeader";
import LocalGovernment from "@/components/store/waste-sticker/detail/LocalGovernment";
import LocalGovernmentAdmin from "@/components/store/waste-sticker/detail/LocalGovernmentAdmin";
import PaymentInfo from "@/components/store/waste-sticker/detail/PaymentInfo";
import PurchaseInfo from "@/components/store/waste-sticker/detail/PurchaseInfo";
import ReceiptCheck from "@/components/store/waste-sticker/detail/ReceiptCheck";
import ReceiptType from "@/components/store/waste-sticker/detail/ReceiptType";
import { toast } from "@/hooks/use-toast";

export type WasteStickerColumnsType = {
  trdDtm: string;
  cnclAmt: string;
  name: string;
  cnclRsn: string;
};
export default function WasteStickerDetailClient({
  stickerId
}: {
  stickerId: string;
}) {
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<WasteStickerDetailResponseType | null>(
    null
  );
  // 결제 품목
  const [stickerList, setStickerList] = useState<StickerListType[]>([]);
  // 원거래 상세 이력
  const [wasteListData, setWasteListData] = useState<WasteStickerColumnsType[]>(
    []
  );
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWasteStickerDetail({
          stickerDeliveryId: stickerId
        });

        setResult(response.content);

        const wasteStickerListData = response.content.payment.flatMap((item) =>
          item.cancelList?.length
            ? item.cancelList.map((cancel) => ({
                cnclAmt: cancel.cnclAmt,
                cnclRsn: cancel.cnclRsn,
                name: cancel.name,
                trdDtm: cancel.trdDtm
              }))
            : []
        );

        console.log(wasteStickerListData);
        setWasteListData(wasteStickerListData);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(result);
  const handleConfirm = () => {
    router.push("/store");
  };
  const cancelPayment = async () => {
    try {
      const localId = getCookie("localGovernmentId")?.toString() ?? "-";
      const payResult = await requestPaymentAccountCancel({
        locGovId: localId,
        type: "sticker",
        id: result ? result.stickerDeliveryId : "-"
      });
      if (payResult.code === 0) {
        window.location.reload()
        return;
      }

      toast({
        title: "구매 취소에 실패하였습니다.",
        description: `${payResult.message}`
      });
    } catch (e) {
      toast({
        title: "구매 취소에 실패하였습니다.",
        description: `${(e as ApiError).message}`
      });
    }
  };
  if (isLoading) {
    return (
      <MainContainer>
        <CloseHeader
          title="구매 내역 상세"
          onClose={() => router.push("/store")}
        />
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          로딩중...
        </div>
      </MainContainer>
    );
  }

  if (!result) {
    return (
      <MainContainer>
        <CloseHeader
          title="구매 내역 상세"
          onClose={() => router.push("/store")}
        />
        <div className="flex justify-center items-center h-[calc(100vh-56px)]">
          데이터를 불러올 수 없습니다.
        </div>
      </MainContainer>
    );
  }
  const item = result.payment[0];

  return (
    <MainContainer>
      <CloseHeader
        title="구매 내역 상세"
        onClose={() => router.push("/store")}
      />
      <section>
        {/* 지자체 */}
        <LocalGovernment localGovernmentName={result.localGovernmentName} />
        <hr className="bg-gray20 h-[8px]" />
        {/* 지자체 담장자 정보 */}
        <LocalGovernmentAdmin
          adminInfo={{
            cellPhoneNumber: result.cellPhoneNumber,
            email: result.email,
            name: result.name,
            telePhoneNumber: result.telePhoneNumber
          }}
        />
        <hr className="bg-gray20 h-[8px]" />
        {/* 수령방식 */}
        <ReceiptType receiptTypeCodeName={result.receiptTypeCodeName} />
        <hr className="bg-gray20 h-[8px]" />
        {/* 수령 여부 */}
        <ReceiptCheck receiptYn={result.receiptYn} />
        <hr className="bg-gray20 h-[8px]" />
        {/* 구매정보 */}
        <PurchaseInfo stickerList={result.stickerList} />
        <hr className="bg-gray20 h-[8px]" />
        {/* 결제정보 */}
        <PaymentInfo payment={result.payment} wasteListData={wasteListData} />

        {/* 버튼 */}
        {item.paymentStatusCode === "PMT_STAT_001" &&
        item.paymentMethodCode === "PMT_MEAN_002" ? (
          <div className="flex w-full gap-2 p-0 px-[20px] mb-[40px]">
            <Button
              buttonType="cancel"
              className="w-1/4"
              onClick={() => setShowCancelModal(true)}
            >
              구매 취소
            </Button>
            <Button className="w-3/4" onClick={() => handleConfirm()}>
              확인
            </Button>
          </div>
        ) : (
          <div className="w-full px-[20px]">
            <Button className="w-full" onClick={() => handleConfirm()}>
              확인
            </Button>
          </div>
        )}
      </section>
      <Modal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        onConfirm={() => cancelPayment()}
        description={`구매건을 취소 \n 하시겠습니까?`}
        cancelButton={{ text: "취소" }}
        confirmButton={{ text: "확인" }}
      />
    </MainContainer>
  );
}
