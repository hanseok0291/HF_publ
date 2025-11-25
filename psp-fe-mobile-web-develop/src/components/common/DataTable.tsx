"use client";

import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "default" | "clean" | "select";
  className?: string;
  emptyMessage?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  selectionMode?: "single" | "multiple";
  isRowSelectable?: (row: TData) => boolean;
  onRowClick?: (row: TData) => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  variant = "default",
  className,
  emptyMessage = "해당하는 결과가 없습니다.",
  value = [],
  onChange,
  selectionMode = "single",
  isRowSelectable = () => true,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const isInitialMount = useRef(true);

  // 초기 마운트시에만 value로 selectedRows 초기화
  useEffect(() => {
    if (isInitialMount.current) {
      const initialSelectedRows = value.reduce(
        (acc, id) => ({ ...acc, [id]: true }),
        {}
      );
      setSelectedRows(initialSelectedRows);
      isInitialMount.current = false;
    }
  }, [value]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const styles = {
    default: {
      wrapper: "",
      header: "bg-gray20 text-gray80",
      row: "border-b",
      rowSelected: "",
      cell: "",
      firstCell: "",
      otherCell: "",
      headText: "",
      rowNotSelect: ""
    },
    clean: {
      wrapper: "border-none",
      header: "text-gray-800 [&>tr]:border-none",
      row: "border-none",
      rowSelected: "",
      cell: "border-none text-center",
      firstCell: "!text-left",
      otherCell: "text-center",
      headText:
        "text-[12px] text-gray80 font-medium text-center whitespace-pre",
      rowNotSelect: ""
    },
    select: {
      wrapper: "",
      header: "bg-gray20 text-gray80 text-[12px]",
      row: "border-b cursor-pointer transition-colors hover:bg-gray-50",
      rowSelected: "!bg-sub !text-main",
      cell: "text-[14px] font-nomal leading-[20px]",
      firstCell: "",
      otherCell: "",
      headText: "",
      rowNotSelect: "cursor-not-allowed !bg-transparent !text-gray60"
    }
  };

  const currentStyle = styles[variant];

  const handleRowClick = (rowId: string, rowData: TData) => {
    if (variant !== "select") {
      onRowClick?.(rowData);
      return;
    }

    if (!isRowSelectable(rowData)) return;

    let newSelectedRows: Record<string, boolean> = {};

    if (selectionMode === "single") {
      // 단일 선택 모드
      if (selectedRows[rowId]) {
        // 이미 선택된 행을 다시 클릭하면 선택 해제
        newSelectedRows = {};
      } else {
        // 새로운 행 선택
        newSelectedRows = { [rowId]: true };
      }
    } else {
      // 다중 선택 모드
      newSelectedRows = {
        ...selectedRows,
        [rowId]: !selectedRows[rowId]
      };
    }

    setSelectedRows(newSelectedRows);

    // 선택된 행 ID 배열 생성
    const selectedIds = Object.entries(newSelectedRows)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id);

    onChange?.(selectedIds);
    onRowClick?.(rowData);
  };

  return (
    <Table className={cn(currentStyle.wrapper, className)}>
      <TableHeader className={currentStyle.header}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className={currentStyle.row}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className={currentStyle.headText}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row.id, row.original)}
              className={cn(
                currentStyle.row,
                selectedRows[row.id] && currentStyle.rowSelected,
                !isRowSelectable(row.original) && currentStyle.rowNotSelect
              )}
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    currentStyle.cell,
                    variant === "default" ||
                      (variant === "clean" &&
                        (index === 0
                          ? currentStyle.firstCell
                          : currentStyle.otherCell))
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-gray60 text-[14px]"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
