"use client";

import { HeaderTitleType } from "@/types/components/common/CommonComponents.type";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next/client";
import { ArrowLeft } from "lucide-react";
import Modal from "@/components/common/Modal";

export default function HeaderTitle({
  isOpen,
  handleClick,
  headerTitle,
  isModal
}: HeaderTitleType) {
  const [cookieData, setCookieData] = useState({
    positionName: "",
    logoImage: ""
  });

  useEffect(() => {
    const positionName = getCookie("positionName")?.toString() ?? "";
    const logoImage = getCookie("logoImage")?.toString() ?? "-";
    console.log(logoImage);
    setCookieData({
      positionName: positionName,
      logoImage: logoImage
    });
  }, []);
  return (
    <>
      {isOpen ? (
        <div className="flex items-center gap-[10px]">
          <Image
            src={cookieData.logoImage}
            alt="로고 이미지"
            width={42}
            height={42}
          />
          <p className="text-[16px] font-bold text-black">
            {cookieData.positionName}
          </p>
        </div>
      ) : (
        <>
          {isModal ? (
            <Modal
              trigger={<ArrowLeft />}
              onConfirm={handleClick}
              description={`작성 중인 내용이 있습니다. \n나가시겠습니까?`}
              cancelButton={{ text: "취소" }}
            />
          ) : (
            <ArrowLeft onClick={handleClick} />
          )}

          <h4 className="text-black text-[16px] font-bold">{headerTitle}</h4>
        </>
      )}
    </>
  );
}
