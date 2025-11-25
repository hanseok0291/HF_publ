import {
  BaseDataType,
  MiddleGroup
} from "@/types/components/common/CommonComponents.type";
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { StandardItemRow } from "./StandardItemRow";

// 중간 그룹이 하나만 있을 때 사용할 간소화된 컴포넌트
interface SimplifiedMiddleGroupRowProps<TData extends BaseDataType> {
  middleGroup: MiddleGroup;
  topIndex: number;
  middleIndex: number;
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
  toggleStandardSelection: (
    topIndex: number,
    middleIndex: number,
    standardIndex: number,
    isSelected: boolean
  ) => void;
}

/**
 * middleStandardName가 단독 규격일 경우 일반 텍스트 형식 행 컴포넌트
 */
export default function SimplifiedMiddleGroupRow<TData extends BaseDataType>({
  middleGroup,
  topIndex,
  middleIndex,
  columns,
  enableRowSelection,
  toggleStandardSelection
}: SimplifiedMiddleGroupRowProps<TData>) {
  return (
    <Fragment>
      {/* 중간 그룹 헤더 없이 바로 표준 항목들 표시 */}
      {middleGroup.children.map((standard, standardIndex) => (
        <StandardItemRow
          key={`standard-${topIndex}-${middleIndex}-${standardIndex}`}
          standard={standard}
          topIndex={topIndex}
          middleIndex={middleIndex}
          standardIndex={standardIndex}
          columns={columns}
          enableRowSelection={enableRowSelection}
          toggleStandardSelection={toggleStandardSelection}
          showMiddleStandardName={true} // 중간 표준 이름 표시 플래그 추가
          middleStandardName={middleGroup.middleStandardName} // 중간 표준 이름 전달
        />
      ))}
    </Fragment>
  );
}
