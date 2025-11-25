"use client";

import { TrashBagDetailResponseType } from "@/types/apiType/trash-bag/TrashBag.type";
import {
  PaymentType,
  WasteStickerDetailResponseType
} from "@/types/apiType/waste-sticker/WasteSticker.type";
import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { requestPaymentAccountCancel } from "@/apis/common/paymentApi";
import { getTrashBagDetail } from "@/apis/trash-bag/trashBagApis";
import TrashBagPurchaseInfo from "@/app/store/(route)/trash-bag/detail/_components/TrashBagPurchaseInfo";
import Button from "@/components/common/Button";
import MainContainer from "@/components/common/MainContainer";
import Modal from "@/components/common/Modal";
import CloseHeader from "@/components/header/CloseHeader";
import LocalGovernment from "@/components/store/waste-sticker/detail/LocalGovernment";
import LocalGovernmentAdmin from "@/components/store/waste-sticker/detail/LocalGovernmentAdmin";
import ReceiptCheck from "@/components/store/waste-sticker/detail/ReceiptCheck";
import ReceiptType from "@/components/store/waste-sticker/detail/ReceiptType";
import { toast } from "@/hooks/use-toast";
import TrashBagPaymentInfo from "./TrashBagPaymentInfo";

export type TrashBagPaymentDataType = {
  payment: PaymentType[];
  trashBagList: TrashBagTableType[];
};
export type WasteStickerPaymentDataType = Pick<
  WasteStickerDetailResponseType,
  "payment" | "cellPhoneNumber" | "name" | "stickerList"
>;
export type TrashBagTableType = {
  cnclAmt: string;
  cnclRsn: string;
  name: string;
  trdDtm: string;
};
export default function TrashBagDetailClient({
  stickerId
}: {
  stickerId: string;
}) {
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<TrashBagDetailResponseType | null>(null);
  const [trashBagList, setTrashBagList] = useState<TrashBagTableType[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrashBagDetail({
          trashBagDeliveryId: stickerId
        });

        const wasteTrashBagListData = response.content.payment.flatMap(
          (item) =>
            item.cancelList?.length
              ? item.cancelList.map((cancel) => ({
                  cnclAmt: cancel.cnclAmt,
                  cnclRsn: cancel.cnclRsn,
                  name: cancel.name,
                  trdDtm: cancel.trdDtm
                }))
              : []
        );

        console.log("waste trash bag :", wasteTrashBagListData);
        setTrashBagList(wasteTrashBagListData);
        setResult(response.content);
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

  const cancelPayment = async () => {
    try {
      const localId = getCookie("localGovernmentId")?.toString() ?? "-";
      const payResult = await requestPaymentAccountCancel({
        type: "trash-bag",
        id: result ? result.trashBagDeliveryId : "-",
        locGovId: localId
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

  const handleConfirm = () => {
    router.push("/store");
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
        onClose={() => router.push("/store/")}
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
        <TrashBagPurchaseInfo trashBagList={result.trashBagList} />
        <hr className="bg-gray20 h-[8px]" />
        {/* 결제정보 */}
        <TrashBagPaymentInfo
          payment={result.payment}
          trashBagList={trashBagList}
        />
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
