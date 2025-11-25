// 주소 검색 전 도움글
export default function SearchInfoText() {
  return (
    <div className="mt-[32px] flex flex-col gap-2">
      <h4 className="text-[14px] font-semibold text-[#222]">
        관할지역 통합검색 Tip
      </h4>
      <div className="flex flex-col">
        <p className="text-[14px] text-[#222]">
          도로명
          <span className="text-[14px] font-semibold text-[#222]">
            + 건물번호
          </span>
          (예 : 송파대로 570)
        </p>
        <p className="text-[14px] text-[#222]">
          동/읍/면/리
          <span className="text-[14px] font-semibold text-[#222]">+ 번지</span>
          (예 : 신천동 7-30)
        </p>
        <p className="text-[14px] text-[#222]">
          건물명, 아파트명 (예 : 반포자이아파트)
        </p>
      </div>
    </div>
  );
}
