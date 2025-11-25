import { NoticeTabUserInfoType } from "@/types/store/etc/notice/Notice.type";

export default function NoticeTabUserInfo({
  name,
  email,
  date
}: NoticeTabUserInfoType) {
  return (
    <div className="flex gap-1">
      <p className="text-[0.75rem] font-normal text-[#777]">
        {name}({email})
      </p>
      <p className="text-[0.75rem] text-[#DDD]">|</p>
      <p className="text-[0.75rem] font-normal text-[#777]">
        {date.slice(0, 10)}
      </p>
    </div>
  );
}
