"use client";

import { ApiError, ExtractParam } from "@/types/HttpClient.type";
import { useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { putRejectedWasteCollection } from "@/apis/collector/collector-status/reasonApis";
import Button from "@/components/common/Button";
import MainContainer from "@/components/common/MainContainer";
import Modal from "@/components/common/Modal";
import CloseHeader from "@/components/header/CloseHeader";
import { toast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { ReasonFormType } from "@/schema/collector/reason/Reason.schema";
import useAddPayment from "@/stores/useAddPayment";
import useReasonData from "@/stores/useReasonData";
import AddPaymentResult from "../../../detail/[id]/_components/AddPaymentResult";
import ReasonPhoto from "../../_components/ReasonPhoto";
import ReasonTextArea from "../../_components/ReasonTextArea";

export interface FileWithPreview {
  file: File;
  preview: string;
  isUrl?: boolean;
}

export interface InternalFormType extends Omit<ReasonFormType, "files"> {
  files: FileWithPreview[];
}

export type ReasonParam = ExtractParam<typeof putRejectedWasteCollection>;

type IntegratedPaymentItem = {
  id: string;
  label: string;
  content: string;
  quantity: number;
  amount: number;
  paymentYn: boolean;
};

// localStorage에서 초기 결제 상태 가져오기
function getInitialPaymentYn() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("paymentYn");
    return saved === "true";
  }
  return false;
}

// 품목 문자열 변환 함수
const parseItemString = (input: string) => {
  const match = input.match(/\[(.*?)\/(.*?)\] (.*)/);
  if (match) {
    return [match[1], match[2], match[3]];
  } else {
    return ["", "", input];
  }
};

/**
 * URL을 File 객체로 변환
 */
const urlToFile = async (url: string, filename: string): Promise<File> => {
  // URL이 데이터 URL이면 그대로 사용, 아니면 fetch
  const response = url.startsWith("data:")
    ? {
        blob: async () => {
          const base64 = url.split(",")[1];
          const byteString = atob(base64);
          const mimeType = url.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: mimeType });
        }
      }
    : await fetch(url);

  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

/**
 * 데이터 정리 함수 (여러 곳에서 재사용)
 */
const cleanupData = (paymentReset: () => void, resetStoreData: () => void) => {
  localStorage.removeItem("paymentYn");
  localStorage.removeItem("adminUploadFileList");
  localStorage.removeItem("currentSelectedItem");
  localStorage.removeItem("currentWasteItem");
  localStorage.removeItem("completedPaymentItem");
  localStorage.removeItem("selectedPaymentItems");
  // localStorage.removeItem("wasteList");
  // 스토어 초기화
  paymentReset();
  resetStoreData();
};

