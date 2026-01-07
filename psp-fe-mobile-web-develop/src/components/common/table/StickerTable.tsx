import { useEffect, useState, useMemo } from "react";
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

  // 임시 데이터 (API 데이터가 없을 때 사용)
  const mockData: WasteStickerDataType[] = [
    {
      id: "mock-1",
      topStandardName: "재사용봉투",
      middleStandardName: "재사용봉투2",
      standardName: "규격명 사이즈",
      fee: 0,
      holdInventory: 100,
      singlenessStandardYn: false,
      type: "accordion"
    },
    {
      id: "mock-2",
      topStandardName: "재사용봉투",
      middleStandardName: "재사용봉투2",
      standardName: "양문형 냉장고 600L 이상",
      fee: 0,
      holdInventory: 50,
      singlenessStandardYn: false,
      type: "accordion"
    },
    {
      id: "mock-3",
      topStandardName: "음식물 쓰레기",
      middleStandardName: "",
      standardName: "음식물 쓰레기 봉투",
      fee: 0,
      holdInventory: 200,
      singlenessStandardYn: false,
      type: "text"
    },
    {
      id: "mock-4",
      topStandardName: "일반폐기물",
      middleStandardName: "대형폐기물",
      standardName: "가전제품",
      fee: 5000,
      holdInventory: 30,
      singlenessStandardYn: false,
      type: "accordion"
    },
    {
      id: "mock-5",
      topStandardName: "일반폐기물",
      middleStandardName: "대형폐기물",
      standardName: "가구류",
      fee: 10000,
      holdInventory: 15,
      singlenessStandardYn: false,
      type: "accordion"
    }
  ];

  // 데이터가 없으면 임시 데이터 사용 (useMemo로 메모이제이션)
  const displayData = useMemo(() => {
    return dataList.length > 0 ? dataList : mockData;
  }, [dataList]);

  // 모든 데이터를 그룹핑 (middle이 null인 경우 별도 처리)
  const groupedData = displayData.reduce(
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

  const [openItems, setOpenItem] = useState<string[]>([]);

  // checkedState를 selectedList에서 직접 계산 (useMemo 사용하여 무한 루프 방지)
  const checkedState = useMemo(() => {
    const state: Record<string, boolean> = {};
    displayData.forEach((item) => {
      state[item.id] = selectedList.some((selectedItem) => selectedItem.id === item.id);
    });
    return state;
  }, [displayData, selectedList]);

  // 아코디언 열림 상태 설정 (selectedList가 변경될 때만, 초기 한 번만)
  useEffect(() => {
    if (selectedList.length > 0) {
      const topNames = selectedList.map((item) => item.topStandardName).filter(Boolean);
      const middleNames = selectedList.map((item) => item.middleStandardName).filter(Boolean);
      const newOpenItems = [...new Set([...topNames, ...middleNames])];
      if (newOpenItems.length > 0) {
        setOpenItem((prev) => {
          const combined = [...new Set([...prev, ...newOpenItems])];
          // 이전과 같으면 업데이트하지 않음 (무한 루프 방지)
          if (combined.length === prev.length && combined.every((item, idx) => item === prev[idx])) {
            return prev;
          }
          return combined;
        });
      }
    }
  }, [selectedList.length]); // selectedList.length만 의존성으로 사용하여 무한 루프 방지

  const handleItemCheck = (itemId: string, checked: boolean) => {
    const itemData = displayData.find((item) => item.id === itemId);

    if (itemData) {
      // 선택 리스트만 업데이트 (checkedState는 useMemo로 자동 계산됨)
      if (checked) {
        if (!selectedList.some((item) => item.id === itemId)) {
          setSelectedList([...selectedList, itemData]);
        }
      } else {
        setSelectedList(selectedList.filter((item) => item.id !== itemId));
      }
    }
  };

  // 전체 선택 상태 계산
  const allChecked = displayData.length > 0 && displayData.every((item) => checkedState[item.id]);
  const someChecked = displayData.some((item) => checkedState[item.id]);

  // 전체 선택/해제 핸들러
  const handleSelectAll = (checked: boolean) => {
    displayData.forEach((item) => {
      handleItemCheck(item.id, checked);
    });
  };

  return (
    <div className="flex flex-col">
      {/* 리스트 헤더 - 모바일 전용 */}
      <div className="sticky top-0 bg-[#F4F4F4] z-10 lg:hidden">
        <div className="flex items-center justify-between py-[12px] px-[20px]">
          <div className="flex items-center">
            <Checkbox
              className="mr-[12px] flex-shrink-0"
              checked={allChecked}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span className="text-[#777] text-[13px] font-medium">
              품목 / 세부품목 / 규격
            </span>
          </div>
          <span className="text-[#777] text-[13px] font-medium">
            개당 수수료
          </span>
        </div>
      </div>

      {/* 모든 항목을 아코디언 형식으로 표시 */}
      {Object.keys(groupedData).length > 0 ? (
        <Accordion
          type="multiple"
          className="w-full"
          value={openItems}
          onValueChange={setOpenItem}
        >
          {Object.entries(groupedData).map(([topStandard, data]) => {
            // 해당 topStandard의 모든 아이템 가져오기 (중첩된 모든 하위 아이템 포함)
            const getAllItemsForTopStandard = () => {
              const items: WasteStickerDataType[] = [];
              // directStandards 추가
              items.push(...data.directStandards);
              // middleGroups의 모든 standardList 아이템 추가
              Object.values(data.middleGroups).forEach((standardList) => {
                items.push(...standardList);
              });
              return items;
            };
            const topStandardItems = getAllItemsForTopStandard();
            const topStandardChecked = topStandardItems.length > 0 && 
              topStandardItems.every((item) => checkedState[item.id]);
            return (
              <AccordionItem key={topStandard} value={topStandard} className="border-b border-gray-100">
                <div
                  className="flex items-center px-[20px] py-[12px] cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 아코디언 토글은 AccordionTrigger가 처리하도록 함
                  }}
                >
                  <Checkbox
                    className="mr-[12px] flex-shrink-0"
                    checked={topStandardChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      const checked = e.target.checked;
                      // 해당 topStandard의 모든 아이템 선택/해제 (한 번에 처리)
                      if (checked) {
                        const newSelectedList = [...selectedList];
                        topStandardItems.forEach((item) => {
                          if (!newSelectedList.some((selected) => selected.id === item.id)) {
                            newSelectedList.push(item);
                          }
                        });
                        setSelectedList(newSelectedList);
                      } else {
                        setSelectedList(selectedList.filter((item) => !topStandardItems.some((topItem) => topItem.id === item.id)));
                      }
                    }}
                  />
                  <AccordionTrigger className="flex-1 px-0 py-0" position="before">
                    <div className="flex items-center justify-start w-full">
                      <span
                        className={`text-[14px] text-[#222] ${
                          topStandardChecked ? "font-medium" : ""
                        }`}
                      >
                        {topStandard} 최상위 카테고리
                      </span>
                    </div>
                  </AccordionTrigger>
                </div>

              <AccordionContent className="pl-[56px]">
                {/* Middle 그룹이 있는 경우 */}
                {Object.keys(data.middleGroups).length > 0 && (
                  <Accordion
                    type="multiple"
                    value={openItems}
                    onValueChange={setOpenItem}
                  >
                    {Object.entries(data.middleGroups).map(
                      ([middleStandard, standardList]) => {
                        const middleStandardChecked = standardList.length > 0 && 
                          standardList.every((item) => checkedState[item.id]);
                        return (
                          <AccordionItem
                            key={middleStandard}
                            value={middleStandard}
                          >
                            <div
                              className="flex items-center px-[20px] py-[12px] cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Checkbox
                                className="mr-[12px] flex-shrink-0"
                                checked={middleStandardChecked}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  const checked = e.target.checked;
                                  // 해당 middleStandard의 모든 아이템 선택/해제 (한 번에 처리)
                                  if (checked) {
                                    const newSelectedList = [...selectedList];
                                    standardList.forEach((item) => {
                                      if (!newSelectedList.some((selected) => selected.id === item.id)) {
                                        newSelectedList.push(item);
                                      }
                                    });
                                    setSelectedList(newSelectedList);
                                  } else {
                                    setSelectedList(selectedList.filter((item) => !standardList.some((stdItem) => stdItem.id === item.id)));
                                  }
                                }}
                              />
                              <AccordionTrigger className="flex-1 px-0 py-0" position="before">
                                <div className="flex items-center w-full">
                                  <span className="text-[14px] text-[#222]">{middleStandard} 중간 카테고리</span>
                                </div>
                              </AccordionTrigger>
                            </div>
                          <AccordionContent className="pl-[56px]">
                            <div className="space-y-0">
                              {standardList.map((item) => {
                                const isChecked = checkedState[item.id] || false;
                                return (
                                  <div
                                    key={item.id}
                                    className="flex justify-between items-center py-[12px] px-[20px]"
                                  >
                                    <div className="flex items-center flex-1 min-w-0">
                                      {/* 체크박스 영역: 체크/미체크 기능만 */}
                                      <div onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                          className="mr-[12px] flex-shrink-0"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            const checked = e.target.checked;
                                            // Zustand store에서 최신 상태 가져오기
                                            const currentState = usePurcase.getState();
                                            const currentSelectedList = currentState.selectedList;
                                            
                                            // 해당 아이템 선택/해제
                                            if (checked) {
                                              if (!currentSelectedList.some((selected) => selected.id === item.id)) {
                                                setSelectedList([...currentSelectedList, item]);
                                              }
                                            } else {
                                              setSelectedList(currentSelectedList.filter((selected) => selected.id !== item.id));
                                            }
                                          }}
                                        />
                                      </div>
                                      <span className="text-[14px] text-[#222] truncate">
                                        {item.standardName} 아이템
                                      </span>
                                    </div>
                                    <span className="text-[14px] text-[#222] ml-[16px] flex-shrink-0">
                                      {item.fee.toLocaleString()}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        );
                      }
                    )}
                  </Accordion>
                )}

                {/* Middle이 null인 경우 직접 standard 표시 */}
                {data.directStandards.length > 0 && (
                  <div className="space-y-0 mt-0">
                    {data.directStandards.map((item) => {
                      const isChecked = checkedState[item.id] || false;
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-[12px] px-[20px]"
                        >
                          <div className="flex items-center flex-1 min-w-0">
                            {/* 체크박스 영역: 체크/미체크 기능만 */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="mr-[12px] flex-shrink-0"
                                checked={isChecked}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  const checked = e.target.checked;
                                  // Zustand store에서 최신 상태 가져오기
                                  const currentState = usePurcase.getState();
                                  const currentSelectedList = currentState.selectedList;
                                  
                                  // 해당 아이템 선택/해제
                                  if (checked) {
                                    if (!currentSelectedList.some((selected) => selected.id === item.id)) {
                                      setSelectedList([...currentSelectedList, item]);
                                    }
                                  } else {
                                    setSelectedList(currentSelectedList.filter((selected) => selected.id !== item.id));
                                  }
                                }}
                              />
                            </div>
                            <span className="text-[14px] text-[#222] truncate">
                              {item.standardName} 아이템?
                            </span>
                          </div>
                          <span className="text-[14px] text-[#222] ml-[16px] flex-shrink-0">
                            {item.fee.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            );
          })}
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
