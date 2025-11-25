import {
  AddPaymentFirstStepColumnsType,
  AddPaymentSecondStepColumnsType
} from "@/types/collector/collector-status/CollectorStatus.type";
import { ColumnDef } from "@tanstack/react-table";

export const addPaymentFirstColumns: ColumnDef<AddPaymentFirstStepColumnsType>[] =
  [
    {
      accessorKey: "itemName",
      header: "품목명"
    },
    {
      accessorKey: "fee",
      header: "수수료",
      cell: ({ row }) => {
        return (
          new Intl.NumberFormat("ko-KR").format(row.getValue("fee")) + "원"
        );
      }
    },
    {
      accessorKey: "quantity",
      header: "수량",
      cell: ({ row }) => {
        return row.getValue("quantity") + "개";
      }
    }
  ];

export const addPaymentSecondColumns: ColumnDef<AddPaymentSecondStepColumnsType>[] =
  [
    {
      accessorKey: "itemName",
      header: "품목명"
    },
    {
      accessorKey: "fee",
      header: "수수료",
      cell: ({ row }) => {
        return (
          new Intl.NumberFormat("ko-KR").format(row.getValue("fee")) + "원"
        );
      }
    }
  ];
