"use client";

import { PaymentValidationType } from "@/types/collector/collector-status/add-payment/AddPayment.type";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import { paymentValidationSchema } from "@/schema/collector/collector-status/AddPayment.schema";
import AddPaymentFirstStep from "./AddPaymentFirstStep";
import AddPaymentSecondStep from "./AddPaymentSecondStep";

type AddPaymentType = {
  step: string;
};

export default function AddPaymentStepClient({ step }: AddPaymentType) {
  const router = useRouter();
  const [requestId, setRequestId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const form = useForm<PaymentValidationType>({
    resolver: zodResolver(paymentValidationSchema),
    defaultValues: {
      wasteId: searchParams.get("wasteId") || "",
      changeWasteId: searchParams.get("changeWasteId") || ""
    }
  });

  const { handleSubmit } = form;

  // 컴포넌트가 마운트될 때 requestId 설정
  useEffect(() => {
    setRequestId(localStorage.getItem("requestId"));
  }, []);

  // beforeunload 이벤트 리스너 추가 - 페이지 새로고침이나 닫기 시 실행
  useEffect(() => {
    const handleBeforeUnload = () => {
      // 페이지를 떠날 때 현재 진행 중인 선택 항목만 초기화
      localStorage.removeItem("currentSelectedItem");
      localStorage.removeItem("currentWasteItem");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 뒤로가기 처리 - 취소 버튼 클릭 시
  const handleBack = useCallback(() => {
    // 현재 진행 중인 선택 항목 초기화
    localStorage.removeItem("currentSelectedItem");
    router.back();
  }, [router]);

  const onSubmit = (data: PaymentValidationType) => {
    try {
      if (step === "1") {
        console.log(data);
        // 첫 번째 단계 완료 시 현재 선택 항목 유지
        router.push(
          `/collector/collector-status/add-payment/2?requestId=${requestId}&wasteId=${data.wasteId}`
        );
      } else if (step === "2") {
        // 두 번째 단계에서는 모든 데이터를 가지고 reason 페이지로 이동
        // 현재 선택 항목을 완료된 항목으로 저장
        try {
          const currentSelection = localStorage.getItem("currentSelectedItem");
          if (currentSelection) {
            // 배열 대신 단일 값으로 저장
            localStorage.setItem("completedPaymentItem", currentSelection);
          }
        } catch (e) {
          console.error("Error saving completed item:", e);
        }

        router.push(
          `/collector/collector-status/reason/${requestId}?wasteId=${data.wasteId}&changeWasteId=${data.changeWasteId}`
        );
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  if (step !== "1" && step !== "2") {
    notFound();
  }

  const textOption = {
    content:
      step === "1"
        ? `추가결제가 필요한 폐기 신청 품목을\n선택해주세요.`
        : `선택한 폐기 신청 품목과\n교체가 필요한 품목을 선택해주세요.`
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader title="추가 결제 품목 지정" onClose={handleBack} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="px-[20px] flex flex-col h-[calc(100%-56px)]"
        >
          <p className="leading-[26px] mb-[16px] whitespace-pre-line">
            {textOption.content}
          </p>
          <div className="flex-1 overflow-y-auto">
            {step === "1" && <AddPaymentFirstStep />}
            {step === "2" && <AddPaymentSecondStep />}
          </div>
        </form>
      </MainContainer>
    </FormProvider>
  );
}
