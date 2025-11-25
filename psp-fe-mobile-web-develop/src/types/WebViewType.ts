import { TypeOf, z } from "zod";

export const WebViewMessageType = z.enum([
  "OPEN_WINDOW",
  "CLOSE_WINDOW",
  "DOWNLOAD",
  "LOGIN_ROLE"
]);

export const WebViewRecvMessageType = z.enum(["CLOSED_WINDOW"]);

export interface WebViewMessage {
  type: TypeOf<typeof WebViewMessageType>;
  data?: any;
  message?: string;
}

export interface WebViewData {
  url?: string;
  method?: string;
  content?: string;
  contentType?: string;
  filename?: string;
}

export interface ClosedWindowData {
  status?: string;
}

export const WebViewRecvSchema = z.object({
  type: WebViewRecvMessageType,
  data: z.any().optional(),
  message: z.string().optional()
});
