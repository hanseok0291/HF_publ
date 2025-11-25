import { useEffect, useState } from "react";
import {
  formatNumberWithCommas,
  formatNumberWithoutCommas
} from "@/utils/formatUtils";

type PaymentAmountProps = {
  addStickers: any;
  selectedList: any;
};
export default function PaymentAmount({
  addStickers,
  selectedList
}: PaymentAmountProps) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const total = () => {
    let totalAmount = 0;
    let totalQuantity = 0;

    selectedList.forEach((selectedItem: any) => {
      const matchingSticker = addStickers.find(
        (sticker: any) => sticker.id === selectedItem.id
      );

      if (matchingSticker) {
        totalAmount +=
          selectedItem.fee *
          formatNumberWithoutCommas(matchingSticker.purchaseQuantity);
        totalQuantity += formatNumberWithoutCommas(
          matchingSticker.purchaseQuantity
        );
      }
    });

    setTotalAmount(totalAmount);
    setTotalQuantity(totalQuantity);
  };

  useEffect(() => {
    total();
  }, [selectedList, addStickers]);

  return (
    <section className="bg-gray20 rounded p-[16px] mb-[32px]">
      <div className="flex justify-between items-center mb-[12px]">
        <span className="text-[12px] text-gray80 font-medium">총 구매수량</span>
        <p className="text-fail text-[18px] font-bold">
          {formatNumberWithCommas(totalQuantity)}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-gray80 font-medium">총 결제금액</span>
        <p className="text-fail text-[18px] font-bold">
          {totalAmount === 0 ? "0" : formatNumberWithCommas(totalAmount)}
        </p>
      </div>
    </section>
  );
}
