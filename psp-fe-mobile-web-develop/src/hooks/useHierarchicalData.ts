import {
  BaseDataType,
  TopGroup
} from "@/types/components/common/CommonComponents.type";
import { useEffect, useMemo, useRef, useState } from "react";

export function useHierarchicalData<TData extends BaseDataType>(
  data: TData[],
  selectedList: BaseDataType[],
  setSelectedList: (items: BaseDataType[]) => void,
  onRegularRowSelect?: (isSelected: boolean, rowData?: TData) => void
) {
  // 이전 선택 항목의 ID를 추적
  const prevSelectedIdsRef = useRef<string>("");
  // 업데이트 중인지 여부를 추적 (무한 루프 방지)
  const isUpdatingRef = useRef(false);

  // 응답 데이터에서 그룹화된 데이터 구조 초기화
  const initialGroupedData = useMemo(() => {
    const groups: Record<string, TopGroup> = {};

    data.forEach((item) => {
      const topName = item.topStandardName || "Undefined";
      const middleName = item.middleStandardName || "Undefined";

      if (!groups[topName]) {
        groups[topName] = {
          topStandardName: topName,
          isExpanded: false,
          isSelected: false,
          children: []
        };
      }

      // 중간 그룹 찾기 또는 생성
      let middleGroup = groups[topName].children.find(
        (mg) => mg.middleStandardName === middleName
      );

      if (!middleGroup) {
        middleGroup = {
          middleStandardName: middleName,
          isExpanded: false,
          isSelected: false,
          children: []
        };
        groups[topName].children.push(middleGroup);
      }

      // 이 항목이 이미 selectedList에 있는지 확인
      const isAlreadySelected = selectedList.some(
        (selected) => selected.id === item.id
      );

      // 표준 항목을 중간 그룹에 수수료 항목과 함께 추가
      middleGroup.children.push({
        standardName: item.standardName || "",
        fee: item.fee,
        isSelected: isAlreadySelected,
        originalData: item
      });
    });

    // 자식 항목을 기반으로 중간 및 상위 그룹의 isSelected 상태 업데이트
    Object.values(groups).forEach((topGroup) => {
      topGroup.children.forEach((middleGroup) => {
        middleGroup.isSelected = middleGroup.children.every(
          (item) => item.isSelected
        );
      });
      topGroup.isSelected = topGroup.children.every(
        (middleGroup) => middleGroup.isSelected
      );
    });

    return Object.values(groups);
  }, [data, selectedList]);

  // 그룹화된 데이터에 대한 상태 (useState를 사용하지만 useMemo에서 한 번만 초기화)
  const [groupState, setGroupState] = useState<TopGroup[]>([]);

  // 초기화 시 selectedList의 ID 문자열 저장
  useEffect(() => {
    const selectedIds = selectedList
      .map((item) => item.id)
      .sort()
      .join(",");
    prevSelectedIdsRef.current = selectedIds;
  }, [selectedList]);

  // groupState가 변경될 때 스토어를 업데이트하는 효과
  useEffect(() => {
    // 이미 업데이트 중이면 중복 실행 방지
    if (isUpdatingRef.current) {
      return;
    }

    // groupState에서 모든 선택된 항목 추출
    const selectedItems: BaseDataType[] = [];

    groupState.forEach((topGroup) => {
      topGroup.children.forEach((middleGroup) => {
        middleGroup.children.forEach((standard) => {
          if (standard.isSelected) {
            selectedItems.push(standard.originalData);
          }
        });
      });
    });

    // 효율적인 ID 기반 비교를 위해 ID만 추출하여 정렬된 문자열로 변환
    const currentSelectedIds = selectedItems
      .map((item) => item.id)
      .sort()
      .join(",");

    // 이전에 저장된 ID 문자열과 비교
    if (currentSelectedIds !== prevSelectedIdsRef.current) {
      // 업데이트 중임을 표시
      isUpdatingRef.current = true;

      // 새로운 ID 문자열 저장
      prevSelectedIdsRef.current = currentSelectedIds;

      // 스토어의 selectedList 업데이트
      setSelectedList(selectedItems);
      console.log(selectedItems);
      console.log(`스토어 업데이트: 총 ${selectedItems.length}개 항목 선택됨`);

      // 비동기적으로 업데이트 상태 해제 (다음 렌더링 사이클에서)
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  }, [groupState, setSelectedList]);

  // initialGroupedData가 변경될 때만 그룹 상태 업데이트 (data prop 변경으로 인함)
  useEffect(() => {
    setGroupState(initialGroupedData);
  }, [initialGroupedData]);

  // Header 체크박스 선택 토글을 처리하는 새 함수 추가
  const toggleAllSelection = (isSelected: boolean) => {
    setGroupState((prev) => {
      return prev.map((topGroup) => ({
        ...topGroup,
        isSelected,
        children: topGroup.children.map((middleGroup) => ({
          ...middleGroup,
          isSelected,
          children: middleGroup.children.map((standard) => ({
            ...standard,
            isSelected
          }))
        }))
      }));
    });

    // 모든 항목에 대한 onRegularRowSelect 콜백 호출 (필요한 경우)
    if (onRegularRowSelect) {
      groupState.forEach((topGroup) => {
        topGroup.children.forEach((middleGroup) => {
          middleGroup.children.forEach((standard) => {
            onRegularRowSelect(isSelected, standard.originalData as TData);
          });
        });
      });
    }
  };

  // topStandardName 그룹 확장 토글 (아코디언 형식)
  const toggleTopGroupExpansion = (groupIndex: number) => {
    setGroupState((prev) => {
      const newState = [...prev];
      newState[groupIndex] = {
        ...newState[groupIndex],
        isExpanded: !newState[groupIndex].isExpanded
      };
      return newState;
    });
  };

  // middleStandardName 그룹 확장 토글 (아코디언 형식)
  const toggleMiddleGroupExpansion = (
    topIndex: number,
    middleIndex: number
  ) => {
    setGroupState((prev) => {
      const newState = [...prev];
      const topGroup = { ...newState[topIndex] };
      const middleGroups = [...topGroup.children];

      middleGroups[middleIndex] = {
        ...middleGroups[middleIndex],
        isExpanded: !middleGroups[middleIndex].isExpanded
      };

      topGroup.children = middleGroups;
      newState[topIndex] = topGroup;

      return newState;
    });
  };

  // topStandardName 그룹 선택 토글
  const toggleTopGroupSelection = (topIndex: number, isSelected: boolean) => {
    setGroupState((prev) => {
      const newState = [...prev];
      const topGroup = { ...newState[topIndex] };

      // 모든 middleStandardName 그룹 및 해당 자식 항목 업데이트
      const updatedMiddleGroups = topGroup.children.map((middleGroup) => {
        const updatedStandards = middleGroup.children.map((standard) => ({
          ...standard,
          isSelected
        }));

        return {
          ...middleGroup,
          isSelected,
          children: updatedStandards
        };
      });

      topGroup.isSelected = isSelected;
      topGroup.children = updatedMiddleGroups;
      newState[topIndex] = topGroup;

      return newState;
    });

    // setState 무한 업데이트 인해 이동 (runtime error 발생 처리)
    if (onRegularRowSelect) {
      // 현재 topGroup 가져오기
      const topGroup = groupState[topIndex];
      // 모든 중간 그룹의 모든 표준에 대한 선택 변경 알림
      topGroup.children.forEach((middleGroup) => {
        middleGroup.children.forEach((standard) => {
          onRegularRowSelect(isSelected, standard.originalData as TData);
        });
      });
    }
  };

  // 중간 그룹 선택 토글
  const toggleMiddleGroupSelection = (
    topIndex: number,
    middleIndex: number,
    isSelected: boolean
  ) => {
    setGroupState((prev) => {
      const newState = [...prev];
      const topGroup = { ...newState[topIndex] };
      const middleGroups = [...topGroup.children];
      const middleGroup = { ...middleGroups[middleIndex] };

      // 이 중간 그룹의 모든 표준 업데이트
      const updatedStandards = middleGroup.children.map((standard) => ({
        ...standard,
        isSelected
      }));

      middleGroup.isSelected = isSelected;
      middleGroup.children = updatedStandards;
      middleGroups[middleIndex] = middleGroup;

      // 상위 그룹 상태를 업데이트하기 위해 모든 중간 그룹이 선택되었는지 확인
      const allMiddleGroupsSelected = middleGroups.every((mg) => mg.isSelected);
      topGroup.isSelected = allMiddleGroupsSelected;
      topGroup.children = middleGroups;

      newState[topIndex] = topGroup;

      return newState;
    });

    // setState 외부로 부작용 이동
    if (onRegularRowSelect) {
      // 현재 middleGroup 가져오기
      const middleGroup = groupState[topIndex]?.children[middleIndex];
      if (middleGroup) {
        // 이 중간 그룹의 모든 표준에 대한 선택 변경 알림
        middleGroup.children.forEach((standard) => {
          onRegularRowSelect(isSelected, standard.originalData as TData);
        });
      }
    }
  };

  // 표준 항목 선택 토글
  const toggleStandardSelection = (
    topIndex: number,
    middleIndex: number,
    standardIndex: number,
    isSelected: boolean
  ) => {
    // 콜백을 위한 상태 업데이트 전 표준 가져오기
    const standard =
      groupState[topIndex]?.children[middleIndex]?.children[standardIndex];

    setGroupState((prev) => {
      const newState = [...prev];
      const topGroup = { ...newState[topIndex] };
      const middleGroups = [...topGroup.children];
      const middleGroup = { ...middleGroups[middleIndex] };
      const standards = [...middleGroup.children];

      // 특정 표준 업데이트
      standards[standardIndex] = {
        ...standards[standardIndex],
        isSelected
      };

      // 중간 그룹 상태를 업데이트하기 위해 모든 표준이 선택되었는지 확인
      const allStandardsSelected = standards.every((s) => s.isSelected);

      middleGroup.isSelected = allStandardsSelected;
      middleGroup.children = standards;
      middleGroups[middleIndex] = middleGroup;

      // 상위 그룹 상태를 업데이트하기 위해 모든 중간 그룹이 선택되었는지 확인
      const allMiddleGroupsSelected = middleGroups.every((mg) => mg.isSelected);

      topGroup.isSelected = allMiddleGroupsSelected;
      topGroup.children = middleGroups;

      newState[topIndex] = topGroup;

      return newState;
    });

    // setState 외부로 부작용 이동
    if (onRegularRowSelect && standard) {
      onRegularRowSelect(isSelected, standard.originalData as TData);
    }
  };

  return {
    selectedList,
    groupState,
    toggleTopGroupExpansion,
    toggleMiddleGroupExpansion,
    toggleTopGroupSelection,
    toggleMiddleGroupSelection,
    toggleStandardSelection,
    toggleAllSelection
  };
}
