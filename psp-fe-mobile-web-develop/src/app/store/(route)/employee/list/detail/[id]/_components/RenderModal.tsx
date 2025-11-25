"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

interface RenderModalType {
  onSubmit: () => Promise<void>;
}

export default function RenderModal({ onSubmit }: RenderModalType) {
  const [submit, setSubmit] = useState(false);

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
    <div className="mt-[20px] mb-[40px]">
      <Modal
        trigger="수정"
        description={`해당 직원 정보를 \n변경하시겠습니까?`}
        open={submit}
        onOpenChange={() => setSubmit(!submit)}
        onConfirm={handleConfirm}
        confirmButton={{ text: "변경" }}
        cancelButton={{ text: "취소" }}
        triggerClassName="flex w-full flex-1 justify-center items-center h-[52px] border-none rounded bg-main text-white font-semibold"
      />
    </div>
  );
}
