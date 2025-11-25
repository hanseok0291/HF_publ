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
    <div className="flex items-center gap-[8px] mb-[40px] ">
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
  );
}
