"use client";

import { useFormContext } from "react-hook-form";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getCollectorNoticeList } from "@/apis/collector/etc/noticeApis";
import { getStoreNoticeList } from "@/apis/etc/noticeApi";
import { NoticeCollectorParam } from "@/app/collector/(route)/notice/page";
import Loading from "@/app/loading";
import { NoticeStoreParam } from "@/app/store/(route)/(etc)/notice/page";
import useNoticeTap from "@/stores/useNoticeTap";
import EtcChip from "../store/etc/EtcChip";
import NoticeTabsContentContainer from "./NoticeTabsContentContainer";
import NoticeTabsTitle from "./NoticeTabsTitle";
import NoticeTabUserInfo from "./NoticeTabUserInfo";

const NoticeTabs = () => {
  const { setClickDetail, setNoticeId, noticeId } = useNoticeTap(
    useShallow((state) => ({
      setClickDetail: state.setClickDetail,
      setNoticeId: state.setNoticeId,
      dataList: state.dataList,
      noticeId: state.noticeId
    }))
  );

  const pathname = usePathname();
  const service = pathname.split("/")[1];

  const { watch } =
    service === "store"
      ? useFormContext<NoticeStoreParam>()
      : useFormContext<NoticeCollectorParam>();
  const router = useRouter();
  const params = useParams();
  const currentNoticeId = params?.id as string;
  const { swrResponse } =
    service === "store"
      ? getStoreNoticeList(watch())
      : getCollectorNoticeList(watch());

  if (!swrResponse || !swrResponse.data || !swrResponse.data.content) {
    return <Loading />;
  }

  const handleOnClick = (id: string) => {
    if (noticeId !== id) {
      setClickDetail(true);
      setNoticeId(id);
      const detailPath =
        service === "store" ? `/notice/${id}` : `/notice/detail/${id}`;

      if (currentNoticeId) {
        router.replace(`/${service}${detailPath}`);
      } else {
        // 공지사항 상세 최초 진입 시
        router.push(`/${service}${detailPath}`);
      }
    }
  };
  const result = swrResponse.data.content.content;

  return (
    <div className="animate-fade-in">
      {Array.isArray(result) && result.length === 0 && (
        <p className="text-center">해당하는 메뉴의 공지사항이 없습니다.</p>
      )}
      {result.map((item) => (
        <div key={item.noticeId}>
          <div
            className="flex flex-col p-[1.25rem]"
            onClick={() => handleOnClick(item.noticeId)}
          >
            <div>
              <EtcChip
                text={item.insertionIstt}
                className="mb-[12px] w-fit p-1"
              />
              <NoticeTabsContentContainer>
                <NoticeTabsTitle
                  text={item.title}
                  parentFixYn={item.parentFixYn ? true : false}
                  isActive={currentNoticeId === item.noticeId}
                />
                <NoticeTabUserInfo
                  name={item.insertionName}
                  email={item.insertionEmail}
                  date={item.insertionDate}
                />
              </NoticeTabsContentContainer>
            </div>
          </div>
          <hr className="w-full" />
        </div>
      ))}
    </div>
  );
};

export default NoticeTabs;
