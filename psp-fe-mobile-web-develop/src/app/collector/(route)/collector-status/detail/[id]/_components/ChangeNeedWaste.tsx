import { ChangeNeedWasteType } from "@/types/collector/collector-status/change/Change.type";

export default function ChangeNeedWaste({
  label,
  content
}: ChangeNeedWasteType) {
  console.log("label : ", label);
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[14px] font-medium">
        {label === "" ? label : `[${label}]`}
      </p>
      <p className="text-[14px] font-medium">{content}</p>
    </div>
  );
}