export default function ReasonClient({ requestId }: { requestId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstSelectedWasteId = searchParams.get("wasteId");
  const wasteIdQuery = searchParams.get("wasteId");
  const changeWasteIdQuery = searchParams.get("changeWasteId");
  const isFixQuery = searchParams.get("fix");
  const [paymentYn, setPaymentYn] = useState(getInitialPaymentYn);
  const [changedWasteItems, setChangedWasteItems] = useState<any[]>([]);
  const [integratedPaymentItems, setIntegratedPaymentItems] = useState<
    IntegratedPaymentItem[]
  >([]);
  const [canInteract, setCanInteract] = useState(false);

  const form = useForm<InternalFormType>({
    mode: "onBlur",
    defaultValues: {
      disposeRefusalReason: "",
      additionPaymentYn: paymentYn,
      wasteRequestRejectedReqDtoList: [
        {
          wasteId: wasteIdQuery,
          changeWasteId: changeWasteIdQuery
        }
      ],
      files: []
    }
  });

  const { watch, control, setValue } = form;
  const [showFinishModal, setShowFinishModal] = useState(false);
  const memoValue = watch("disposeRefusalReason");
  const filesValue = watch("files");
  const debounceMemo = useDebounce(memoValue, 500);

  const {
    secondItemFee,
    secondeItemName,
    fristItemFee,
    reset: paymentReset,
    firstItemQuantity,
    secondItemQuantity
  } = useAddPayment(
    useShallow((state) => ({
      secondItemFee: state.secondItemFee,
      secondeItemName: state.secondeItemName,
      fristItemFee: state.firstItemFee,
      firstItemQuantity: state.firstItemQuantity,
      secondItemQuantity: state.secondItemQuantity,
      reset: state.reset
    }))
  );

  const {
    setMemo,
    memo,
    currentRequestId,
    setCurrentRequestId,
    files,
    setFiles,
    reset
  } = useReasonData(
    useShallow((state) => ({
      setMemo: state.setMemo,
      memo: state.memo,
      currentRequestId: state.currentRequestId,
      setCurrentRequestId: state.setCurrentRequestId,
      files: state.files,
      setFiles: state.setFiles,
      reset: state.reset
    }))
  );

  // 브라우저 뒤로가기 할 시 추가 결제 항목 초기화
  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupData(paymentReset, reset);
    };

    const handlePopState = () => {
      // 브라우저 뒤로가기/앞으로가기 발생 시 데이터 정리
      cleanupData(paymentReset, reset);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
  }, [paymentReset, reset]);

  // paymentYn이 변경될 때 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("paymentYn", paymentYn.toString());
  }, [paymentYn]);

  // localStorage에서 변경된 폐기물 항목 로드
  useEffect(() => {
    try {
      const wasteList = JSON.parse(localStorage.getItem("wasteList") || "[]");
      const itemsWithChanges = wasteList.filter(
        (item: any) =>
          item.changeWasteCollectResDto !== null && item.isChange === true
      );
      setChangedWasteItems(itemsWithChanges);
    } catch (error) {
      console.error("로컬 스토리지 데이터 파싱 오류:", error);
    }
  }, []);

  /**
   * 추가 결제 품목 (기존, 변경)들을 합쳐서 데이터 가공
   */
  useEffect(() => {
    // 추가 결제 품목 통합된 배열
    const integratedItems: IntegratedPaymentItem[] = [];

    // 변경된 폐기물 항목 처리 - paymentYn이 false인 항목만 필터링
    changedWasteItems.forEach((item, index) => {
      // paymentYn이 false인 항목만 처리
      if (
        item.changeWasteCollectResDto &&
        item.changeWasteCollectResDto.paymentYn === false
      ) {
        const originalItem = item;
        const changedItem = item.changeWasteCollectResDto;
        const parsedName = parseItemString(changedItem.wasteDetailClssName);

        integratedItems.push({
          id: `changedWasteItems-${index}`,
          label:
            parsedName[0] && parsedName[1]
              ? `${parsedName[0]}/${parsedName[1]}`
              : "",
          content: parsedName[2] ?? changedItem.wasteDetailClssName,
          // wasteKindQuantity 필드를 quantity에 할당
          quantity:
            originalItem.wasteKindQuantity ||
            changedItem.wasteKindQuantity ||
            1,
          amount:
            changedItem.wasteFee * changedItem.wasteKindQuantity -
            originalItem.wasteFee * originalItem.wasteKindQuantity,
          paymentYn: changedItem.paymentYn
        });
      }
    });

    // 스토어에서 가져온 추가 결제 항목 처리
    if (secondeItemName && (secondItemFee > 0 || fristItemFee > 0)) {
      const parsedName = parseItemString(secondeItemName);

      integratedItems.push({
        id: "store-item",
        label:
          parsedName[0] && parsedName[1]
            ? `${parsedName[0]}/${parsedName[1]}`
            : "",
        content: parsedName[2] ?? secondeItemName,
        quantity: firstItemQuantity || 1, // 기본값 1 추가
        amount:
          secondItemFee * secondItemQuantity - fristItemFee * firstItemQuantity,
        paymentYn: false // 기본값으로 false 설정
      });
    }
    setIntegratedPaymentItems(integratedItems);
  }, [
    changedWasteItems,
    secondeItemName,
    secondItemFee,
    fristItemFee,
    firstItemQuantity,
    secondItemQuantity
  ]);

  // requestId 변경 시 데이터 초기화 및 정리
  useEffect(() => {
    const storedMemo = localStorage.getItem("disposeRefusalReason") ?? "";
    const storedFiles = localStorage.getItem("adminUploadFileList");

    if (currentRequestId && currentRequestId !== requestId) {
      // 다른 요청으로 이동 시 데이터 초기화
      reset();

      // 저장된 데이터가 있으면 로드
      let parsedFiles: FileWithPreview[] = [];
      if (storedFiles) {
        try {
          const filesArray = JSON.parse(storedFiles);
          parsedFiles = filesArray.map((url: string) => ({
            file: new File([], url.split("&id=")[1] || "image.jpg"),
            preview: url,
            isUrl: true
          }));
        } catch (error) {
          toast({
            title: "이미지가 정상적으로 불러지지 않았습니다.",
            description: `${(error as ApiError).message}`
          });
        }
      }

      // 저장된 데이터로 폼 업데이트 또는 비우기
      if (storedMemo || parsedFiles.length > 0) {
        setValue("disposeRefusalReason", storedMemo ?? "");
        setValue("files", parsedFiles);
      } else {
        setValue("disposeRefusalReason", "");
        setValue("files", []);
        localStorage.removeItem("paymentYn");
        setPaymentYn(false);
      }

      // 결제 스토어 초기화 (렌더링 후 실행되도록 타임아웃 설정)
      setTimeout(() => {
        paymentReset();
        localStorage.removeItem("selectedPaymentItems");
      }, 0);
    } else if (currentRequestId === requestId) {
      // 현재 요청에 대한 스토어 데이터가 있으면 로드
      if (memo) {
        setValue("disposeRefusalReason", memo);
      }

      if (files && files.length > 0) {
        setValue("files", files);
      }
    }

    // 스토어에 현재 요청 ID 업데이트
    setCurrentRequestId(requestId);
  }, [
    requestId,
    currentRequestId,
    reset,
    paymentReset,
    setCurrentRequestId,
    memo,
    files,
    setValue
  ]);

  // 메모 변경 시 스토어에 동기화
  useEffect(() => {
    if (debounceMemo !== undefined) {
      setMemo(debounceMemo);
    }
  }, [debounceMemo, setMemo]);

  // 파일 변경 시 스토어에 동기화
  useEffect(() => {
    const hasChanged = JSON.stringify(files) !== JSON.stringify(filesValue);

    if (hasChanged && filesValue && Array.isArray(filesValue)) {
      setFiles(filesValue);
    }
  }, [filesValue, setFiles, files]);

  const onSubmit = useCallback(
    async (data: InternalFormType) => {
      try {
        // 파일 처리 (File 객체와 URL 모두)
        const filePromises = data.files.map(async (fileItem, index) => {
          if (fileItem.isUrl) {
            try {
              return await urlToFile(fileItem.preview, `image_${index}.jpg`);
            } catch (error) {
              toast({
                variant: "destructive",
                description: "파일 변환 중 오류가 발생했습니다."
              });
              return null;
            }
          } else {
            return fileItem.file;
          }
        });

        // null 제거하고 File 객체만 추출
        const fileObjects = (await Promise.all(filePromises)).filter(
          Boolean
        ) as File[];

        if (data.disposeRefusalReason.trim().length === 0) {
          toast({
            description: "수거 불가 사유를 입력해주세요."
          });
          return null;
        }
        // 제출 데이터 준비
        const submitData: ReasonParam = {
          requestId,
          disposeRefusalReason: data.disposeRefusalReason,
          additionPaymentYn: data.additionPaymentYn,
          wasteCollectId: wasteIdQuery ?? "-",
          changeWasteId: changeWasteIdQuery ?? "-",
          files: fileObjects
        };

        // 요청 제출
        await putRejectedWasteCollection(submitData);

        // 모든 데이터 정리 (localStorage 및 store)
        cleanupData(paymentReset, reset);

        setShowFinishModal(true);
      } catch (error: any) {
        toast({ description: `${(error as ApiError).message}` });
        // 에러 발생 시 관련 모든 데이터 초기화
        localStorage.removeItem("currentSelectedItem");
        localStorage.removeItem("currentWasteItem");
        localStorage.removeItem("completedPaymentItem");
        localStorage.removeItem("selectedPaymentItems");

        // 폼과 상태 초기화
        setValue("additionPaymentYn", false);
        setPaymentYn(false);

        // 전역 상태 초기화 이벤트 발생
        const event = new CustomEvent("payment-error", {
          detail: { requestId }
        });
        window.dispatchEvent(event);

        // 스토어 초기화
        paymentReset();
      }
    },
    [
      requestId,
      wasteIdQuery,
      changeWasteIdQuery,
      reset,
      paymentReset,
      router,
      setValue,
      setPaymentYn
    ]
  );

  useEffect(() => {
    // 모든 초기화가 완료된 후 상호작용 허용
    const timer = setTimeout(() => {
      setCanInteract(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  /**
   * 결제 페이지로 이동
   */
  const handleMove = useCallback(() => {
    console.log("1");
    setPaymentYn(true);
    setValue("additionPaymentYn", true);
    console.log("2");
    if (firstSelectedWasteId) {
      console.log("3");
      router.push(
        `/collector/collector-status/add-payment/1?requestId=${requestId}&wasteId=${firstSelectedWasteId}`
      );
    } else {
      console.log("4");
      router.push(`/collector/collector-status/add-payment/${1}`);
    }
    console.log("5");
    localStorage.setItem("requestId", requestId);
  }, [requestId, router, setValue, firstSelectedWasteId]);

  /**
   * 닫기 및 상태 페이지로 돌아가기
   */
  const handleClose = useCallback(() => {
    console.log("close : ", integratedPaymentItems);
    cleanupData(paymentReset, reset);
    setIntegratedPaymentItems([]);
    router.push("/collector/collector-status");
  }, [router, paymentReset, reset]);

  /**
   * 결제 항목 섹션 렌더링
   */
  const renderPaymentSection = () => {
    if (integratedPaymentItems.length === 0) {
      return null;
    }

    return (
      <section className="bg-gray20 rounded p-[16px] mb-[32px]">
        <div className="grid grid-cols-[1fr_auto] mb-4">
          <span className="text-[12px] text-gray80 font-medium">
            변경 필요 폐기물
          </span>
          <span className="text-[12px] text-gray80 font-medium">추가결제</span>
        </div>

        <div className="grid gap-4">
          <AddPaymentResult
            secondeItemName="통합 결제 항목"
            fristItemFee={fristItemFee * firstItemQuantity}
            secondItemFee={secondItemFee * secondItemQuantity}
            customData={integratedPaymentItems}
            firstItemQuantity={firstItemQuantity}
          />
        </div>
      </section>
    );
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader
          title={isFixQuery ? "수거불가사유 수정" : "수거불가사유 입력"}
          onClose={handleClose}
        />
        <form
          className="px-[20px] py-[16px] flex flex-col gap-[32px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name="additionPaymentYn"
            render={({ field: { onChange } }) => (
              <Button
                type="button"
                buttonType="outline"
                className="p-[12px_16px]"
                onClick={canInteract ? handleMove : undefined} // 조건부 이벤트 핸들러
                disabled={!canInteract}

                // onChange={onChange}
              >
                추가결제 필요
              </Button>
            )}
          />

          <ReasonTextArea />
          {renderPaymentSection()}
          <ReasonPhoto />
          <Button type="submit">등록</Button>
          <Modal
            open={showFinishModal}
            onOpenChange={setShowFinishModal}
            onConfirm={() => router.push(`/collector/collector-status`)}
            description={`수거불가사유가 ${isFixQuery ? `수정` : `등록`}되었습니다.`}
            confirmButton={{ text: "확인" }}
          />
        </form>
      </MainContainer>
    </FormProvider>
  );
}
