import { MyInfoResponseType } from "@/types/apiType/Common.type";
import { useEffect, useState } from "react";
import { getMyInfo, putMyInfo } from "@/apis/common/commonApis";

type GetMyInfoResponse = {
  telePhoneNumber: string;
  cellPhoneNumber: string;
  secondAuthKindCode: string;
};

export const useMyInfo = () => {
  const [myInfo, setMyInfo] = useState<MyInfoResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyInfo = async () => {
    try {
      const response = await getMyInfo();
      setMyInfo(response.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMyInfo = async (data: GetMyInfoResponse) => {
    const response = await putMyInfo(data);
    return response;
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return {
    myInfo,
    isLoading,
    setIsLoading,
    updateMyInfo,
    refreshMyInfo: fetchMyInfo
  };
};
