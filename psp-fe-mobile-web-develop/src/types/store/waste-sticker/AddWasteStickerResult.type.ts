import { ResultFormValues } from "./AddWasteSticker.type";
import { UseFormHandleSubmit } from "react-hook-form";

export type ShowResultModalType = {
  showReceipt: boolean;
  setShowReceipt: (show: boolean) => void;
  handleShowReceiptClose: () => void;
  successSubmit: boolean;
  setSuccessSubmit?: (success: boolean) => void;
  handleSubmitClose: () => void;
  handleResetClose: () => void;
  setResetForm: (reset: boolean) => void;
  resetForm: boolean;
};

export type ClientButtonsType = {
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: ResultFormValues) => void;
  watchPayment:
    | "PMT_MEAN_001"
    | "PMT_MEAN_002"
    | "PMT_MEAN_003"
    | "PMT_MEAN_004"
    | undefined;
  resetForm: (reset: boolean) => void;
};
