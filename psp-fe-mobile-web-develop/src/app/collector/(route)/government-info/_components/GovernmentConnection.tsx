import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function GovernmentConnection({
  localGovernmentName,
  imageFileList
}: {
  localGovernmentName: string;
  imageFileList: string[];
}) {
  const isArray = Array.isArray(imageFileList) && imageFileList.length === 0;
  return (
    <div className="flex flex-col gap-[8px]">
      <Label className="text-[16px] font-bold">소속 지자체</Label>
      <div className="flex items-center gap-[8px]">
        {isArray && <Skeleton className="h-[30px] w-[30px] rounded-full" />}
        {imageFileList &&
          imageFileList.map((item, index) => {
            return (
              <Image
                key={index}
                src={item}
                alt="소속 지자체 로고"
                width={30}
                height={30}
              />
            );
          })}
        <p className="text-[14px] font-semibold">{localGovernmentName}</p>
      </div>
    </div>
  );
}
