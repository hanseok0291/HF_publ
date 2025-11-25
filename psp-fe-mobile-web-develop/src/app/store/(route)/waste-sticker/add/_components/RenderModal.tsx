"use client";

import { AccountPurchaseResponse } from "@/types/apiType/Common.type";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import {
  formatDateWithTime,
  formatNumberWithCommas
} from "@/utils/formatUtils";

type RenderModal = {
  setSuccessSubmit: (value: boolean) => void;
  fetchData: string;
  setFailSubmit: (value: boolean) => void;
  setShowReceipt: (value: boolean) => void;
  setPaymentAccount: (value: boolean) => void;
  setVirtualAccount: (value: boolean) => void;
  successSubmit: boolean;
  failSubmit: boolean;
  showReceipt: boolean;
  paymentAccount: boolean;
  virtualAccount: boolean;
  accountData?: AccountPurchaseResponse | null;
  errorMessage?: any | null;
  setErrorMessage: (value: any) => void;
};

type ModalConfig = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  description: string;
  buttonCount?: number;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  buttonStyle?: string;
};

export default function RenderModal({
  setSuccessSubmit,
  fetchData,
  setFailSubmit,
  setShowReceipt,
  setPaymentAccount,
  successSubmit,
  failSubmit,
  showReceipt,
  paymentAccount,
  virtualAccount,
  setVirtualAccount,
  accountData,
  errorMessage,
  setErrorMessage
}: RenderModal) {
  const router = useRouter();
  const pathname = usePathname();
  const query = pathname.split("/")[2];
  const BUTTON_STYLE = "max-w-[136px] h-[48px]";

  // 상세 페이지로 이동하는 함수
  const navigateToDetail = () => {
    router.push(`/store/${query}/detail/${fetchData}`);
  };

  // 계좌번호 복사하기
  const copyToAccountNo = () => {
    navigator.clipboard.writeText(
      accountData?.bankAccount ? accountData?.bankAccount : ""
    );
    toast({
      title: "계좌번호가 복사되었습니다.",
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
  };
  // 리스트 페이지로 이동하는 함수
  const navigateToList = () => {
    router.push(`/store/${query}/detail`);
  };

  const successModalConfig: ModalConfig = {
    isOpen: successSubmit,
    setIsOpen: setSuccessSubmit,
    description: `구매신청이 \n완료됐습니다.`,
    buttonCount: 1,
    confirmText: "확인",
    onConfirm: () => {
      setSuccessSubmit(false);
      navigateToDetail();
    },
    buttonStyle: BUTTON_STYLE
  };

  const failModalConfig: ModalConfig = {
    isOpen: failSubmit,
    setIsOpen: setFailSubmit,
    description: errorMessage ? errorMessage : `구매신청이 \n실패 했습니다.`,
    buttonCount: 1,
    confirmText: "확인",
    onConfirm: () => {
      setErrorMessage(null);
      setFailSubmit(false);
    },
    buttonStyle: BUTTON_STYLE
  };

  const receiptModalConfig: ModalConfig = {
    isOpen: showReceipt,
    setIsOpen: setShowReceipt,
    description: `지자체 담당자 확인 후\n 구매 신청건에 대한 직접수납 \n진행해 주세요.`,
    confirmText: "상세 페이지 이동",
    cancelText: `리스트 페이지\n 이동`,
    onConfirm: () => {
      setShowReceipt(false);
      navigateToDetail();
    },
    onCancel: () => {
      setShowReceipt(false);
      navigateToList();
    },
    buttonStyle: "max-w-[136px] p-[12px_20px]"
  };

  const paymentAccountModalConfig: ModalConfig = {
    isOpen: paymentAccount,
    setIsOpen: setPaymentAccount,
    description: `내통장결제 결과는 \n상세 페이지를 확인해주세요`,
    confirmText: "상세 페이지 이동",
    cancelText: `리스트 페이지\n 이동`,
    onConfirm: () => {
      setPaymentAccount(false);
      navigateToDetail();
    },
    onCancel: () => {
      setPaymentAccount(false);
      navigateToList();
    },
    buttonStyle: BUTTON_STYLE
  };

  const virtualAccountModalConfig: ModalConfig = {
    isOpen: virtualAccount,
    setIsOpen: setVirtualAccount,
    description: `은행 : ${accountData?.bankName ? accountData.bankName : "-"}
    계좌번호 : ${accountData?.bankAccount ? accountData?.bankAccount : "-"}
    예금주명 : ${accountData?.inputName ? accountData?.inputName : "-"}
    납부금액 : ${accountData?.pmtAmt ? `${formatNumberWithCommas(accountData?.pmtAmt)}원` : "-"}
    납부기간 : ${accountData?.expireDate ? `~${formatDateWithTime(accountData?.expireDate)}` : "-"}`,
    confirmText: "상세 페이지 이동",
    cancelText: `복사하기`,
    onConfirm: () => {
      setVirtualAccount(false);
      navigateToDetail();
    },
    onCancel: () => {
      setVirtualAccount(false);
      copyToAccountNo();
    },
    buttonStyle: BUTTON_STYLE
  };

  // 모달 설정 객체
  const modalConfigs: Record<string, ModalConfig> = {
    success: successModalConfig,
    fail: failModalConfig,
    receipt: receiptModalConfig,
    paymentAccount: paymentAccountModalConfig,
    virtualAccount: virtualAccountModalConfig
  };

  // 모달 렌더링 함수
  const renderModal = (config: ModalConfig) => {
    const {
      isOpen,
      setIsOpen,
      description,
      confirmText = "확인",
      cancelText,
      onConfirm,
      onCancel,
      buttonStyle
    } = config;

    return (
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        description={description}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButton={{
          text: confirmText,
          className: buttonStyle
        }}
        cancelButton={
          cancelText
            ? {
                text: cancelText,
                className: buttonStyle
              }
            : undefined
        }
      />
    );
  };

  return (
    <>
      {Object.values(modalConfigs).map(
        (config, index) => config.isOpen && renderModal(config)
      )}
    </>
  );
}
