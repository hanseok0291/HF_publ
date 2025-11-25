import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowButtonType = {
  onBack: () => void;
  className?: string;
};

export default function ArrowBackButton({
  onBack,
  className
}: ArrowButtonType) {
  const ARROW_BUTTON_STYLE = cn("rounded hover:bg-gray-100", className);
  return (
    <button
      type="button"
      className={ARROW_BUTTON_STYLE}
      onClick={onBack}
      aria-label="Close"
    >
      <ArrowLeft />
    </button>
  );
}
