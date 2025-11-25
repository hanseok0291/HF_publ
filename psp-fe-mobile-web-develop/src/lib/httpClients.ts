import { HTTP_METHOD } from "next/dist/server/web/http";
import { getCookie } from "cookies-next/client";
import cloneDeep from "lodash/cloneDeep";
import { handleFileDownload } from "@/utils/WebViewHandler";
import { serializeParams } from "./utils";

type HttpRequestParam = Omit<RequestInit, "method" | "body"> & {
  url: string;
  method: HTTP_METHOD;
  params?: Record<string, any>;
};

type HttpRequestCallerParam = Omit<HttpRequestParam, "method">;

const RETRY_LIMIT = 1;

/**
 * Remove undefined and null fields for Implements valid GET, DELETE Request URL
 * NOTE: 백엔드에서 undefined, null에 대한 예외처리가 되어있지 않을 경우 사용하고, 예외 처리가 되어있는 경우 사용하지 않는다.
 *       개발 중 한번이라도 해당 예외처리가 되어있지 않는 경우, 이후 재발생 가능하다 판단하여 프로젝트에 영구적으로 적용한다.
 */
export function clearEmptyFields(param?: Record<string, any>) {
  if (!!param) {
    const copiedParam = cloneDeep(param);
    return Object.fromEntries(
      Object.entries(copiedParam).filter(
        ([key, value], index) =>
          ![undefined, "undefined", "", null].includes(value)
      )
    );
  }

  return param;
}

async function httpRequest({
  url,
  method = "GET",
  params = {},
  ...options
}: HttpRequestParam) {
  const isGetOrDeleteRequest = ["GET", "DELETE"].includes(method);
  const isFormData = params instanceof FormData;

  const jsonParams = !isFormData ? cloneDeep(params) : {};

  // pageNumber를 index로 변환한다.
  if (isGetOrDeleteRequest && !isFormData) {
    !!jsonParams["page"] && (jsonParams["page"] = jsonParams["page"] - 1);
  }

  const reqParam = clearEmptyFields(jsonParams) ?? {};

  /** API Request URL */
  const requestUrl =
    isGetOrDeleteRequest && !isFormData
      ? `${url.trim()}?${serializeParams(reqParam).toString()}`
      : url;

  const { headers, ...otherOtions } = options;

  const option: RequestInit = {
    method,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      // ...(isFormData ? {  } : { "Content-Type": "application/json" }),
      ...(getCookie("X-Access-Token")
        ? { Authorization: `Bearer ${getCookie("X-Access-Token")}` }
        : {}),
      ...headers
    },
    body: (() => {
      if (isGetOrDeleteRequest) {
        return undefined;
      }

      if (isFormData) {
        return params;
      }

      return JSON.stringify(jsonParams);
    })(),
    ...otherOtions
  };

  async function requestAction(
    fetchUrl: string,
    retryCount: number,
    fetchOptions: RequestInit
  ) {
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      if (!response.ok && retryCount < RETRY_LIMIT && response.status >= 500) {
        return await requestAction(fetchUrl, retryCount + 1, fetchOptions);
      }

      // 리트라이 못 하는데 실패 떨어졌을 때
      if (!response.ok || ![0, 200].includes(response.status)) {
        const error = await response.json();
        throw error as {
          code: number;
          error: string;
          message: string;
          path: string;
          timeStamp: string; // LocalDateTime
        };
      }

      // Content-Type 헤더 확인
      const contentType = response.headers.get("content-type");
      const contentDisposition = response.headers.get("content-disposition");

      // ### 파일 다운로드 응답인 경우
      if (
        contentDisposition?.includes("attachment") ||
        contentType?.includes("application/octet-stream") ||
        contentType?.includes("application/vnd.ms-excel") ||
        contentType?.includes("application/vnd.openxmlformats-officedocument")
      ) {
        const blob = await response.blob();

        // 파일명 추출
        let filename = "download";
        // filename*= 패턴을 먼저 찾고, 없으면 일반 filename= 패턴을 찾음
        const filenameMatch =
          contentDisposition?.match(/filename\*=.+''(.+)/) ||
          contentDisposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, "");
          try {
            filename = decodeURIComponent(filename);
          } catch {
            // 디코딩 실패시 원본 사용
          }
        }

        // 파일 다운로드
        handleFileDownload(blob, filename, contentType ?? "");

        return { success: true, filename };
      }

      // ### HTML 응답인 경우
      if (contentType?.includes("text/html")) {
        if (response.ok) {
          const htmlResponse = await response.text();
          const newWindow = window.open("", "_blank");
          newWindow?.document.write(htmlResponse);
          // 새 탭 핸들링을 위해 윈도우 객체 반환
          return newWindow;
        } else {
          throw new Error("HTML 응답 실패");
        }
      }

      // ### 일반 응답인 경우
      return await response.json();
    } catch (error: any) {
      // TODO: api error retry 로직 변경 필요(현재 임시 방편으로 로그인 error에 한해서 retry 로직 skip 중)
      if (retryCount < RETRY_LIMIT && error.error !== "UNAUTHORIZED") {
        return await requestAction(fetchUrl, retryCount + 1, fetchOptions);
      }

      throw error;
    }
  }

  return requestAction(requestUrl, 0, option);
}

/** Http Get Request  */
export const getRequest = <T>(
  requestParam: HttpRequestCallerParam
): Promise<T> =>
  httpRequest({
    ...requestParam,
    method: "GET"
  });

/** Http Post Request  */
export const postRequest = <T>(
  requestParam: HttpRequestCallerParam
): Promise<T> =>
  httpRequest({
    ...requestParam,
    method: "POST"
  });
