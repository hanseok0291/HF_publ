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

const StickerTable = () => {
  const { dataList, setSelectedList, selectedList } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setSelectedList: state.setSelectedList,
      selectedList: state.selectedList
    }))
  );

  // 모든 데이터를 그룹핑 (middle이 null인 경우 별도 처리)
  const groupedData = dataList.reduce(
    (acc, item) => {
      if (!acc[item.topStandardName]) {
        acc[item.topStandardName] = {
          middleGroups: {},
          directStandards: []
        };
      }

      // middle이 null이거나 빈 문자열인 경우 직접 standard로 연결
      if (!item.middleStandardName) {
        acc[item.topStandardName].directStandards.push(item);
      } else {
        if (!acc[item.topStandardName].middleGroups[item.middleStandardName]) {
          acc[item.topStandardName].middleGroups[item.middleStandardName] = [];
        }
        acc[item.topStandardName].middleGroups[item.middleStandardName].push(
          item
        );
      }

      return acc;
    },
    {} as Record<
      string,
      {
        middleGroups: Record<string, WasteStickerDataType[]>;
        directStandards: WasteStickerDataType[];
      }
    >
  );

  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [openItems, setOpenItem] = useState<string[]>([]);

  // 초기 체크 상태 설정
  useEffect(() => {
    const topNames = selectedList.map((item) => item.topStandardName);
    const middleNames = selectedList.map((item) => item.middleStandardName);
    setOpenItem([...openItems, ...topNames, ...middleNames]);
  }, [selectedList]); // dataList가 변경될 때만 실행

  const handleItemCheck = (itemId: string, checked: boolean) => {
    const newCheckedState = { ...checkedState };
    newCheckedState[itemId] = checked;

    const itemData = dataList.find((item) => item.id === itemId);

    if (itemData) {
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

  // 초기 체크 상태 설정
  useEffect(() => {
    const initialCheckedState: Record<string, boolean> = {};
    dataList.forEach((item) => {
      initialCheckedState[item.id] = initialCheckedState[item.id] =
        !!selectedList.find((selectedItem) => selectedItem.id === item.id);
    });
    setCheckedState(initialCheckedState);
  }, [dataList]);

  return (
    <div>
      <div>
        <label className="flex items-center justify-between bg-[#F4F4F4] py-3 px-5">
          <span className="text-[#777] text-[13px] font-medium">
            품목 / 세부품목 / 규격
          </span>
          <span className="text-[#777] text-[13px] font-medium">
            개당 수수료
          </span>
        </label>
      </div>

      {/* 모든 항목을 아코디언 형식으로 표시 */}
      {Object.keys(groupedData).length > 0 ? (
        <Accordion
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={setOpenItem}
        >
          {Object.entries(groupedData).map(([topStandard, data]) => (
            <AccordionItem key={topStandard} value={topStandard}>
              <AccordionTrigger className="border-t px-4" position="before">
                <div className="flex items-start justify-start pl-2 pt-1 w-full">
                  <span
                    className={`text-[15px] ${
                      checkedState[topStandard] ? "font-medium" : ""
                    }`}
                  >
                    {topStandard}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-[56px]">
                {/* Middle 그룹이 있는 경우 */}
                {Object.keys(data.middleGroups).length > 0 && (
                  <Accordion
                    type="multiple"
                    value={openItems}
                    onValueChange={setOpenItem}
                  >
                    {Object.entries(data.middleGroups).map(
                      ([middleStandard, standardList]) => (
                        <AccordionItem
                          key={middleStandard}
                          value={middleStandard}
                        >
                          <AccordionTrigger
                            className="text-md pr-4"
                            position="before"
                          >
                            <div className="flex items-start w-full">
                              <span className="pl-1">{middleStandard}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-[56px]">
                            <div className="space-y-2">
                              {standardList.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center pr-6"
                                >
                                  <div className="flex items-center">
                                    <Checkbox
                                      className="mr-2 size-4"
                                      checked={
                                        checkedState[item.id] ||
                                        false ||
                                        selectedList.some(
                                          (selectedItem) =>
                                            selectedItem.id === item.id
                                        )
                                      }
                                      onChange={(e) =>
                                        handleItemCheck(
                                          item.id,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span className="text-sm">
                                      {item.standardName}
                                    </span>
                                  </div>
                                  <span className="text-sm">
                                    {item.fee.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                )}

                {/* Middle이 null인 경우 직접 standard 표시 */}
                {data.directStandards.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {data.directStandards.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center pr-4"
                      >
                        <div className="flex items-center">
                          <Checkbox
                            className="mr-2 size-4"
                            checked={checkedState[item.id] || false}
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
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-500 p-4 text-center">
          해당하는 데이터가 존재하지 않습니다.
        </p>
      )}
    </div>
  );
};

export default StickerTable;
