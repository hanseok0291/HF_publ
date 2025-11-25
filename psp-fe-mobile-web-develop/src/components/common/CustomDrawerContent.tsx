"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type CustomDrawerContentProps = {
  data: { id: number; content: string; value: string }[];
  onSelect?: (value: string, isNavigation: boolean) => void;
  setIsOpen?: (value: boolean) => void;
  onFilterChange?: (filteredItems: string[]) => void;
  isCheckbox?: boolean;
  selectedValue?: string;
  value?: string | null;
};

export default function CustomDrawerContent({
  data,
  onSelect,
  setIsOpen,
  onFilterChange,
  isCheckbox = false,
  selectedValue,
  value
}: CustomDrawerContentProps) {
  // 선택된 아이템 ID들을 저장하는 상태
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // "전체 선택" 항목 찾기 (id가 0이고 value가 "null"인 항목)
  const allItem = data.find((item) => item.id === 0 && item.value === "null");
  // "전체 선택"을 제외한 나머지 항목들
  const otherItems = data.filter(
    (item) => item.id !== 0 && item.value !== "null"
  );

  // value 또는 selectedValue 기반으로 선택된 항목 초기화
  useEffect(() => {
    if (!value && !selectedValue) {
      // 기본적으로 모든 항목 선택이 필요한 경우만 여기서 처리
      if (isCheckbox && allItem && selectedIds.length === 0) {
        const allIds = data.map((item) => item.id);
        setSelectedIds(allIds);

        // 초기 선택에 대해 알림
        if (onFilterChange) {
          onFilterChange(data.map((item) => item.content));
        }

        // 폼의 초기값 설정
        if (onSelect) {
          const allValues = data.map((item) => item.value).join(",");
          onSelect(allValues, false);
        }
      }
      return;
    }

    const initialValue = value || selectedValue;
    if (initialValue) {
      // 콤마로 구분된 값을 배열로 분리
      const selectedItems = initialValue.split(",");

      // "null" (전체 항목)이 선택에 포함되어 있는지 확인
      const hasAllItem = selectedItems.includes("null");

      if (hasAllItem) {
        // "전체" 항목이 선택되었다면 모든 항목 선택
        const allIds = data.map((item) => item.id);
        setSelectedIds(allIds);
      } else {
        // 그렇지 않으면 지정된 항목만 선택
        const selectedItemIds = data
          .filter((item) => selectedItems.includes(item.value))
          .map((item) => item.id);

        setSelectedIds(selectedItemIds);
      }
    }
  }, [
    data,
    value,
    selectedValue,
    isCheckbox,
    allItem,
    onFilterChange,
    onSelect,
    selectedIds.length
  ]);

  // 일반 클릭 핸들러 (체크박스가 아닌 경우)
  const handleClick = (value: string) => {
    if (value !== undefined && onSelect) {
      onSelect(value, true);
      setIsOpen?.(false);
    }
  };

  // 항목 토글 핸들러 (체크박스 선택/해제)
  const handleItemToggle = (
    itemId: number,
    checked: boolean,
    itemValue?: string
  ) => {
    let newSelectedIds: number[];

    // "전체 선택" 항목 처리
    if (itemId === 0 && itemValue === "null") {
      // "전체 선택"이 체크되면 모든 항목 선택
      // "전체 선택"이 해제되면 모든 선택 해제
      newSelectedIds = checked ? data.map((item) => item.id) : [];
    } else {
      if (checked) {
        // 이 항목을 선택 목록에 추가
        newSelectedIds = [...selectedIds, itemId];

        // 이제 다른 모든 항목이 선택되었는지 확인
        const allOtherItemsSelected = otherItems.every((item) =>
          [...selectedIds, itemId].includes(item.id)
        );

        // 다른 모든 항목이 선택되었다면 "전체 선택" 항목도 선택
        if (allOtherItemsSelected && allItem) {
          newSelectedIds = [...newSelectedIds, allItem.id];
        }
      } else {
        // 이 항목을 선택 목록에서 제거
        newSelectedIds = selectedIds.filter((id) => id !== itemId);

        // 모든 항목이 선택되지 않았으므로 "전체 선택" 항목도 제거
        if (allItem) {
          newSelectedIds = newSelectedIds.filter((id) => id !== allItem.id);
        }
      }
    }

    // 상태 업데이트
    setSelectedIds(newSelectedIds);

    // 필터 변경에 대해 부모에게 알림
    if (onFilterChange) {
      const selectedContents = data
        .filter((item) => newSelectedIds.includes(item.id))
        .map((item) => item.content);

      onFilterChange(selectedContents);
    }

    // 선택된 값을 폼에 전송
    if (onSelect) {
      let selectedValues: string;

      if (newSelectedIds.length === 0) {
        // 선택된 항목이 없으면 null 값 전달
        selectedValues = "";
      } else if (
        allItem &&
        newSelectedIds.includes(allItem.id) &&
        newSelectedIds.length === data.length
      ) {
        // 모든 항목이 선택되었으면 "null" 값만 전달 (전체 선택)
        selectedValues = "null";
      } else {
        // 일부 항목만 선택된 경우 해당 값들만 전달
        selectedValues = data
          .filter(
            (item) => newSelectedIds.includes(item.id) && item.value !== "null"
          )
          .map((item) => item.value)
          .join(",");
      }

      onSelect(selectedValues, false);
    }
  };

  // "전체 선택" 항목이 선택되었는지 확인
  const isAllSelected = allItem ? selectedIds.includes(allItem.id) : false;

  // 개별 항목들이 모두 선택되었는지 확인
  const areAllItemsSelected =
    otherItems.length > 0 &&
    otherItems.every((item) => selectedIds.includes(item.id));

  // 전체 선택 상태 확인 (개별 항목들이 모두 선택되었지만 전체 항목이 선택되지 않은 경우 처리)
  useEffect(() => {
    if (areAllItemsSelected && allItem && !selectedIds.includes(allItem.id)) {
      setSelectedIds((prev) => [...prev, allItem.id]);
    }
  }, [areAllItemsSelected, allItem, selectedIds]);

  return (
    <div className="p-4 flex flex-col gap-4 max-h-[200px] overflow-y-auto">
      {/* 체크박스 모드이고 "전체 선택" 항목이 있는 경우 표시 */}
      {isCheckbox && allItem && (
        <div key={allItem.id} className="flex items-center space-x-2">
          <Checkbox
            id={`item-${allItem.id}`}
            checked={isAllSelected}
            onCheckedChange={(checked) =>
              handleItemToggle(allItem.id, !!checked, allItem.value)
            }
          />
          <label
            htmlFor={`item-${allItem.id}`}
            className="cursor-pointer text-gray-600 hover:text-gray-900 text-[14px] font-medium text-left"
          >
            {allItem.content}
          </label>
        </div>
      )}

      {/* 체크박스 모드가 아니고 "전체" 항목이 있는 경우 버튼으로 표시 */}
      {!isCheckbox && allItem && (
        <button
          onClick={() => handleClick(allItem.value)}
          className={cn(
            "w-full cursor-pointer text-[14px] font-medium text-left p-2 rounded transition-colors",
            "hover:bg-gray-100",
            selectedValue === allItem.value || value === allItem.value
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600"
          )}
        >
          {allItem.content}
        </button>
      )}

      {/* 나머지 항목들 표시 */}
      {otherItems.map((item, index) => (
        <div key={item.id ?? index} className="flex items-center space-x-2">
          {isCheckbox ? (
            <>
              <button
                onClick={() => handleClick(item.value)}
                className={cn(
                  "w-full cursor-pointer text-[14px] font-medium text-left p-2 rounded transition-colors",
                  "hover:bg-gray-100",
                  selectedValue === item.value || value === item.value
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600"
                )}
              />
              <label
                htmlFor={`item-${item.id}`}
                className="cursor-pointer text-gray-600 hover:text-gray-900 text-[14px] font-medium text-left"
              >
                {item.content}
              </label>
            </>
          ) : (
            <button
              onClick={() => handleClick(item.value)}
              className={cn(
                "w-full cursor-pointer text-[14px] font-medium text-left p-2 rounded transition-colors",
                "hover:bg-gray-100",
                selectedValue === item.value || value === item.value
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600"
              )}
            >
              {item.content}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
