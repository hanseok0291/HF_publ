import DetailListContainer from "./DetailListContainer";

export default function LocalGovernment({
  localGovernmentName
}: {
  localGovernmentName: string;
}) {
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">지자체</p>
      <p className="text-[14px] font-normal">{localGovernmentName}</p>
    </DetailListContainer>
  );
}
