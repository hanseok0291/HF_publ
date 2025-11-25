"use client";

import AddPayment from "./AddPayment";
import ChangeNeedWaste from "./ChangeNeedWaste";

type UseAddPaymentType = {
  secondItemFee: number;
  secondeItemName: string;
  fristItemFee: number;
  firstItemQuantity: number;
  secondItemQuantity?: number; // 필요한 경우 secondItemQuantity도 추가
  customData?: Array<{
    id: string;
    label: string;
    content: string;
    amount: number;
    quantity: number;
  }>;
};

export default function AddPaymentResult({
  secondItemFee,
  secondeItemName,
  fristItemFee,
  firstItemQuantity,
  secondItemQuantity = 1, // 기본값 설정
  customData
}: UseAddPaymentType) {
  const parseItemString = (input: string) => {
    const match = input.match(/\[(.*?)\/(.*?)\] (.*)/);

    if (match) {
      return [match[1], match[2], match[3]];
    } else {
      return ["", "", input];
    }
  };

  console.log(customData);

  // 통합된 데이터가 있는 경우 사용
  if (customData && customData.length > 0) {
    return (
      <div className="grid gap-4">
        {customData.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_auto]">
            <ChangeNeedWaste label={item.label} content={item.content} />
            <AddPayment amount={item.amount} />
          </div>
        ))}
      </div>
    );
  }

  // 기존 방식 (단일 항목 표시)
  const parseItemName = parseItemString(secondeItemName);

  // 총 차액 계산 (변경된 금액 총합 - 기존 금액 총합)
  const totalAmount =
    secondItemFee * secondItemQuantity - fristItemFee * firstItemQuantity;

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto]">
        <ChangeNeedWaste
          label={
            parseItemName[0] && parseItemName[1]
              ? `${parseItemName[0]}/${parseItemName[1]}`
              : ""
          }
          content={`${parseItemName[2] ?? secondeItemName} (${firstItemQuantity}개)`}
        />
        <AddPayment amount={totalAmount} />
      </div>
    </div>
  );
}
