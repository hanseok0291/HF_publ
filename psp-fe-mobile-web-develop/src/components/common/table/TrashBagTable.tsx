import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { WasteStickerDataType } from "@/components/table-columns/stores/waste-sticker/WasteStickerColumns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import usePurcase from "@/stores/usePurcase";
import Checkbox from "../Checkbox";

const TrashBagTable = () => {
  const { dataList, setSelectedList, selectedList } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setSelectedList: state.setSelectedList,
      selectedList: state.selectedList
    }))
  );

  // 모든 항목을 topStandardName으로 그룹핑
  const groupedData = dataList.reduce(
    (acc, item) => {
      if (!acc[item.topStandardName]) acc[item.topStandardName] = [];
      acc[item.topStandardName].push(item);
      return acc;
    },
    {} as Record<string, WasteStickerDataType[]>
  );

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [openItems, setOpenItem] = useState<string[]>([]);

  // 초기 체크 상태 설정
  useEffect(() => {
    const topNames = selectedList.map((item) => item.topStandardName);
    setOpenItem([...openItems, ...topNames]);
  }, [selectedList]);

  // 초기 체크 상태 설정 - 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    const initialCheckedState: Record<string, boolean> = {};

    // 개별 항목에 대한 초기 상태
    dataList.forEach((item) => {
      initialCheckedState[item.id] = !!selectedList.find(
        (selectedItem) => selectedItem.id === item.id
      );
    });

    setCheckedState(initialCheckedState);
  }, [dataList]); // dataList가 변경될 때만 실행

  // 개별 항목 체크/해제 처리
  const handleItemCheck = (itemId: string, checked: boolean) => {
    const newCheckedState = { ...checkedState };
    newCheckedState[itemId] = checked;

    // 아이템 체크 상태 업데이트
    const itemData = dataList.find((item) => item.id === itemId);

    if (itemData) {
      // 선택된 항목 목록 업데이트
      if (checked) {
        if (!selectedList.some((item) => item.id === itemId)) {
          setSelectedList([...selectedList, itemData]);
        }
      } else {
        setSelectedList(selectedList.filter((item) => item.id !== itemId));
      }

      setCheckedState(newCheckedState);
    }
  };

  return (
    <div>
      <div>
        <label className="flex items-center justify-between bg-[#F4F4F4] py-3 px-5">
          <span className="text-[#777] text-[13px] font-medium">
            품목 / 규격
          </span>
          <span className="text-[#777] text-[13px] font-medium">
            개당 수수료
          </span>
        </label>
      </div>

      {/* 모든 항목을 아코디언으로 표시 */}
      {Object.keys(groupedData).length > 0 ? (
        <Accordion
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={setOpenItem}
        >
          {Object.entries(groupedData).map(([topStandard, items]) => (
            <AccordionItem key={topStandard} value={topStandard}>
              <AccordionTrigger className="border-t px-4" position="before">
                <div className="flex items-center justify-start pl-2 pt-1 w-full">
                  <div className="flex items-start">
                    <span
                      className={`text-[15px] ${
                        checkedState[topStandard] ? "font-medium" : ""
                      }`}
                    >
                      {topStandard}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-[56px]">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center pr-4"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          className="mr-2 size-4"
                          checked={
                            checkedState[item.id] ||
                            false ||
                            selectedList.some(
                              (selectedItem) => selectedItem.id === item.id
                            )
                          }
                          onChange={(e) =>
                            handleItemCheck(item.id, e.target.checked)
                          }
                        />

                        <span className="text-sm">{item.standardName}</span>
                      </div>
                      <span className="text-sm w-[60px] text-center break-words">
                        {item.fee.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-500">해당하는 데이터가 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default TrashBagTable;
