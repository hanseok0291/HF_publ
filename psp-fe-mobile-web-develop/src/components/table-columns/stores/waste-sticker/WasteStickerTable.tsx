"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/common/Button";
import StickerTable from "@/components/common/table/StickerTable";
import TrashBagTable from "@/components/common/table/TrashBagTable";
import usePurcase from "@/stores/usePurcase";

// 데이터 타입 정의
type WasteStickerDataType = {
  id: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  holdInventory: number;
  singlenessStandardYn: boolean;
  type?: "accordion" | "text";
};

// 테이블 컴포넌트 구현
export default function WasteStickerTable({ pushLink }: any) {
  const { setAddStickers, selectedList } = usePurcase(
    useShallow((state) => ({
      setAddStickers: state.setAddStickers,
      selectedList: state.selectedList
    }))
  );

  const router = useRouter();
  const pathname = usePathname();
  const query = pathname.split("/")[2];
  // 선택된 아이템 배열 변경 시 스토어 업데이트
  useEffect(() => {
    const data = selectedList.map((item) => ({
      id: item.id,
      purchaseQuantity: 1
    }));

    console.log("서버로 전송할 스티커 데이터", data);
    setAddStickers(data);
  }, [selectedList]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {query === "trash-bag" ? <TrashBagTable /> : <StickerTable />}
      </div>
      {/* 하단 고정 다음 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-[16px] z-10">
        <Button 
          disabled={selectedList.length === 0}
          className="w-full h-[52px] text-[16px] font-semibold disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-white"
          onClick={() => router.push(pushLink)}
        >
          다음
        </Button>
      </div>
      {/* 버튼 공간 확보 */}
      <div className="h-[84px]"></div>
    </div>
  );
}
