"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next/client";
import { ArrowUp } from "lucide-react";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { postJobInquiryAnswers } from "@/apis/collector/contact/contactApis";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import EtcChip from "@/components/store/etc/EtcChip";
import { toast } from "@/hooks/use-toast";
import { ContactAnswerSchema } from "@/schema/collector/contact/Contact.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";

export type ContactAnswerValues = z.infer<typeof ContactAnswerSchema>;
export default function UserCommentInput({
  jobInqId,
  onReplyDone
}: {
  jobInqId: string;
  onReplyDone?: () => void;
}) {
  const { user, resetUser } = useSaveUserInfo(
    useShallow((state) => ({
      resetUser: state.resetUser,
      user: state.user
    }))
  );

  const [cookieData, setCookieData] = useState({
    positionName: "-",
    userName: "-"
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const position = getCookie("positionName")?.toString() ?? "-";
    const name = getCookie("userName")?.toString() ?? "-";

    setCookieData({
      positionName: position,
      userName: name
    });
  }, []);

  const { register, handleSubmit, watch, reset } = useForm<ContactAnswerValues>(
    {
      resolver: zodResolver(ContactAnswerSchema),
      mode: "onSubmit"
    }
  );
  const answersValue = watch("contents");
  const onSumbit = async (data: ContactAnswerValues) => {
    const response = await postJobInquiryAnswers({
      jobInqId: jobInqId,
      contents: data.contents
    });
    console.log(response);

    onReplyDone?.();
    reset({
      contents: ""
    });
    toast({
      description: `댓글이 등록되었습니다.`
    });
  };

  if (
    cookieData.positionName === undefined ||
    cookieData.userName === undefined
  ) {
    return null;
  }

  return (
    <section className="animate-fade-in border-t-[1px] border-solid border-gray30 pt-[12px] px-[16px] pb-[32px]">
      <div className="flex justify-between items-center mb-[12px]">
        <EtcChip text={cookieData.positionName} className="p-1 w-auto" />
        <p className="text-gray80 text-[12px]">{`${cookieData.userName}`}</p>
      </div>
      <div className="relative flex items-center">
        <Input
          {...register("contents")}
          placeholder="댓글을 입력해 주세요."
          className="w-full rounded-full placeholder:text-[14px] pr-[38px]"
        />
        <Modal
          open={showModal}
          onOpenChange={(open: boolean) => {
            if (open) {
              setShowModal(answersValue !== "");
            } else {
              setShowModal(false);
            }
          }}
          description={`댓글을 등록하시겠습니까?`}
          triggerClassName={`flex justify-center items-center text-white absolute right-0 w-[24px] h-[24px] rounded-full ${answersValue !== "" ? "bg-main" : "bg-gray50"} border-none mr-[8px]`}
          trigger={<ArrowUp width={20} height={20} />}
          onConfirm={handleSubmit(onSumbit)}
          cancelButton={{ text: "취소" }}
          confirmButton={{ text: "등록" }}
        />
      </div>
    </section>
  );
}
