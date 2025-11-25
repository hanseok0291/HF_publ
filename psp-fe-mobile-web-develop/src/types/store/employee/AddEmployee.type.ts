import { TypeOf, z } from "zod";
import {
  AddEmployeeSchema,
  EditEmployeeSchema
} from "../../../schema/store/empolyee/AddEmployee.schema";

export type AddEmployeeFormValues = z.infer<typeof AddEmployeeSchema>;
export type EditEmployeeFormValues = TypeOf<typeof EditEmployeeSchema>;
