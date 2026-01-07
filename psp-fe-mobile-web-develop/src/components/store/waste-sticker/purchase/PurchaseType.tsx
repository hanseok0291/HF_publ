"use client";

import { useState } from "react";
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
  const { setSelection } = useParchaseSuccessCheck();

  const handleButtonClick = () => {
    // PC 버전에서는 모달 열기, 모바일에서는 라우팅
    if (window.innerWidth >= 1024) {
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
      <div className="hidden lg:block">
        <PurchaseTypeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onNext={handleNext}
        />
      </div>
    </>
  );
}
