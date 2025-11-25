"use client";

import { useRouter } from "next/navigation";
import Button from "../../../common/Button";

type PurchaseTypePorps = {
  pushLink: string;
};

export default function PurchaseType({ pushLink }: PurchaseTypePorps) {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-[12px]">
      <label htmlFor="purchaseType" className="text-[16px] font-bold">
        구매 권종<span className="text-fail ml-[2px]">*</span>
      </label>
      <Button buttonType="outline" onClick={() => router.push(pushLink)}>
        등록
      </Button>
    </section>
  );
}
