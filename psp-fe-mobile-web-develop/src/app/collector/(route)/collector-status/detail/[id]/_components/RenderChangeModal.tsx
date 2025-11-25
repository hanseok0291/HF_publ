"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { ReasonFormType } from "@/schema/collector/reason/Reason.schema";

export default function RenderChangeModal() {
  const router = useRouter();
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const { watch, handleSubmit } = useFormContext<ReasonFormType>();
  const textareaValue = watch("disposeRefusalReason");

  const handleOpenSecondModal = (data: ReasonFormType) => {
    try {
      setSecondModal(true);
      console.log(data);
      console.log("1번째 모달 열림 및 폼 데이터 전송");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSecondModal = () => {
    setSecondModal((prev) => !prev);
    console.log("2번째 모달 열림");
    router.push("/collector/collector-status");
  };
  return (
    <>
      {textareaValue !== "" && (
        <Modal
          open={firstModal}
          onOpenChange={setFirstModal}
          triggerClassName="bg-main text-white h-[52px] rounded"
          trigger="수거 불가 사유 입력"
          description={`수거불가 사유를\n 입력하시겠습니까?`}
          onConfirm={() => {
            handleSubmit(handleOpenSecondModal)();
          }}
          confirmButton={{ text: "입력" }}
        />
      )}
      {secondModal && (
        <Modal
          open={secondModal}
          onOpenChange={setSecondModal}
          description={`수거불가 사유가\n 등록되었습니다.`}
          onConfirm={handleCloseSecondModal}
          confirmButton={{ className: "max-w-[136px]", text: "확인" }}
        />
      )}
    </>
  );
}
