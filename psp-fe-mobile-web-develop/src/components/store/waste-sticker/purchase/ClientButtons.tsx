"use client";

import { ClientButtonsType } from "@/types/store/waste-sticker/AddWasteStickerResult.type";
import Button from "@/components/common/Button";

export default function ClientButtons({
  handleSubmit,
  onSubmit,
  watchPayment,
  resetForm
}: ClientButtonsType) {
  return (
    <>
      {/* 모바일: 하단 고정 버튼 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-[16px] z-10">
        <Button
          disabled={watchPayment === undefined}
          className="w-full h-[52px] text-[16px] font-semibold disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-white"
          onClick={handleSubmit(onSubmit)}
        >
          신청하기
        </Button>
      </div>
      
      {/* PC: 기존 버튼 레이아웃 */}
      <div className="hidden lg:flex items-center gap-[8px] mb-[40px]">
        <Button buttonType="cancel" onClick={() => resetForm(true)} type="button">
          초기화
        </Button>
        <Button
          disabled={watchPayment === undefined}
          className="flex-1 disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-gray60"
          onClick={handleSubmit(onSubmit)}
        >
          신청
        </Button>
      </div>
    </>
  );
}
