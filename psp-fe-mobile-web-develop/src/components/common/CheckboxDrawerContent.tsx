"use client";

import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export type WasteItem = {
  wasteId: string;
  standardName: string;
};

export type WasteDrawerContentProps = {
  data: WasteItem[];
  onSelect?: (value: string, isNavigation?: boolean) => void;
  setIsOpen?: (value: boolean) => void;
  onFilterChange?: (filteredItems: WasteItem[]) => void;
  selectedValue?: string;
  value?: string | null;
  // 전체 항목 선택 시 빈값으로 전달
  allSelectAsEmpty?: boolean;
};

export default function CheckboxDrawerContent({
  data,
  onSelect,
  setIsOpen,
  onFilterChange,
  selectedValue,
  value,
  allSelectAsEmpty = false // 기본값은 false로 설정
}: WasteDrawerContentProps) {
  // 선택된 아이템 ID들을 저장하는 상태
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  // 사용자가 전체 선택/해제를 했는지 추적
  const [selectedAll, setSelectedAll] = useState(false);
  const [unSelectedAll, setUnSelectedAll] = useState(false);

  // 이전 값과 초기화 여부를 추적하기 위한 ref
  const prevValueRef = useRef<string>("");
  const resetRef = useRef<boolean>(false);

  // alertItems 항목과 일반 항목 분리
  const alertItems = data.filter((item) => item.wasteId === "alert");
  const normalItems = data.filter((item) => item.wasteId !== "alert");
  const hasNormalItems = normalItems.length > 0;

  // 콤마로 구분된 값을 개별 값으로 분리하는 함수
  const splitValues = (valueStr: string): string[] => {
    return valueStr.split(",").filter(Boolean);
  };

  // 초기 선택 상태 설정 및 외부 변경사항 동기화
  useEffect(() => {
    const currentValue = value || selectedValue || "";

    // 사용자가 명시적으로 전체 해제를 했다면, 빈 값이 와도 전체 선택하지 않음
    if (unSelectedAll && currentValue === "") {
      return;
    }

    // 사용자가 명시적으로 전체 선택을 했거나,
    // 빈 값이면서 allSelectAsEmpty가 true이고 이미 초기화된 경우
    if (
      (selectedAll ||
        (currentValue === "" && allSelectAsEmpty && resetRef.current)) &&
      !unSelectedAll
    ) {
      // 모든 항목 선택 (temp 항목 제외)
      const allIds = normalItems.map((item) => item.wasteId);

      // 현재 선택된 ID들과 비교하여 변경이 있을 때만 상태 업데이트
      if (
        JSON.stringify(allIds.sort()) !== JSON.stringify(selectedIds.sort())
      ) {
        setSelectedIds(allIds);
        setAllChecked(true);
      }
      return;
    }

    // 콤마로 구분된 모든 값을 개별 항목으로 분리
    const allValues = splitValues(currentValue);

    // 현재 데이터에 있는 항목 중 선택된 값이 포함된 항목 찾기
    let newSelectedIds: string[] = [];

    // 데이터의 각 항목에 대해 확인 (temp 항목 제외)
    normalItems.forEach((item) => {
      const itemValues = splitValues(item.wasteId);

      // 선택된 값과 항목 값이 일치하는 경우
      if (currentValue === item.wasteId) {
        if (!newSelectedIds.includes(item.wasteId)) {
          newSelectedIds.push(item.wasteId);
        }
      }
      // 개별 값들 중에 매칭되는 것이 있는지 확인
      else if (
        allValues.some(
          (val) => itemValues.includes(val) || val === item.wasteId
        )
      ) {
        if (!newSelectedIds.includes(item.wasteId)) {
          newSelectedIds.push(item.wasteId);
        }
      }
    });

    // 현재 선택된 ID들과 비교하여 변경이 있을 때만 상태 업데이트
    if (
      JSON.stringify(newSelectedIds.sort()) !==
      JSON.stringify(selectedIds.sort())
    ) {
      setSelectedIds(newSelectedIds);
      setAllChecked(
        normalItems.length > 0 && newSelectedIds.length === normalItems.length
      );

      // 모든 항목이 선택되었는지 확인하여 사용자 선택 상태 업데이트
      if (
        newSelectedIds.length === normalItems.length &&
        normalItems.length > 0
      ) {
        setSelectedAll(true);
        setUnSelectedAll(false);
      } else if (newSelectedIds.length === 0) {
        setSelectedAll(false);
        setUnSelectedAll(true);
      } else {
        setSelectedAll(false);
        setUnSelectedAll(false);
      }
    }

    // 이전 값 업데이트 및 초기화 완료 표시
    prevValueRef.current = currentValue;
    resetRef.current = true;
  }, [
    normalItems,
    value,
    selectedValue,
    allSelectAsEmpty,
    selectedAll,
    unSelectedAll
  ]);

  // 데이터가 변경될 때 선택 상태 재검증
  useEffect(() => {
    // 일반 항목이 비어있으면 처리하지 않음
    if (normalItems.length === 0) return;

    // 사용자가 명시적으로 전체 해제를 했다면 선택 상태를 유지
    if (unSelectedAll) {
      setSelectedIds([]);
      setAllChecked(false);
      return;
    }

    // 사용자가 명시적으로 전체 선택을 했다면 모든 항목 선택
    if (selectedAll) {
      const allIds = normalItems.map((item) => item.wasteId);
      setSelectedIds(allIds);
      setAllChecked(true);
      return;
    }

    // 유효한 ID만 필터링
    const validIds = selectedIds.filter((id) =>
      normalItems.some((item) => item.wasteId === id)
    );

    // 변경이 있을 때만 상태 업데이트
    if (
      JSON.stringify(validIds.sort()) !== JSON.stringify(selectedIds.sort())
    ) {
      setSelectedIds(validIds);
      setAllChecked(validIds.length === normalItems.length);

      // 유효한 선택 항목에 대한 콜백 호출
      if (onFilterChange) {
        const selectedItems = normalItems.filter((item) =>
          validIds.includes(item.wasteId)
        );
        onFilterChange(selectedItems);
      }
    }
  }, [data]); // 데이터 변경 시에만 실행

  // 전체 선택/해제 처리
  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      const allIds = normalItems.map((item) => item.wasteId);
      setSelectedIds(allIds);
      setAllChecked(true);

      // 사용자가 명시적으로 전체 선택했음을 표시
      setSelectedAll(true);
      setUnSelectedAll(false);

      // 전체 선택된 항목에 대한 콜백 호출
      if (onFilterChange) {
        onFilterChange(normalItems);
      }

      // form 업데이트
      if (onSelect) {
        // 전체 선택 시 빈 값을 보내는 옵션이 활성화된 경우
        if (allSelectAsEmpty) {
          onSelect("", false);
        } else {
          const allValues = allIds.join(",");
          onSelect(allValues, false);
        }
      }
    } else {
      setSelectedIds([]);
      setAllChecked(false);

      // 사용자가 명시적으로 전체 해제했음을 표시
      setSelectedAll(false);
      setUnSelectedAll(true);

      // 선택 항목 초기화에 대한 콜백 호출
      if (onFilterChange) {
        onFilterChange([]);
      }

      // form 업데이트
      if (onSelect) {
        onSelect("", false);
      }
    }
  };

  // 개별 항목 선택/해제 처리
  const handleItemCheck = (itemId: string, checked: boolean) => {
    let newSelectedIds: string[];

    if (checked) {
      // 항목 추가
      newSelectedIds = [...selectedIds, itemId];

      // 모든 항목이 선택되었는지 확인
      const isAllSelected = newSelectedIds.length === normalItems.length;
      if (isAllSelected) {
        setAllChecked(true);
        setSelectedAll(true);
        setUnSelectedAll(false);
      } else {
        setSelectedAll(false);
        setUnSelectedAll(false);
      }
    } else {
      // 항목 제거
      newSelectedIds = selectedIds.filter((id) => id !== itemId);
      setAllChecked(false);

      // 모든 항목이 해제되었는지 확인
      if (newSelectedIds.length === 0) {
        setUnSelectedAll(true);
        setSelectedAll(false);
      } else {
        setSelectedAll(false);
        setUnSelectedAll(false);
      }
    }

    setSelectedIds(newSelectedIds);

    // 선택된 항목 목록에 대한 콜백 호출
    if (onFilterChange) {
      const selectedItems = normalItems.filter((item) =>
        newSelectedIds.includes(item.wasteId)
      );
      onFilterChange(selectedItems);
    }

    // form 업데이트
    if (onSelect) {
      // 전체 선택 시 빈 값을 보내는 옵션이 활성화되어 있고 모든 항목이 선택된 경우
      if (allSelectAsEmpty && newSelectedIds.length === normalItems.length) {
        onSelect("", false);
      } else {
        const selectedValues = newSelectedIds.join(",");
        onSelect(selectedValues, false);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col h-[300px]">
      {/* 전체 선택 체크박스 - 일반 항목이 있을 때만 표시 */}
      {hasNormalItems && (
        <div className="flex items-center space-x-2 bg-white mb-2">
          <Checkbox
            id="select-all"
            checked={allChecked}
            onCheckedChange={(checked) => handleCheckAll(!!checked)}
          />
          <label
            htmlFor="select-all"
            className="text-gray-700 text-sm font-medium cursor-pointer"
          >
            전체 선택
          </label>
        </div>
      )}

      {/* 스크롤 가능한 컨테이너 추가 */}
      <div className="overflow-y-auto flex-1">
        {/* 개별 항목 목록 */}
        {data.length > 0 ? (
          <div className="space-y-3">
            {/* 일반 항목 (체크박스 포함) */}
            {normalItems.map((item) => (
              <div
                key={item.wasteId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`item-${item.wasteId}`}
                    checked={selectedIds.includes(item.wasteId)}
                    onCheckedChange={(checked) =>
                      handleItemCheck(item.wasteId, !!checked)
                    }
                  />
                  <label
                    htmlFor={`item-${item.wasteId}`}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer"
                  >
                    {item.standardName}
                  </label>
                </div>
              </div>
            ))}

            {/* alertItems 항목 (체크박스 없이 표시) */}
            {alertItems.map((item) => (
              <div key={item.wasteId}>
                <div className="text-gray-600 text-sm text-center font-medium">
                  {item.standardName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">항목이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
