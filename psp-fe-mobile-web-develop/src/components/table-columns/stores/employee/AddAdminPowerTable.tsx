"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable";

export interface BaseDataType {
  type?: string;
}

interface WasteStickerDataType extends BaseDataType {
  menuName: string;
}

interface AddAdminPowerTableProps {
  data: WasteStickerDataType[];
  columns: ColumnDef<WasteStickerDataType>[];
}

export default function AddAdminPowerTable({
  data,
  columns
}: AddAdminPowerTableProps) {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
