import {
  BaseDataType,
  StandardItem
} from "@/types/components/common/CommonComponents.type";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { TableCell, TableRow } from "../../ui/table";

interface StandardItemRowProps<TData extends BaseDataType> {
  standard: StandardItem;
  topIndex: number;
  middleIndex: number;
  standardIndex: number;
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
  toggleStandardSelection: (
    topIndex: number,
    middleIndex: number,
    standardIndex: number,
    isSelected: boolean
  ) => void;
  showMiddleStandardName?: boolean; // 중간 표준 이름 표시 여부
  middleStandardName?: string; // 중간 표준 이름
}

export function StandardItemRow<TData extends BaseDataType>({
  standard,
  topIndex,
  middleIndex,
  standardIndex,
  columns,
  enableRowSelection,
  toggleStandardSelection,
  showMiddleStandardName = false,
  middleStandardName = ""
}: StandardItemRowProps<TData>) {
  return (
    <TableRow className="bg-white">
      {enableRowSelection && (
        <TableCell className="px-5 py-3 text-center align-middle">
          <div className="pl-12">
            <Checkbox
              checked={standard.isSelected}
              onCheckedChange={(checked) => {
                toggleStandardSelection(
                  topIndex,
                  middleIndex,
                  standardIndex,
                  !!checked
                );
              }}
              onClick={(e) => {
                // 이벤트 전파 중지
                e.stopPropagation();
              }}
            />
          </div>
        </TableCell>
      )}
      <TableCell
        colSpan={enableRowSelection ? columns.length : columns.length + 1}
        className="px-5 py-3 align-middle"
      >
        <div className="pl-12 flex items-center justify-between">
          <div className={standard.isSelected ? "font-bold" : ""}>
            {/* 중간 표준 이름이 표시되어야 하는 경우 함께 표시 */}
            {showMiddleStandardName ? (
              <span>
                {middleStandardName} - {standard.standardName}
              </span>
            ) : (
              standard.standardName
            )}
          </div>
          {standard.fee !== undefined && (
            <div
              className={`text-right pr-4 font-medium ${standard.isSelected ? "font-bold" : ""}`}
            >
              {typeof standard.fee === "number"
                ? standard.fee.toLocaleString()
                : standard.fee}
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
