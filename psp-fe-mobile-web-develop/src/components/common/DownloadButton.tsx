import { ApiError } from "@/types/HttpClient.type";
import { useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import Button from "./Button";
import DownloadLoading from "./DownloadLoading";

type DownloadProp = {
  file: any;
  downloadAction: () => Promise<any>;
};

export function isValidDownloadFiles(files?: any[]): boolean {
  return !!files && files.length > 0;
}

export default function DownloadButton({ file, downloadAction }: DownloadProp) {
  const [isDownloading, setDownloading] = useState<boolean>(false); // 다운로드 로딩 표시 처리

  const handleOnClick = async () => {
    try {
      if (!file) {
        toast({
          description: "파일이 존재하지 않습니다."
        });
      }
      setDownloading(true);
      toast({
        description: "파일을 다운로드 시작합니다."
      });
      await downloadAction();
      setDownloading(false);
    } catch (error: any) {
      toast({
        description: `${(error as ApiError).message ?? "파일 다운로드에 실패했습니다."}`
      });
    }
  };
  return (
    <Button
      className="bg-[#F4F4F4] p-2 rounded-md w-[32px] h-[32px]"
      disabled={isDownloading}
      onClick={handleOnClick}
    >
      {isDownloading ? (
        <DownloadLoading />
      ) : (
        <Image
          src="/icons/download.svg"
          alt="download"
          width={20}
          height={20}
        />
      )}
    </Button>
  );
}
