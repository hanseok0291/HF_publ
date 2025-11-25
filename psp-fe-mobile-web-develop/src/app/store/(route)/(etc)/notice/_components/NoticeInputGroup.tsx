"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { noticeSearchFilter } from "@/app/constant/employee/CustomDrawerContent.data";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import SearchInput from "@/components/common/SearchInput";
import { NoticeStoreParam } from "../page";

export default function NoticeInputGroup() {
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const { control } = useFormContext<NoticeStoreParam>();
  return (
    <div className="flex gap-[0.38rem] w-full animate-fade-in">
      <Controller
        name="filterType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value}
            onChange={onChange}
            drawerTitle="조회 검색필터 선택"
            title="검색전체"
            selectedValue={filterType}
            onSelect={setFilterType}
            Content={CustomDrawerContent}
            contentProps={{
              data: noticeSearchFilter
            }}
            className="min-w-[84px]"
          />
        )}
      />
      <Controller
        name="keyWord"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SearchInput
            initialValue={value ? decodeURIComponent(value) : ""}
            className="h-[48px] border-gray40 rounded"
            placeholder="검색어를 입력해주세요"
            useInstantSearch={false}
            setKeyword={(newValue) => {
              const processedValue = newValue
                ? decodeURIComponent(newValue)
                : "";
              setSearch(processedValue);
              onChange(processedValue);
            }}
          />
        )}
      />
    </div>
  );
}
