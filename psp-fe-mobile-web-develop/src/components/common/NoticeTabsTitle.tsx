import { NoticeTabsTitleType } from "@/types/store/etc/notice/Notice.type";
import Image from "next/image";

export default function NoticeTabsTitle({
  text,
  parentFixYn = false,
  commentYn = false,
  commentCount,
  isActive = false
}: NoticeTabsTitleType) {
  return (
    <div className="flex justify-between">
      <p
        className={`text-[0.875rem] w-[240px] truncate ${isActive ? "font-bold" : "font-medium"}`}
      >
        {text}
      </p>
      {parentFixYn && (
        <Image src="/icons/pin.svg" alt="pin" width={20} height={20} />
      )}
      {commentYn && (
        <div className="flex items-center gap-1">
          <Image
            src={"/icons/comment.svg"}
            width={16}
            height={16}
            alt="업무 문의 댓글 아이콘"
          />
          <span className="text-gray80 text-[12px] font-medium">
            {commentCount}
          </span>
        </div>
      )}
    </div>
  );
}
