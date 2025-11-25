"use client";

import SearchStatusChip from "./SearchStatusChip";

type SearchAddressResultProps = {
  item?: any;
  onClick?: () => void;
};

// 주소 검색 결과
export default function SearchAddressResult({
  item,
  onClick
}: SearchAddressResultProps) {
  return (
    <div
      className="flex flex-row items-center justify-between self-stretch border-b-[1px] p-[20px]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-[8px] w-[246px]">
        <p className="text-[12px] leading-5">
          (도로명) {item.sdNm} {item.sggNm} {item.legalEmdNm} {item.roadNm}
        </p>
        <p className="text-[12px] leading-5">
          (지번) {item.sdNm} {item.sggNm} {item.legalEmdNm} {item.jibunMainNo}
          {item.jibunSubNo > 0 ? -item.jibunSubNo : ""}
        </p>
      </div>
      <SearchStatusChip status={item.takeAwayExceptionYn} />
    </div>
  );
}
