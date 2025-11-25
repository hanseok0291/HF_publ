import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationType<TData> = {
  table: Table<TData>;
};

export default function TablePagination<TData>({
  table
}: PaginationType<TData>) {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <div className="space-x-2">
        <Button
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        {table.getFilteredSelectedRowModel().rows.length}
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
