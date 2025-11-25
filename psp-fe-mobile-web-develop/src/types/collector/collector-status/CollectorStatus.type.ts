import {
  WasteCollectorDetailType,
  WasteCollectorListType
} from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { ColumnDef } from "@tanstack/react-table";
import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";

export type CollectorStatusChipType = {
  status: TypeOf<typeof COLLECT_STATUS_ENUM> | string;
};

export type DrawerItemType = {
  id: number;
  content: string;
  value: string;
};

export type DrawerDataType = {
  collectorSelect: DrawerItemType[];
  collectorStatus: DrawerItemType[];
  searchObject: DrawerItemType[];
  searchDetailObject: DrawerItemType[];
};

export type BasicDrawerGroupType = {
  data: DrawerDataType;
  onFilterChange: (selectedItems: string[]) => void;
  selectedValues: {
    collectorSelect: string;
    collectorStatus: string;
    searchObject: string;
    searchDetailObject: string;
  };
  onSelect: {
    collectorSelect: (value: string) => void;
    collectorStatus: (value: string) => void;
    searchObject: (value: string) => void;
    searchDetailObject: (value: string) => void;
  };
};

export type DetailContainerType = {
  onClick: () => void;
  selectList: any;
  data: WasteCollectorListType;
  requestId: string;
  isFocus?: boolean;
};

export type ConllectorStatusListType = Array<{
  id: number;
  content: WasteCollectorListType["disposeStatus"];
}>;

export type HorizontalCalendarType = {
  selected: Date;
  onSelect: (date: Date) => void;
};

export type GetCollectorStatusDataType = {
  items: string;
};

export type BreadcrumbCollapsedType = {
  // selectedValue: string;
  detailData: WasteCollectorDetailType;
};

export type CollectorInfoType = {
  columns: ColumnDef<CollectorStatusColumnsType>[];
  data: CollectorStatusColumnsType[];
  detailData: WasteCollectorDetailType;
};

export type CollectorStatusColumnsType = {
  wasteDetailClssName: string;
  wasteKindQuantity: number;
  wasteFee: string;
};

export type AddPaymentFirstStepType = {
  columns: ColumnDef<AddPaymentFirstStepColumnsType>[];
  data: AddPaymentFirstStepColumnsType[];
};

export type AddPaymentSecondStepType = {
  columns: ColumnDef<AddPaymentSecondStepColumnsType>[];
  data: AddPaymentSecondStepColumnsType[];
};

export interface AddPaymentFirstStepColumnsType {
  id: string;
  itemName: string;
  fee: number;
  quantity: number;
  notSelect?: boolean;
  currentItemId?: string;
}

export type AddPaymentSecondStepColumnsType = {
  id: string;
  itemName: string;
  // quantity: number;
  fee: number;
  notSelect?: boolean;
};
