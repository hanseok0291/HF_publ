import { BaseDataType } from "@/types/components/common/CommonComponents.type";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableRow } from "../../ui/table";

interface TableHeaderRowProps<TData> {
  headerGroup: HeaderGroup<TData>;
  enableRowSelection: boolean;
}

export function TableHeaderRow<TData extends BaseDataType>({
  headerGroup,
  enableRowSelection
}: TableHeaderRowProps<TData>) {
  return (
    <TableRow key={headerGroup.id} className="border-none">
      {headerGroup.headers.map((header) => {
        // Hide select column if checkboxes are disabled
        if (header.column.id === "select" && !enableRowSelection) {
          return null;
        }
        return (
          <TableHead
            key={header.id}
            className="text-xs font-semibold px-5 py-3 text-center align-middle"
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  );
}
