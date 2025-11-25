import { BaseDataType } from "@/types/components/common/CommonComponents.type";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { TableCell, TableRow } from "../../ui/table";

// interface GroupHeaderRowProps<TData extends BaseDataType> {
//   name: string;
//   isSelected: boolean;
//   isExpanded: boolean;
//   itemCount: number;
//   level: "top" | "middle";
//   columns: ColumnDef<TData>[];
//   enableRowSelection: boolean;
//   onToggleExpand: () => void;
//   onToggleSelect: (isSelected: boolean) => void;
// }

interface GroupHeaderRowProps<TData extends BaseDataType> {
  name: string;
  isSelected: boolean;
  isExpanded: boolean;
  itemCount: number;
  level: "top" | "middle";
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
  onToggleExpand: () => void;
  onToggleSelect: (isSelected: boolean) => void;
}

export function GroupHeaderRow<TData extends BaseDataType>({
  name,
  isSelected,
  isExpanded,
  itemCount,
  level,
  columns,
  enableRowSelection,
  onToggleExpand,
  onToggleSelect
}: GroupHeaderRowProps<TData>) {
  const isTop = level === "top";

  return (
    <TableRow className={isTop ? "bg-gray10 font-medium" : "bg-gray5"}>
      {enableRowSelection && (
        <TableCell className="px-5 py-3 text-center align-middle">
          <div className={isTop ? "" : "pl-6"}>
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => {
                onToggleSelect(!!checked);
              }}
              onClick={(e) => {
                // 이벤트 전파 중지 - 체크박스 클릭 시 상위 요소의 클릭 이벤트가 발생하지 않도록 함
                e.stopPropagation();
              }}
            />
          </div>
        </TableCell>
      )}
      <TableCell
        colSpan={enableRowSelection ? columns.length : columns.length + 1}
        className="pl-[20px] pr-[44px] py-3 align-middle cursor-pointer"
        onClick={onToggleExpand}
      >
        <div
          className={`${isTop ? "" : "pl-8"} flex items-center justify-between`}
        >
          <div className="flex">
            <div
              className={`${isSelected ? "font-bold" : ""} ${isTop ? "" : "font-medium"}`}
            >
              {name}
            </div>
            <span className="ml-2 text-sm text-gray-500">({itemCount})</span>
          </div>

          {isExpanded ? (
            <ChevronUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-2" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
