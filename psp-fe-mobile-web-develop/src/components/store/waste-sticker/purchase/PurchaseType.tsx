"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../common/Button";
import PurchaseTypeModal from "./PurchaseTypeModal";
import useParchaseSuccessCheck from "@/stores/usePurchaseSuccessCheck";

type PurchaseTypePorps = {
  pushLink: string;
};

export default function PurchaseType({ pushLink }: PurchaseTypePorps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const { setSelection } = useParchaseSuccessCheck();

  // 화면 크기 변경 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsPC(isLargeScreen);
      
      // PC에서 모바일로 전환 시 모달 닫기
      if (!isLargeScreen && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isModalOpen]);

  const handleButtonClick = () => {
    // PC 버전에서는 모달 열기, 모바일에서는 라우팅
    if (isPC) {
      setIsModalOpen(true);
    } else {
      router.push(pushLink);
    }
  };

  const handleNext = () => {
    setSelection();
    router.push(pushLink);
  };

  return (
    <>
      <section className="flex flex-col gap-[12px]">
        <label htmlFor="purchaseType" className="text-[15px] font-bold text-black">
          구매 권종<span className="text-fail ml-[2px]">*</span>
        </label>
        <Button 
          buttonType="outline"
          onClick={handleButtonClick}
          className="w-auto justify-start border border-[#3F3F46] rounded-[4px] px-[16px] py-[6px] text-[12px] text-[#222] leading-1"
        >
          등록하기
        </Button>
      </section>

      {/* PC 버전 모달 */}
      {isPC && (
        <PurchaseTypeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onNext={handleNext}
        />
      )}
    </>
  );
}
