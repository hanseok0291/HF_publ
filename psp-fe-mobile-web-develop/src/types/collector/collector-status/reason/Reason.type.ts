import { z } from "zod";
import { ReasonSchema } from "../../../../schema/collector/reason/Reason.schema";

export type ImageFormType = {
  files: Array<FileType>;
};

export type FileType = {
  url: string;
  preview_URL: string;
  images: any;
};

export type InputImageType = {
  url: string;
  altText: string;
};

export type ReasonFormValues = z.infer<typeof ReasonSchema>;
