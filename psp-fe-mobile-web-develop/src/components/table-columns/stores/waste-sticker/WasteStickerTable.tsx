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
    <div className="flex flex-col flex-grow overflow-y-auto">
      <div className="flex-grow">
        {query === "trash-bag" ? <TrashBagTable /> : <StickerTable />}
      </div>
      {selectedList.length > 0 && (
        <div className="px-[20px] mt-[52px] mb-[40px]">
          <Button className="w-full" onClick={() => router.push(pushLink)}>
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
