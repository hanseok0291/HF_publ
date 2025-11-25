"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { putInstitutionArea } from "@/apis/collector/area/areaApi";
import Modal from "@/components/common/Modal";
import { toast } from "@/hooks/use-toast";
import { EditAreaInfoParams } from "./AreaDetail";

export default function RenderChangeModal({ item, onClose }: any) {
  const { watch, handleSubmit } = useFormContext<EditAreaInfoParams>();
  const textareaValue = watch("memo");
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [firstClickHandled, setFirstClickHandled] = useState(false);

  const handleCloseSecondModal = async (data: EditAreaInfoParams) => {
    try {
      const params = {
        sdNm: item.sdNm,
        sggNm: item.sggNm,
        legalEmdNm: item.legalEmdNm,
        legalRiNm: item.legalRiNm,
        roadNm: item.roadNm,
        jibunMainNo: item.jibunMainNo,
        jibunSubNo: item.jibunSubNo,
        memo: data.memo
      };
      console.log(params);
      await putInstitutionArea(params);
      setSecondModal(true);
    } catch (error: any) {
      toast({
        title: "오류가 발생했습니다.",
        description: `${(error as ApiError).message}`
      });
    }
  };

  const MUST_HAVE_VALUE = textareaValue !== "" && textareaValue !== undefined;
  return (
    <div className="mt-[21px]">
      <Modal
        open={firstModal}
        onOpenChange={setFirstModal}
        description={`해당 주소의 메모를\n 입력하시겠습니까?`}
        triggerClassName="bg-main w-full text-white h-[52px] rounded"
        trigger="메모 내용 저장"
        onConfirm={handleSubmit(handleCloseSecondModal)}
        cancelButton={{ text: "취소" }}
        confirmButton={{ text: "입력" }}
      />
      {MUST_HAVE_VALUE && (
        <Modal
          open={secondModal}
          onOpenChange={setSecondModal}
          description={`해당 주소의 메모사항이\n 입력되었습니다.`}
          onConfirm={() => onClose()}
          confirmButton={{ className: "max-w-[136px]", text: "확인" }}
        />
      )}
    </div>
  );
}
