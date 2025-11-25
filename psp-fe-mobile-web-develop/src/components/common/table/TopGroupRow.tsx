import {
  BaseDataType,
  TopGroup
} from "@/types/components/common/CommonComponents.type";
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GroupHeaderRow } from "./GroupHeaderRow";
import MiddleGroupRow from "./MiddleGroupRow";
import SimplifiedMiddleGroupRow from "./SimplifiedMiddleGroupRow";

interface TopGroupRowProps<TData extends BaseDataType> {
  topGroup: TopGroup;
  topIndex: number;
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
  toggleTopGroupExpansion: (groupIndex: number) => void;
  toggleTopGroupSelection: (topIndex: number, isSelected: boolean) => void;
  toggleMiddleGroupExpansion: (topIndex: number, middleIndex: number) => void;
  toggleMiddleGroupSelection: (
    topIndex: number,
    middleIndex: number,
    isSelected: boolean
  ) => void;
  toggleStandardSelection: (
    topIndex: number,
    middleIndex: number,
    standardIndex: number,
    isSelected: boolean
  ) => void;
}

export default function TopGroupRow<TData extends BaseDataType>({
  topGroup,
  topIndex,
  columns,
  enableRowSelection,
  toggleTopGroupExpansion,
  toggleTopGroupSelection,
  toggleMiddleGroupExpansion,
  toggleMiddleGroupSelection,
  toggleStandardSelection
}: TopGroupRowProps<TData>) {
  // // 중간 그룹의 middleStandardName별 출현 횟수를 계산
  // const countMiddleStandardNames = () => {
  //   const counts: Record<string, number> = {};

  //   topGroup.children.forEach((middleGroup) => {
  //     const name = middleGroup.middleStandardName;
  //     counts[name] = (counts[name] || 0) + 1;
  //   });

  //   return counts;
  // };

  // 각 중간 그룹이 일반 텍스트로 표시될지 아코디언으로 표시될지 결정
  const getMiddleGroupDisplayType = () => {
    const nameCounts: Record<string, number> = {};

    // Count occurrences of each middleStandardName
    topGroup.children.forEach((middleGroup) => {
      const name = middleGroup.middleStandardName;
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });

    // Determine display type for each middle group
    return topGroup.children.map((middleGroup) => {
      const name = middleGroup.middleStandardName;
      const count = nameCounts[name];

      // 아코디언 조건
      // 1. This middleStandardName 항목이 2개 이상 있을 경우
      // 2. This middleGroup 에서 자식 항목이 2개 이상 있을 경우
      const useAccordion = count > 1 || middleGroup.children.length > 1;

      return {
        middleGroup,
        useAccordion
      };
    });
  };

  const middleGroupDisplays = getMiddleGroupDisplayType();

  return (
    <Fragment key={`topgroup-${topIndex}-${topGroup.topStandardName}`}>
      {/* topStandardName 행 */}
      <GroupHeaderRow
        name={topGroup.topStandardName}
        isSelected={topGroup.isSelected}
        isExpanded={topGroup.isExpanded}
        itemCount={topGroup.children.length}
        level="top"
        columns={columns}
        enableRowSelection={enableRowSelection}
        onToggleExpand={() => toggleTopGroupExpansion(topIndex)}
        onToggleSelect={(isSelected) =>
          toggleTopGroupSelection(topIndex, isSelected)
        }
      />

      {/* 중간 그룹 표시 */}
      {topGroup.isExpanded &&
        middleGroupDisplays.map((display, middleIndex) => {
          const { middleGroup, useAccordion } = display;

          // 아코디언을 사용하는 경우
          if (useAccordion) {
            return (
              <MiddleGroupRow
                key={`middlegroup-${topIndex}-${middleIndex}-${middleGroup.middleStandardName}`}
                middleGroup={middleGroup}
                topIndex={topIndex}
                middleIndex={middleIndex}
                columns={columns}
                enableRowSelection={enableRowSelection}
                toggleMiddleGroupExpansion={toggleMiddleGroupExpansion}
                toggleMiddleGroupSelection={toggleMiddleGroupSelection}
                toggleStandardSelection={toggleStandardSelection}
              />
            );
          }
          // 일반 텍스트로 표시하는 경우
          else {
            return (
              <SimplifiedMiddleGroupRow
                key={`simplified-middlegroup-${topIndex}-${middleIndex}-${middleGroup.middleStandardName}`}
                middleGroup={middleGroup}
                topIndex={topIndex}
                middleIndex={middleIndex}
                columns={columns}
                enableRowSelection={enableRowSelection}
                toggleStandardSelection={toggleStandardSelection}
              />
            );
          }
        })}
    </Fragment>
  );
}
