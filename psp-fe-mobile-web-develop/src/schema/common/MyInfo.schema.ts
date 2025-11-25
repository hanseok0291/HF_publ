import { z } from "zod";
import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";

export const MyInfoSchema = z.object({
  secondAuthKindCode: AUTH_METHOD_ENUM,
  telePhoneNumber: z.string().optional(),
  cellPhoneNumber: z.string()
});
