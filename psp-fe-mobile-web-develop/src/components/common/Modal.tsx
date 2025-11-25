import { ModalType } from "@/types/components/common/CommonComponents.type";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";

export default function Modal({
  open,
  onOpenChange,
  trigger,
  confirmButton = { text: "확인" },
  cancelButton,
  description,
  onConfirm,
  onCancel,
  className,
  triggerClassName
}: ModalType) {
  const BUTTON_COUNT_ONE_STYLE = "flex justify-center items-center";
  const BUTTON_COUNT_TWO_STYLE =
    "flex flex-row justify-center items-center space-x-2";

  const DEFAULT_BUTTON_STYLE = "p-[12px_48px] h-[48px] text-[14px]";

  const cancel = cancelButton
    ? {
        ...cancelButton,
        className: cn(DEFAULT_BUTTON_STYLE, cancelButton?.className)
      }
    : undefined;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger className={triggerClassName}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[320px]">
        <AlertDialogHeader className="max-w-[320px]">
          <AlertDialogTitle />
          <AlertDialogDescription className="text-[16px] font-semibold text-center text-black whitespace-pre-line">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          className={
            cancelButton ? BUTTON_COUNT_TWO_STYLE : BUTTON_COUNT_ONE_STYLE
          }
        >
          <RenderButton
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmButton={{
              ...confirmButton,
              className: cn(
                DEFAULT_BUTTON_STYLE,
                confirmButton.className,
                "text-[14px]"
              )
            }}
            cancelButton={cancel}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const RenderButton = ({
  onConfirm,
  onCancel,
  confirmButton,
  cancelButton
}: ModalType) => {
  return (
    <div className="flex items-center gap-[8px]">
      {cancelButton && (
        <AlertDialogCancel
          {...cancelButton}
          onClick={() => {
            onCancel?.();
          }}
        >
          {cancelButton?.text}
        </AlertDialogCancel>
      )}
      <AlertDialogAction {...confirmButton} onClick={() => onConfirm()}>
        {confirmButton?.text}
      </AlertDialogAction>
    </div>
  );
};
