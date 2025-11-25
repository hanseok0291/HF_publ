import { z } from "zod";

export const AddAdminPowerSchema = z.object({
  authorityGroupName: z.string().min(1),
  authorityGroupId: z.string().min(1),
  menuList: z.array(
    z.object({
      menuId: z.string(),
      inquiryYn: z.boolean(),
      editYn: z.boolean()
    })
  )
});

export const PutAdminPowerSchema = z.object({
  authorityGroupName: z.string().min(1),
  authorityGroupId: z.string().min(1),
  menuList: z.array(
    z.object({
      menuId: z.string(),
      inquiryYn: z.boolean(),
      editYn: z.boolean()
    })
  )
});
