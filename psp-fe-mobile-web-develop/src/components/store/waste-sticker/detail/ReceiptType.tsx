import DetailListContainer from "./DetailListContainer";

export default function ReceiptType({
  receiptTypeCodeName
}: {
  receiptTypeCodeName: string;
}) {
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">수령방식</p>
      <p className="text-[14px] font-normal">{receiptTypeCodeName}</p>
    </DetailListContainer>
  );
}
