import { BaseDataType } from "@/types/components/common/CommonComponents.type";
import { ReactNode, useEffect } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { useHierarchicalData } from "@/hooks/useHierarchicalData";
import useTable from "@/hooks/useTable";
import usePurcase from "@/stores/usePurcase";
import EmptyRow from "./EmptyRow";
import { TableHeaderRow } from "./TableHeaderRow";
import TopGroupRow from "./TopGroupRow";

export interface DataTableProps<TData extends BaseDataType> {
  columns: ColumnDef<TData>[];
  data: TData[];
  renderCustomRow?: (row: Row<TData>) => ReactNode;
  enableRowSelection?: boolean;
  onSelectAllChange?: (isSelected: boolean) => void;
  onRegularRowSelect?: (isSelected: boolean, rowData?: TData) => void;
}

export function CheckboxDataTable<TData extends BaseDataType>({
  columns,
  data,
  renderCustomRow,
  onSelectAllChange,
  onRegularRowSelect,
  enableRowSelection = false
}: DataTableProps<TData>) {
  const { selectedList, setSelectedList } = usePurcase(
    useShallow((state) => ({
      selectedList: state.selectedList,
      setSelectedList: state.setSelectedList
    }))
  );

  const {
    groupState,
    toggleTopGroupExpansion,
    toggleMiddleGroupExpansion,
    toggleTopGroupSelection,
    toggleMiddleGroupSelection,
    toggleStandardSelection
  } = useHierarchicalData(
    data,
    selectedList,
    setSelectedList,
    onRegularRowSelect
  );

  const { table } = useTable({
    columns,
    data,
    enableRowSelection
  });

  useEffect(() => {
    if (onSelectAllChange) {
      onSelectAllChange(table.getIsAllRowsSelected());
    }
  }, [table.getIsAllRowsSelected(), onSelectAllChange]);

  return (
    <div className="border-b">
      <Table>
        <TableHeader className="bg-gray20 text-gray80">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow
              key={headerGroup.id}
              headerGroup={headerGroup}
              enableRowSelection={enableRowSelection}
            />
          ))}
        </TableHeader>
        <TableBody>
          {groupState.length > 0 ? (
            groupState.map((topGroup, topIndex) => (
              <TopGroupRow
                key={`topgroup-${topIndex}-${topGroup.topStandardName}`}
                topGroup={topGroup}
                topIndex={topIndex}
                columns={columns}
                enableRowSelection={enableRowSelection}
                toggleTopGroupExpansion={toggleTopGroupExpansion}
                toggleTopGroupSelection={toggleTopGroupSelection}
                toggleMiddleGroupExpansion={toggleMiddleGroupExpansion}
                toggleMiddleGroupSelection={toggleMiddleGroupSelection}
                toggleStandardSelection={toggleStandardSelection}
              />
            ))
          ) : (
            <EmptyRow columnsLength={columns.length} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
