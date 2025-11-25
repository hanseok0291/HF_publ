"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useHierarchicalData } from "@/hooks/useHierarchicalData";

export type WasteStickerDataType = {
  id: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  holdInventory: number;
  singlenessStandardYn: boolean;
  type?: "accordion" | "text";
};
export const getColumns = (
  hierarchicalData: ReturnType<
    typeof useHierarchicalData<WasteStickerDataType>
  > | null
): ColumnDef<WasteStickerDataType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value);
          // hierarchicalData가 있을 때만 toggleAllSelection 호출
          hierarchicalData?.toggleAllSelection?.(!!value);
        }}
        aria-label="Select all"
        className="bg-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="bg-white"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "topSandardName",
    header: "품목 / 세부품목 / 규격"
  },
  {
    accessorKey: "fee",
    header: "개당 수수료"
  }
];

export const columns: ColumnDef<WasteStickerDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "topSandardName",
    header: "품목 / 세부품목 / 규격"
  },
  {
    accessorKey: "fee",
    header: "개당 수수료"
  }
];
