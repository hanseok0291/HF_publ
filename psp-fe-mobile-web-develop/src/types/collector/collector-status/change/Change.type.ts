import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { Control } from "react-hook-form";

export type AddPaymentType = {
  amount: string | number;
};
export type ChangeNeedWasteType = {
  label: string;
  content: string;
};

export type BaseChangeInputType = {
  control: Control<AddEmployeeFormValues>;
};
