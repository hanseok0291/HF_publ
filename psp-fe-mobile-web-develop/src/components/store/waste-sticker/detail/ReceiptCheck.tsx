import DetailListContainer from "./DetailListContainer";

export default function ReceiptCheck({ receiptYn }: { receiptYn: boolean }) {
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">수령여부</p>
      <p className="text-[14px] font-normal">
        {receiptYn ? "수령완료" : "미수령"}
      </p>
    </DetailListContainer>
  );
}
