import { z } from "zod";
import {
  AddAdminPowerSchema,
  PutAdminPowerSchema
} from "../../../schema/store/empolyee/AddAdminPower.schema";

export type AddAdminPowerFormValues = z.infer<typeof AddAdminPowerSchema>;
export type PutAdminPowerFormValues = z.infer<typeof PutAdminPowerSchema>;

export type SubItem = {
  label: string;
  checkboxes: Array<{
    id: string;
    label: string;
    checked: boolean;
  }>;
};

export type MenuItem = {
  title: string;
  headerCheckboxes: Array<{
    id: string;
    label: string;
    checked: boolean;
  }>;
  subItems: SubItem[];
};

export type AddAdminPowerDataType = {
  menuName: string;
  type: "text" | "accordion";
  menuItems: MenuItem[];
};

export type MenuResponse = {
  menuId: string;
  menuName: string;
  inquiryYn: boolean;
  editYn: boolean;
  parentMenuId?: string;
  children?: MenuResponse[];
};

export type ApiResponse = {
  code: number;
  message: string;
  content: MenuResponse[];
};

export type CheckboxCellProps = {
  row: {
    original: MenuResponse;
    getIsSelected: () => boolean;
    toggleSelected: (value: boolean) => void;
  };
  type: "search" | "edit";
};

export type CheckboxState = {
  parent: boolean;
  children: Record<string, boolean>;
};

// 상세 페이지
export type ChildrenMenuItem = {
  menuId: string;
  menuName: string;
  editYn: boolean;
  inquiryYn: boolean;
  addMenuName: string | null;
  detailMenuName: string | null;
  optionalMenuName: string | null;
};

export type AuthorityGroupDetailType = {
  authorityGroupId: string;
  authorityGroupName: string;
  updateUserEmail: string;
  updateUserId: string;
  updateUserName: string;
  updatedDate: string;
  menuList: MenuResponse[];
};
