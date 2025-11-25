import { CollectorStatusColumnsType } from "@/types/collector/collector-status/CollectorStatus.type";
import { ColumnDef } from "@tanstack/react-table";

export const collectorStatusColumns: ColumnDef<CollectorStatusColumnsType>[] = [
  {
    accessorKey: "wasteDetailClssName",
    header: "배출품목"
  },
  {
    accessorKey: "wasteKindQuantity",
    header: "수량"
  },
  {
    accessorKey: "wasteFee",
    header: "수수료"
  }
];
