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
  const { dataList, setSelectedList, selectedList, addStickers, setAddStickers } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setSelectedList: state.setSelectedList,
      selectedList: state.selectedList,
      addStickers: state.addStickers,
      setAddStickers: state.setAddStickers
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
    },
    {
      id: "mock-6",
      topStandardName: "음식물 쓰레기 봉투",
      middleStandardName: "",
      standardName: "",
      fee: 9000,
      holdInventory: 99999,
      singlenessStandardYn: false,
      type: "text"
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
    // Zustand store에서 최신 상태 가져오기
    const currentState = usePurcase.getState();
    const currentSelectedList = currentState.selectedList;
    
    if (checked) {
      // 모든 아이템 선택
      const newSelectedList = [...currentSelectedList];
      displayData.forEach((item) => {
        if (!newSelectedList.some((selected) => selected.id === item.id)) {
          newSelectedList.push(item);
        }
      });
      setSelectedList(newSelectedList);
    } else {
      // 모든 아이템 해제
      setSelectedList([]);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 리스트 헤더 - 모바일 전용 */}
      <div className="sticky top-0 bg-[#F4F4F4] z-10 lg:hidden">
        <div className="flex items-center justify-between py-[12px] px-[20px]">
          <div className="flex items-center">
            <Checkbox
              className="mr-[8px] flex-shrink-0"
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
            
            // 최상위 카테고리만 있는 경우 감지 (하위 아이템이 없고, directStandards에 아이템이 하나만 있고, 그 아이템의 standardName이 빈 문자열이거나 topStandardName과 같은 경우)
            const isTopLevelOnly = Object.keys(data.middleGroups).length === 0 && 
              data.directStandards.length === 1 && 
              (!data.directStandards[0].standardName || data.directStandards[0].standardName === topStandard);
            
            // 최상위 카테고리만 있는 경우 아코디언 없이 바로 표시
            if (isTopLevelOnly) {
              const item = data.directStandards[0];
              const isChecked = checkedState[item.id] || false;
              const currentQuantity = addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1;
              return (
                <div key={topStandard} className="border-b border-[#E4E4E7] mb-[16px] lg:mb-0">
                  <div
                    className="flex items-center pl-[0] pr-[20px] py-[16px] lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-[16px] lg:px-[0] lg:py-[0] lg:my-[12px]"
                  >
                    <div className="flex items-center lg:col-span-1 lg:justify-start lg:min-w-0 lg:overflow-hidden">
                      <Checkbox
                        className="mr-[8px] flex-shrink-0"
                        checked={isChecked}
                        onChange={(e) => {
                          e.stopPropagation();
                          const checked = e.target.checked;
                          const currentState = usePurcase.getState();
                          const currentSelectedList = currentState.selectedList;
                          if (checked) {
                            if (!currentSelectedList.some((selected) => selected.id === item.id)) {
                              setSelectedList([...currentSelectedList, item]);
                              const currentAddStickers = usePurcase.getState().addStickers;
                              if (!currentAddStickers.find((s) => s.id === item.id)) {
                                setAddStickers([...currentAddStickers, { id: item.id, purchaseQuantity: 1 }]);
                              }
                            }
                          } else {
                            setSelectedList(currentSelectedList.filter((selected) => selected.id !== item.id));
                            const currentAddStickers = usePurcase.getState().addStickers;
                            setAddStickers(currentAddStickers.filter((s) => s.id !== item.id));
                          }
                        }}
                      />
                      <span className="text-[14px] text-[#0F0F10] lg:hidden truncate">{topStandard}</span>
                      <span className="hidden lg:inline text-[14px] text-[#0F0F10] truncate">{topStandard}</span>
                    </div>
                    {/* 최상위 카테고리만 있는 경우 - PC: 규격 (중앙 정렬) */}
                    <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center">
                      {item.standardName || "규격기재요"}
                    </span>
                    {/* 최상위 카테고리만 있는 경우 - PC: 개당 수수료 (중앙 정렬) */}
                    <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center">
                      {item.fee.toLocaleString()}
                    </span>
                    {/* 최상위 카테고리만 있는 경우 - PC: 보유 재고 (중앙 정렬) */}
                    <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center">
                      {item.holdInventory.toLocaleString()}
                    </span>
                    {/* 최상위 카테고리만 있는 경우 - PC: 수량 (중앙 정렬) */}
                    <div className="hidden lg:flex items-center justify-center gap-[8px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentQuantity > 1) {
                            const newAddStickers = addStickers.map((s) =>
                              s.id === item.id
                                ? { ...s, purchaseQuantity: currentQuantity - 1 }
                                : s
                            );
                            if (!addStickers.find((s) => s.id === item.id)) {
                              newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity - 1 });
                            }
                            setAddStickers(newAddStickers);
                          }
                        }}
                        className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentQuantity <= 1}
                      >
                        <span className="text-[12px] text-[#0F0F10] font-semibold">-</span>
                      </button>
                      <span className="text-[14px] text-[#0F0F10] font-semibold min-w-[40px] text-center">
                        {currentQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentQuantity < item.holdInventory) {
                            const newAddStickers = addStickers.map((s) =>
                              s.id === item.id
                                ? { ...s, purchaseQuantity: currentQuantity + 1 }
                                : s
                            );
                            if (!addStickers.find((s) => s.id === item.id)) {
                              newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity + 1 });
                            }
                            setAddStickers(newAddStickers);
                          }
                        }}
                        className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentQuantity >= item.holdInventory}
                      >
                        <span className="text-[12px] text-[#0F0F10] font-semibold">+</span>
                      </button>
                    </div>
                    {/* 모바일: 수수료만 (중앙 정렬) */}
                    <span className="text-[12px] text-[#3F3F46] flex-shrink-0 text-center lg:hidden">
                      {item.fee.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            }
            
            return (
              <AccordionItem key={topStandard} value={topStandard} className="border-b border-[#E4E4E7] mb-[16px] lg:mb-0">
                <div
                  className="flex items-center pl-[0] pr-[20px] py-[16px] cursor-pointer transition-colors lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-[16px] lg:px-[0] lg:py-[0] lg:my-[12px] lg:cursor-default"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 아코디언 토글은 AccordionTrigger가 처리하도록 함
                  }}
                >
                  <div className="flex items-center lg:col-span-1 lg:justify-start lg:min-w-0 lg:overflow-hidden">
                    <Checkbox
                      className="mr-[8px] flex-shrink-0"
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
                    <AccordionTrigger className="flex-1 px-0 py-0 lg:flex-none lg:px-0 lg:min-w-0 lg:overflow-hidden" position="before">
                      <div className="flex items-center justify-start w-full lg:min-w-0 lg:overflow-hidden">
                        <span
                          className={`text-[14px] text-[#0F0F10] lg:truncate ${
                            topStandardChecked ? "font-medium" : ""
                          }`}
                        >
                          <span className="lg:hidden">{topStandard} 최상위 카테고리</span>
                          <span className="hidden lg:inline">{topStandard}</span>
                        </span>
                      </div>
                    </AccordionTrigger>
                  </div>
                  {/* 최상위 카테고리 - PC: 규격 (중앙 정렬) */}
                  <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center"></span>
                  {/* 최상위 카테고리 - PC: 개당 수수료 (중앙 정렬) */}
                  <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center"></span>
                  {/* 최상위 카테고리 - PC: 보유 재고 (중앙 정렬) */}
                  <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center"></span>
                  {/* 최상위 카테고리 - PC: 수량 (중앙 정렬) */}
                  <span className="hidden lg:inline text-[14px] text-[#0F0F10] text-center font-semibold"></span>
                </div>

              <AccordionContent className="pl-[56px] lg:pl-0">
                {/* Middle 그룹이 있는 경우 - 중간 카테고리는 화살표 없이 항상 펼쳐진 상태 */}
                {Object.keys(data.middleGroups).length > 0 && (
                  <div className="space-y-0">
                    {Object.entries(data.middleGroups).map(
                      ([middleStandard, standardList], middleIndex) => {
                        const middleStandardChecked = standardList.length > 0 && 
                          standardList.every((item) => checkedState[item.id]);
                        return (
                          <div key={middleStandard} className={middleIndex === 0 ? '' : 'mt-[16px] lg:mt-0'}>
                            {/* 중간 카테고리 - 화살표 없이 항상 표시 */}
                            <div
                              className={`flex items-center pl-[28px] pr-[20px] py-[16px] lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-[16px] lg:px-[0] lg:py-[0] ${middleIndex === 0 ? 'lg:mt-[0] lg:mb-[12px]' : 'lg:my-[12px]'}`}
                            >
                              <div className={`flex items-center lg:col-span-1 lg:justify-start lg:min-w-0 lg:overflow-hidden ${middleIndex === 0 ? 'lg:pl-[28px]' : ''}`}>
                                <Checkbox
                                  className="mr-[8px] flex-shrink-0"
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
                                <span className="text-[13px] text-[#3F3F46] lg:hidden">{middleStandard} 중간 카테고리</span>
                                <span className="hidden lg:inline text-[13px] text-[#3F3F46] truncate">{middleStandard}</span>
                              </div>
                              {/* 중간 카테고리 - PC: 규격 (중앙 정렬) */}
                              <span className="hidden lg:inline text-[13px] text-[#3F3F46] text-center"></span>
                              {/* 중간 카테고리 - PC: 개당 수수료 (중앙 정렬) */}
                              <span className="hidden lg:inline text-[13px] text-[#3F3F46] text-center"></span>
                              {/* 중간 카테고리 - PC: 보유 재고 (중앙 정렬) */}
                              <span className="hidden lg:inline text-[13px] text-[#3F3F46] text-center"></span>
                              {/* 중간 카테고리 - PC: 수량 (중앙 정렬) */}
                              <span className="hidden lg:inline text-[13px] text-[#0F0F10] text-center font-semibold"></span>
                            </div>
                            {/* 최하단 아이템들 - 바로 표시 */}
                            <div className="space-y-0 lg:pl-0 mt-[8px] lg:mt-0">
                              {standardList.map((item, itemIndex) => {
                                const isChecked = checkedState[item.id] || false;
                                return (
                                  <div
                                    key={item.id}
                                    className={`flex justify-between items-center pl-[50px] pr-[20px] ${itemIndex === 0 ? 'pt-[8px] pb-[8px]' : 'py-[8px]'} lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-[16px] lg:px-[0] lg:py-[0] ${itemIndex === 0 ? 'lg:mt-[8px] lg:mb-[12px]' : 'lg:my-[12px]'}`}
                                  >
                                    {/* 모바일: 체크박스 + 품목/세부품목/규격 */}
                                    <div className="flex items-center flex-1 min-w-0 lg:col-span-1 lg:justify-start lg:min-w-0 lg:overflow-hidden lg:pl-[56px]">
                                      {/* 체크박스 영역: 체크/미체크 기능만 */}
                                      <div onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                          className="mr-[8px] flex-shrink-0"
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
                                                // 수량 초기화 (1로 설정)
                                                const currentAddStickers = usePurcase.getState().addStickers;
                                                if (!currentAddStickers.find((s) => s.id === item.id)) {
                                                  setAddStickers([...currentAddStickers, { id: item.id, purchaseQuantity: 1 }]);
                                                }
                                              }
                                            } else {
                                              setSelectedList(currentSelectedList.filter((selected) => selected.id !== item.id));
                                              // 수량 제거
                                              const currentAddStickers = usePurcase.getState().addStickers;
                                              setAddStickers(currentAddStickers.filter((s) => s.id !== item.id));
                                            }
                                          }}
                                        />
                                      </div>
                                      {/* 모바일: 품목/세부품목/규격 */}
                                      <span className="text-[12px] text-[#3F3F46] truncate lg:hidden">
                                        {item.topStandardName || item.middleStandardName ? `${item.topStandardName || ""}${item.middleStandardName ? ` / ${item.middleStandardName}` : ""} / ${item.standardName}` : item.standardName}
                                      </span>
                                      {/* PC: 품목/세부품목 (좌측 정렬) */}
                                      <span className="hidden lg:inline text-[12px] text-[#3F3F46] truncate">
                                        {item.topStandardName || item.middleStandardName ? `${item.topStandardName || ""}${item.middleStandardName ? ` / ${item.middleStandardName}` : ""}` : "-"}
                                      </span>
                                    </div>
                                    {/* 최하단 아이템 - PC: 규격 (중앙 정렬) */}
                                    <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                                      {item.standardName || "규격기재요"}
                                    </span>
                                    {/* 모바일: 수수료만 (중앙 정렬) */}
                                    <span className="text-[12px] text-[#3F3F46] flex-shrink-0 text-center lg:hidden">
                                      {item.fee.toLocaleString()}
                                    </span>
                                    {/* 최하단 아이템 - PC: 개당 수수료 (중앙 정렬) */}
                                    <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                                      {item.fee.toLocaleString()}
                                    </span>
                                    {/* 최하단 아이템 - PC: 보유 재고 (중앙 정렬) */}
                                    <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                                      {item.holdInventory.toLocaleString()}
                                    </span>
                                    {/* 최하단 아이템 - PC: 수량 (중앙 정렬) */}
                                    <div className="hidden lg:flex items-center justify-center gap-[8px]">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const currentQuantity = addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1;
                                          if (currentQuantity > 1) {
                                            const newAddStickers = addStickers.map((s) =>
                                              s.id === item.id
                                                ? { ...s, purchaseQuantity: currentQuantity - 1 }
                                                : s
                                            );
                                            // 아이템이 없으면 추가
                                            if (!addStickers.find((s) => s.id === item.id)) {
                                              newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity - 1 });
                                            }
                                            setAddStickers(newAddStickers);
                                          }
                                        }}
                                        className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!isChecked || (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) <= 1}
                                      >
                                        <span className="text-[12px] text-[#0F0F10] font-semibold">-</span>
                                      </button>
                                      <span className="text-[12px] text-[#0F0F10] min-w-[40px] text-center font-semibold">
                                        {isChecked ? (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) : ""}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const currentQuantity = addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1;
                                          if (currentQuantity < item.holdInventory) {
                                            const newAddStickers = addStickers.map((s) =>
                                              s.id === item.id
                                                ? { ...s, purchaseQuantity: currentQuantity + 1 }
                                                : s
                                            );
                                            // 아이템이 없으면 추가
                                            if (!addStickers.find((s) => s.id === item.id)) {
                                              newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity + 1 });
                                            }
                                            setAddStickers(newAddStickers);
                                          }
                                        }}
                                        className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!isChecked || (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) >= item.holdInventory}
                                      >
                                        <span className="text-[12px] text-[#0F0F10] font-semibold">+</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {/* Middle이 null인 경우 직접 standard 표시 */}
                {data.directStandards.length > 0 && (
                  <div className="space-y-0 mt-[8px] lg:mt-0">
                    {data.directStandards.map((item, directIndex) => {
                      const isChecked = checkedState[item.id] || false;
                      return (
                        <div
                          key={item.id}
                          className={`flex justify-between items-center pl-[28px] pr-[20px] py-[8px] lg:grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-[16px] lg:px-[0] lg:py-[0] ${directIndex === 0 ? 'lg:mt-[0] lg:mb-[0]' : 'lg:my-[12px]'}`}
                        >
                          {/* 모바일: 체크박스 + 품목/세부품목/규격 */}
                          <div className={`flex items-center flex-1 min-w-0 lg:col-span-1 lg:justify-start lg:min-w-0 lg:overflow-hidden ${directIndex === 0 ? 'lg:pl-[28px]' : ''}`}>
                            {/* 체크박스 영역: 체크/미체크 기능만 */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                className="mr-[8px] flex-shrink-0"
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
                                      // 수량 초기화 (1로 설정)
                                      const currentAddStickers = usePurcase.getState().addStickers;
                                      if (!currentAddStickers.find((s) => s.id === item.id)) {
                                        setAddStickers([...currentAddStickers, { id: item.id, purchaseQuantity: 1 }]);
                                      }
                                    }
                                  } else {
                                    setSelectedList(currentSelectedList.filter((selected) => selected.id !== item.id));
                                    // 수량 제거
                                    const currentAddStickers = usePurcase.getState().addStickers;
                                    setAddStickers(currentAddStickers.filter((s) => s.id !== item.id));
                                  }
                                }}
                              />
                            </div>
                            {/* 모바일: 품목/세부품목/규격 */}
                            <span className="text-[12px] text-[#3F3F46] truncate lg:hidden">
                              {item.topStandardName || item.middleStandardName ? `${item.topStandardName || ""}${item.middleStandardName ? ` / ${item.middleStandardName}` : ""} / ${item.standardName}` : item.standardName}
                            </span>
                            {/* PC: 품목/세부품목 (좌측 정렬) */}
                            <span className="hidden lg:inline text-[12px] text-[#3F3F46] truncate">
                              {item.topStandardName || item.middleStandardName ? `${item.topStandardName || ""}${item.middleStandardName ? ` / ${item.middleStandardName}` : ""}` : "-"}
                            </span>
                          </div>
                          {/* 최하단 아이템 (directStandards) - PC: 규격 (중앙 정렬) */}
                          <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                            {item.standardName || "규격기재요"}
                          </span>
                          {/* 모바일: 수수료만 (중앙 정렬) */}
                          <span className="text-[12px] text-[#3F3F46] flex-shrink-0 text-center lg:hidden">
                            {item.fee.toLocaleString()}
                          </span>
                          {/* 최하단 아이템 (directStandards) - PC: 개당 수수료 (중앙 정렬) */}
                          <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                            {item.fee.toLocaleString()}
                          </span>
                          {/* 최하단 아이템 (directStandards) - PC: 보유 재고 (중앙 정렬) */}
                          <span className="hidden lg:inline text-[12px] text-[#3F3F46] text-center">
                            {item.holdInventory.toLocaleString()}
                          </span>
                          {/* 최하단 아이템 (directStandards) - PC: 수량 (중앙 정렬) */}
                          <div className="hidden lg:flex items-center justify-center gap-[8px]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentQuantity = addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1;
                                if (currentQuantity > 1) {
                                  const newAddStickers = addStickers.map((s) =>
                                    s.id === item.id
                                      ? { ...s, purchaseQuantity: currentQuantity - 1 }
                                      : s
                                  );
                                  // 아이템이 없으면 추가
                                  if (!addStickers.find((s) => s.id === item.id)) {
                                    newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity - 1 });
                                  }
                                  setAddStickers(newAddStickers);
                                }
                              }}
                              className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!isChecked || (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) <= 1}
                            >
                              <span className="text-[12px] text-[#0F0F10] font-semibold">-</span>
                            </button>
                            <span className="text-[12px] text-[#0F0F10] min-w-[40px] text-center font-semibold">
                              {isChecked ? (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) : ""}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentQuantity = addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1;
                                if (currentQuantity < item.holdInventory) {
                                  const newAddStickers = addStickers.map((s) =>
                                    s.id === item.id
                                      ? { ...s, purchaseQuantity: currentQuantity + 1 }
                                      : s
                                  );
                                  // 아이템이 없으면 추가
                                  if (!addStickers.find((s) => s.id === item.id)) {
                                    newAddStickers.push({ id: item.id, purchaseQuantity: currentQuantity + 1 });
                                  }
                                  setAddStickers(newAddStickers);
                                }
                              }}
                              className="w-[24px] h-[24px] flex items-center justify-center border border-gray40 rounded-[4px] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!isChecked || (addStickers.find((s) => s.id === item.id)?.purchaseQuantity || 1) >= item.holdInventory}
                            >
                              <span className="text-[12px] text-[#0F0F10] font-semibold">+</span>
                            </button>
                          </div>
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
