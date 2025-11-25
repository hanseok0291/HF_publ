import {
  BaseDataType,
  MiddleGroup
} from "@/types/components/common/CommonComponents.type";
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GroupHeaderRow } from "./GroupHeaderRow";
import { StandardItemRow } from "./StandardItemRow";

interface MiddleGroupRowProps<TData extends BaseDataType> {
  middleGroup: MiddleGroup;
  topIndex: number;
  middleIndex: number;
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
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

export default function MiddleGroupRow<TData extends BaseDataType>({
  middleGroup,
  topIndex,
  middleIndex,
  columns,
  enableRowSelection,
  toggleMiddleGroupExpansion,
  toggleMiddleGroupSelection,
  toggleStandardSelection
}: MiddleGroupRowProps<TData>) {
  return (
    <Fragment>
      <GroupHeaderRow
        name={middleGroup.middleStandardName}
        isSelected={middleGroup.isSelected}
        isExpanded={middleGroup.isExpanded}
        itemCount={middleGroup.children.length}
        level="middle"
        columns={columns}
        enableRowSelection={enableRowSelection}
        onToggleExpand={() => toggleMiddleGroupExpansion(topIndex, middleIndex)}
        onToggleSelect={(isSelected) =>
          toggleMiddleGroupSelection(topIndex, middleIndex, isSelected)
        }
      />

      {/* standardName 항목 */}
      {middleGroup.isExpanded &&
        middleGroup.children.map((standard, standardIndex) => (
          <StandardItemRow
            key={`standard-${topIndex}-${middleIndex}-${standardIndex}`}
            standard={standard}
            topIndex={topIndex}
            middleIndex={middleIndex}
            standardIndex={standardIndex}
            columns={columns}
            enableRowSelection={enableRowSelection}
            toggleStandardSelection={toggleStandardSelection}
          />
        ))}
    </Fragment>
  );
}
