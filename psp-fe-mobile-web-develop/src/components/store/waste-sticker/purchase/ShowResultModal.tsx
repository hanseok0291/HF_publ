import { ShowResultModalType } from "@/types/store/waste-sticker/AddWasteStickerResult.type";
import Modal from "@/components/common/Modal";

export default function ShowResultModal({
  handleShowReceiptClose,
  handleSubmitClose,
  handleResetClose,
  setShowReceipt,
  setSuccessSubmit,
  setResetForm,
  showReceipt,
  successSubmit,
  resetForm
}: ShowResultModalType) {
  return (
    <>
      {showReceipt && (
        <Modal
          open={showReceipt}
          onOpenChange={setShowReceipt}
          onConfirm={() => handleShowReceiptClose()}
          description={`지자체 담당자 확인 후\n 구매 신청건에 대한 직접수납을 \n진행해 주세요.`}
          cancelButton={{ text: "취소" }}
          confirmButton={{ text: "확인" }}
        />
      )}
      {successSubmit && (
        <Modal
          open={successSubmit}
          onOpenChange={setSuccessSubmit}
          onConfirm={() => handleSubmitClose()}
          description={`구매신청이 \n완료됐습니다.`}
          confirmButton={{ text: "확인", className: "max-w-[136px] h-[48px]" }}
        />
      )}
      {resetForm && (
        <Modal
          open={resetForm}
          onOpenChange={setResetForm}
          onConfirm={() => handleResetClose()}
          description={`초기화 \n 하시겠습니까?`}
          cancelButton={{ text: "취소" }}
          confirmButton={{ text: "확인" }}
        />
      )}
    </>
  );
}
