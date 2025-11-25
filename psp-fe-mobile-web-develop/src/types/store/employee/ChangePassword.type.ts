import { z } from "zod";
import { ChangePasswordSchema } from "../../../schema/store/empolyee/ChangePassword.schema";

export type ChangePsswordFormValues = z.infer<typeof ChangePasswordSchema>;
