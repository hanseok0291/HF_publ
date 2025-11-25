import { z } from "zod";

export const paymentRequestSchema = z.object({
  requestId: z.string(),
  paymentMethod: z.string(),
  nextUrl: z.string(),
  cancUrl: z.string(),
  locGovId: z.string()
});
