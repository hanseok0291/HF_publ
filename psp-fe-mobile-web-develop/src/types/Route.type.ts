import { z } from "zod";

export const ServiceTypeSchema = z.enum(["store", "collector"]);
