"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { getTrashBagList } from "@/apis/trash-bag/trashBagApis";
import TrashBagDetailContainer from "@/app/store/(route)/trash-bag/detail/_components/TrashBagDetailContainer";
import CustomPagination from "@/components/common/CustomPagination";
import MainContainer from "@/components/common/MainContainer";
import { StyledInputDayPicker } from "@/components/common/StyledInputDayPicker";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import PaymentDrawerGroup from "./_components/PaymentDrawerGroup";
import ReceiptDrawerGroup from "./_components/ReceiptDrawerGroup";
import SearchDrawerGroup from "./_components/SearchDrawerGroup";

export type TrashBagListParam = ExtractParam<typeof getTrashBagList>;
export default function Page() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const form = useForm<TrashBagListParam>({
    mode: "onChange",
    defaultValues: {
      paymentMethod: null,
      paymentStatus: null,
      receiptTypeCode: null,
      receiptYn: null,
      searchFilter: "ALL",
      page: currentPage,
      size: 10,
      sort: []
    }
  });

  useEffect(() => {
    setValue("page", 1);
  }, [
    form.getValues("paymentMethod"),
    form.getValues("paymentStatus"),
    form.getValues("receiptYn"),
    form.getValues("receiptTypeCode"),
    form.getValues("searchFilter")
  ]);

  const { watch, setValue } = form;
  const { swrResponse } = getTrashBagList(watch());
  const { totalPages = 0 } =
    getTrashBagList(watch())?.swrResponse?.data?.content ?? {};

  const renderContent = () => {
    if (!swrResponse || !swrResponse.data) {
      return <div>데이터를 가져오는 과정에 문제가 생겼습니다.</div>;
    }

    return (
      <section className="p-[16px] flex flex-col gap-[12px] bg-gray10">
        <TrashBagDetailContainer />
      </section>
    );
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowAndMenuHeader headerTitle="봉투 구매 내역" />
        <form className="px-[20px] pt-[8px] pb-[16px] flex flex-col">
          <div className="flex flex-col gap-[8px]">
            {/* <DatePicker /> */}
            <div className="flex items-center gap-2">
              <Controller
                control={form.control}
                name="searchStartDate"
                render={({ field }) => {
                  const endDate = form.watch("searchEndDate");
                  const date = new Date(endDate);
                  date.setFullYear(date.getFullYear() - 1);
                  return (
                    <StyledInputDayPicker
                      {...field}
                      name="searchStartDate"
                      setValue={form.setValue}
                      maxDate={endDate ? new Date(endDate) : undefined}
                      minDate={endDate ? date : undefined}
                      error={Boolean(form.formState.errors.searchStartDate)}
                      className="!min-w-[100px]"
                    />
                  );
                }}
              />
              <Controller
                control={form.control}
                name="searchEndDate"
                render={({ field }) => {
                  const startDate = form.watch("searchStartDate");
                  const date = new Date(startDate);
                  date.setFullYear(date.getFullYear() + 1);
                  return (
                    <StyledInputDayPicker
                      {...field}
                      name="searchEndDate"
                      setValue={form.setValue}
                      minDate={startDate ? new Date(startDate) : undefined}
                      maxDate={startDate ? date : undefined}
                      error={Boolean(form.formState.errors.searchEndDate)}
                      className="!min-w-[100px]"
                    />
                  );
                }}
              />
            </div>
            <PaymentDrawerGroup />
            <ReceiptDrawerGroup />
            <SearchDrawerGroup />
          </div>
        </form>
        {renderContent()}
        <CustomPagination
          pageNumber={watch("page")}
          onClick={(page) => setValue("page", page)}
          totalPages={totalPages}
        />
      </MainContainer>
    </FormProvider>
  );
}
