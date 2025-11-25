import { TableCell, TableRow } from "../../ui/table";

interface EmptyRowProps {
  columnsLength: number;
}

export default function EmptyRow({ columnsLength }: EmptyRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={columnsLength + 1}
        className="h-24 text-center align-middle"
      >
        해당하는 결과가 없습니다.
      </TableCell>
    </TableRow>
  );
}
