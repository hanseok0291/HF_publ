import { ApiFunction } from "@/types/HttpClient.type";
import { postRequest } from "@/lib/httpClients";
import { fileToBase64 } from "@/lib/utils";

/**
 * @description 수거 불가 사유 수정 API 함수
 * @param requestId - 수거 불가 해당 ID
 * @param disposeRefusalReason - 수거 불가 사유 내용
 * @param {boolean} additionPaymentYn - 추가 결제 필요
 * @param wasteRequestRejectedReqDtoList - 수거 불가 처리할 쓰레기 ID
 * @param files - 첨부 파일 배열
 * @returns
 */
export const putRejectedWasteCollection: ApiFunction<
  {
    requestId: string;
    disposeRefusalReason: string;
    additionPaymentYn: boolean;
    wasteCollectId: string;
    changeWasteId: string;
    files: File[];
  },
  string
> = async (params) => {
  const { files, ...reqDto } = params;
  // const formData = new FormData();

  // formData.append(
  //   "reqDto",
  //   new Blob([JSON.stringify(reqDto)], { type: "application/json" })
  // );

  // files.forEach((file) => {
  //   formData.append("files", file);
  // });

  const reqParams = {
    ...reqDto,
    files: await Promise.all(files.map((file) => fileToBase64(file)))
  };

  return postRequest({
    url: `/v1/institution/app/waste-collection/request/update-status/rejected/${params.requestId}`,
    params: reqParams
  });
};
