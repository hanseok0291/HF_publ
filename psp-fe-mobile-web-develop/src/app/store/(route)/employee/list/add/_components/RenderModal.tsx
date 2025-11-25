"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

interface RenderModalType {
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export default function RenderModal({
  onSubmit,
  isSubmitting
}: RenderModalType) {
  const router = useRouter();
  const [cancel, setCancel] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = async () => {
    try {
      setSubmit(true);
      await onSubmit();
    } catch (error) {
      console.error("Form submission failed:", error);
      toast({
        title: "오류가 발생했습니다.",
        description: `${(error as ApiError).message}`,
        action: <ToastAction altText="닫기">닫기</ToastAction>
      });
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="flex items-center gap-[8px] mb-[40px] ">
      <Modal
        trigger="이전"
        description={`작성 중인 내용이 있습니다.\n나가시겠습니까?`}
        open={cancel}
        onOpenChange={() => setCancel(!cancel)}
        onConfirm={() => handleBack()}
        cancelButton={{ text: "취소" }}
        triggerClassName="flex justify-center items-center w-[108px] h-[52px] border-none rounded bg-gray40 text-black font-semibold"
      />
      <Modal
        trigger="등록"
        description={`해당 직원 정보를 \n신규 등록하시겠습니까?`}
        open={submit}
        onOpenChange={() => setSubmit(!submit)}
        onConfirm={handleConfirm}
        cancelButton={{ text: "취소" }}
        confirmButton={{
          text: "등록",
          disabled: isSubmitting
        }}
        triggerClassName="flex flex-1 justify-center items-center h-[52px] border-none rounded bg-main text-white font-semibold"
      />
    </div>
  );
}
