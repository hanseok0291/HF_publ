import { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";

interface UseTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableRowSelection?: boolean;
}

export default function useTable<TData, TValue>({
  columns,
  data,
  enableRowSelection = false
}: UseTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    state: {
      columnVisibility,
      rowSelection
    }
  });

  return {
    table,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection
  };
}
