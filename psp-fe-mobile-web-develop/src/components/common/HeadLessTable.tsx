import { HeadLessTableType } from "@/types/store/waste-sticker/HeadLessTable.type";
import { formatDateWithTime } from "@/utils/formatUtils";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

export default function HeadLessTable({ data }: HeadLessTableType) {
  // 데이터가 없을 경우 처리
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Table>
      <TableBody className="border-b border-gray30">
        {data.map((item, index) => (
          <TableRow key={index} className="border-b border-gray30">
            <TableCell className="text-[10px] font-normal text-center w-[120px] pl-0">
              {formatDateWithTime(item?.trdDtm, "second") || "-"}
            </TableCell>
            <TableCell className="text-[10px] font-normal text-center">
              {item?.cnclRsn || "-"}
            </TableCell>
            <TableCell className="text-[10px] font-normal max-w-[77px] text-center leading-normal">
              {item?.cnclAmt || "-"}
            </TableCell>
            <TableCell className="text-[10px] font-normal text-center">
              {item?.name || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
