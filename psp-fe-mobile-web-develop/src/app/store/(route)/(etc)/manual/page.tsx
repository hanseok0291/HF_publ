"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { getStoreManualFile, getStoreManualList } from "@/apis/etc/manualApi";
import Loading from "@/app/loading";
import CustomPagination from "@/components/common/CustomPagination";
import DownloadButton, {
  isValidDownloadFiles
} from "@/components/common/DownloadButton";
import MainContainer from "@/components/common/MainContainer";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import { formatDateWithTime, formatMaskingName } from "@/utils/formatUtils";
import ManualInputGroup from "./_components/ManualInputGroup";

export type ManualStoreParam = ExtractParam<typeof getStoreManualList>;
const manual = () => {
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지
  const form = useForm<ManualStoreParam>({
    mode: "onChange",
    defaultValues: {
      filterType: "ALL",
      page: currentPage,
      size: 10,
      sort: []
    }
  });
  const { watch, setValue } = form;
  const { swrResponse } = getStoreManualList(watch());
  const { totalPages = 0 } = swrResponse?.data?.content ?? {};

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowAndMenuHeader headerTitle="매뉴얼" />
        {!swrResponse.error && swrResponse.isLoading && <Loading />}
        {!swrResponse || !swrResponse.data ? (
          <p>데이터를 가져오는 과정에 문제가 생겼습니다.</p>
        ) : (
          <div className="relative">
            {swrResponse.data.content.content.map((manual) => (
              <div key={manual.manualId}>
                <div className="p-[1.25rem] flex gap-[0.5rem]">
                  <div className="flex justify-start items-start">
                    <Image
                      src={`/icons/${manual.fileExtensionType ?? "PDF"}.svg`}
                      alt={`${manual.title} 매뉴얼 아이콘`}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex w-[252px] flex-col gap-[0.5rem]">
                      <p className="text-[0.875rem] font-medium max-w-[270px]">
                        {manual.title}
                      </p>
                      <div className="flex gap-1">
                        <p className="text-[0.75rem] font-normal text-[#777]">
                          {manual.insertionIstt.slice(0, 2)}
                        </p>
                        <p className="text-[0.75rem] text-[#DDD]">|</p>
                        <p className="text-[0.75rem] font-normal text-[#777]">
                          {formatMaskingName(manual.insertionName)}
                        </p>
                        <p className="text-[0.75rem] text-[#DDD]">|</p>
                        <p className="text-[0.75rem] font-normal text-[#777]">
                          {formatDateWithTime(manual.insertionDate)}
                        </p>
                      </div>
                    </div>
                    {isValidDownloadFiles(manual.manualFiles) ? (
                      <DownloadButton
                        file={manual.manualFiles[0]}
                        downloadAction={() =>
                          getStoreManualFile({
                            manualFileId: manual.manualFiles[0].manualFileId
                          })
                        }
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <hr className="w-full" />
              </div>
            ))}
            <div className="flex flex-col gap-[1rem] p-[1.5rem] w-full static bottom-0">
              <CustomPagination
                pageNumber={watch("page")}
                onClick={(page) => setValue("page", page)}
                totalPages={totalPages}
              />
              <ManualInputGroup />
            </div>
          </div>
        )}
      </MainContainer>
    </FormProvider>
  );
};

export default manual;
