import {
  AddEmployeeFormValues,
  EditEmployeeFormValues
} from "@/types/store/employee/AddEmployee.type";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Control, FieldPath } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { TypeOf } from "zod";
import { ROLE_ENUM } from "@/enums/Member.enum";

/**
 * Main Container
 */
export type MainContainerType = {
  children: ReactNode;
  className?: string;
};

/**
 * Table
 */
export type DataTableType<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "default" | "clean" | "select";
  className?: string;
  emptyMessage?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  selectionMode?: "single" | "multiple";
  isRowSelectable?: (row: TData) => boolean;
  onRowClick?: (row: TData) => void;
};

/**
 * Header
 */

type BaseHeaderType = {
  isOpen: boolean;
  className?: string;
  isModal?: boolean;
};

export type ArrowAndMenuHeaderType = Pick<
  BaseHeaderType,
  "className" | "isModal"
> & {
  headerTitle: string;
};

export type HeaderContainerType = Pick<BaseHeaderType, "className"> & {
  children: ReactNode;
};

export type HeaderTitleType = Pick<BaseHeaderType, "isOpen" | "isModal"> & {
  handleClick: () => void;
  headerTitle: string;
};

export type HeaderButtonType = BaseHeaderType & {
  setIsOpen: (isOpen: boolean) => void;
};

export type OpenHeaderContentType = BaseHeaderType & {
  onClick: () => void;
};

/**
 * Modal
 */

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

export type ModalType = {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  trigger?: ReactNode;
  triggerClassName?: string;
  buttonCount?: number;
  confirmButton?: ButtonType;
  cancelButton?: ButtonType;
  description?: string;
  onConfirm: Function;
  onCancel?: Function;
  className?: string;
};

/**
 * Search Input
 */

export type SearchInputType = {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  onClick?: () => void;
};

/**
 * Drawer
 */

export type CustomDrawerContentType = {
  data: Array<{ id: number; content: string; link: string }>;
};

export type Option = {
  label: string;
  value: any;
};

/**
 * Radio
 */

export type CustomRadioGroupType = {
  control: Control<AddEmployeeFormValues> | Control<EditEmployeeFormValues>;
  name: FieldPath<AddEmployeeFormValues>;
  options: Option[];
  className?: string;
};

export type CustomAccordionType = {
  trigger: string;
  content: ReactNode;
};

/**
 * Tabs
 */

export type CustomTabsType = {
  className?: string;
  data: Array<{ id: number; trigger: string; value: string }>;
};

/** AccessToken(JWT) 내의 payload 정보 */
export type AccessTokenPayload = {
  /** 권한 만료일(unix time: seconds 단위) */
  exp: number;
  /** access 날짜(unix time: seconds 단위) */
  iat: number;
  /** 사용자 id */
  jti: string;
  /** 권한 코드 */
  sub: TypeOf<typeof ROLE_ENUM>;
  /** BO 관리자의 모드 변경 시 사용하는 필드 */
  connectRoleCode?: TypeOf<typeof ROLE_ENUM>;
};
export interface BaseDataType {
  id: string;
  stickerId?: string;
  trashBagId?: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  holdInventory: number;
  singlenessStandardYn: boolean;
  type?: "accordion" | "text";
}

export interface StandardItem {
  standardName: string;
  fee?: string | number;
  isSelected: boolean;
  originalData: BaseDataType;
}

export interface MiddleGroup {
  middleStandardName: string;
  isExpanded: boolean;
  isSelected: boolean;
  children: StandardItem[];
}

export interface TopGroup {
  topStandardName: string;
  isExpanded: boolean;
  isSelected: boolean;
  children: MiddleGroup[];
}
