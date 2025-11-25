"use client";

import { ContactDetailResponseType } from "@/types/apiType/collector/contact/Contact.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobInquiryListDetail } from "@/apis/collector/contact/contactApis";
import CloseHeader from "@/components/header/CloseHeader";
import { isEdge } from "@/utils/WebViewHandler";
import ContactAnswers from "./ContactAnswers";
import ContactTabsTopContent from "./ContactTabsTopContent";
import UserCommentInput from "./UserCommentInput";

export default function ContactDetailClient({
  jobInqId
}: {
  jobInqId: string;
}) {
  const router = useRouter();
  const [result, setResult] = useState<ContactDetailResponseType>();

  const fetchData = async () => {
    const response = await getJobInquiryListDetail({ jobInqId: jobInqId });
    console.log(response);
    setResult(response.content);
  };

  useEffect(() => {
    fetchData();
  }, [jobInqId]);

  const onClose = () => {
    console.log("close");
    router.push("/collector/contact");
  };

  return (
    <div
      className={
        isEdge()
          ? undefined
          : "h-[100dvh] overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
      }
      style={isEdge() ? undefined : { touchAction: "pan-y" }}
    >
      <CloseHeader onClose={onClose} title="업무 문의 상세" />
      <ContactTabsTopContent detailData={result as ContactDetailResponseType} />
      <ContactAnswers detailData={result as ContactDetailResponseType} />
      <UserCommentInput jobInqId={jobInqId} onReplyDone={fetchData} />
    </div>
  );
}
