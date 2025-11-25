"use client";

import { CustomMutate, CustomSwrResponse } from "@/types/HttpClient.type";
import { useMemo } from "react";
import useSWR, { preload, SWRConfiguration } from "swr";
import { getRequest } from "@/lib/httpClients";
import { serializeParams } from "@/lib/utils";

type CustomSWROptions = SWRConfiguration & {
  shouldFetch?: boolean;
};

const useCustomSWR = <T>(
  url: string,
  params: any,
  options: CustomSWROptions = {}
): CustomSwrResponse<T> => {
  const swrKey = useMemo(
    () =>
      params === null ? null : `${url}?${serializeParams(params).toString()}`,
    [url, params]
  );

  const fetcher = async () =>
    await getRequest({
      url,
      params: params ?? {}
    });

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    (options.shouldFetch ?? true) ? swrKey : null,
    fetcher,
    {
      ...options,
      /** 새로운 데이터가 업데이트 되기 전까지 이전 키의 데이터를 반환 하는 조건 */
      keepPreviousData: true
      // /** 브라우저의 온라인이 되었을때 api를 재호출하는 조건 */
      // revalidateOnReconnect: false,
      // /** 브라우저의 포커스가 벗어나고 다시 활성화 되었을때 api를 재호출하는 조건 */
      // revalidateOnFocus: false,
      // /** 오류 재시도 횟수에 대한 조건 */
      // errorRetryCount: 0,

      // // 캐시가 있는 경우, 리프레시하지 않고 캐시를 반환하는 조건
      // revalidateIfStale: false
    }
  );

  const preFetch = () => {
    return preload(swrKey, fetcher);
  };

  return {
    swrKey,
    preFetch,
    swrResponse: {
      data: data as T,
      error,
      isLoading,
      isValidating,
      mutate: mutate as CustomMutate<T>
    }
  };
};
export default useCustomSWR;
