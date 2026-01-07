import { PurchaseDateType } from "@/types/store/waste-sticker/Purchase.type";
import Input from "../../../common/Input";

export default function PurchaseDate({ formatDate }: PurchaseDateType) {
  return (
    <section className="flex flex-col gap-[12px]">
      <label htmlFor="purchaseDate" className="text-[15px] font-bold text-black">
        구매 신청일
      </label>
      <Input
        placeholder={formatDate}
        readOnly
        className="bg-gray-100 p-[11px_12px] h-auto placeholder:text-[#A1A1AA] border border-[#E4E4E7] rounded-[4px]"
      />
    </section>
  );
}
