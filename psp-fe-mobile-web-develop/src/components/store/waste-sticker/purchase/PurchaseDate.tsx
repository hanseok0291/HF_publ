import { PurchaseDateType } from "@/types/store/waste-sticker/Purchase.type";
import Input from "../../../common/Input";

export default function PurchaseDate({ formatDate }: PurchaseDateType) {
  return (
    <section className="flex flex-col gap-[12px]">
      <label htmlFor="purchaseDate" className="text-[16px] font-bold">
        구매 신청일
      </label>
      <Input
        placeholder={formatDate}
        readOnly
        className="bg-input_readonly p-[16px_12px] h-auto placeholder:text-black"
      />
    </section>
  );
}
