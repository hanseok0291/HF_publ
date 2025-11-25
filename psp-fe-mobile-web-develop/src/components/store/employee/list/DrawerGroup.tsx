import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  searchFilter,
  searchId
} from "@/app/constant/employee/CustomDrawerContent.data";
import { EmployeeListParam } from "@/app/store/(route)/employee/list/page";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import SearchInput from "@/components/common/SearchInput";

export default function DrawerGroup() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [authority, setAuthority] = useState<string>("");
  const [useYn, setUseYn] = useState("null");
  const { control } = useFormContext<EmployeeListParam>();
  const handeChange = (
    value: string,
    onChange: (value: boolean | null) => void
  ) => {
    if (value === "null") {
      return onChange(null);
    }
    if (value !== "null") {
      return onChange(value === "true");
    }
  };

  return (
    <>
      <div className="flex gap-[8px] self-stretch">
        <Controller
          name="useYn"
          control={control}
          render={({ field: { onChange, value } }) => (
            <BasicDrawer
              value={String(value)}
              onChange={(newValue) => {
                handeChange(newValue, onChange);
              }}
              title="사용여부"
              drawerTitle="아이디 사용여부 조회"
              selectedValue={useYn}
              onSelect={setUseYn}
              Content={CustomDrawerContent}
              contentProps={{
                data: searchId
              }}
              className="flex-[0_0_96px] h-[40px]"
            />
          )}
        />
        <div className="flex items-center gap-[8px] flex-[1_0_0%]">
          <span className="text-[14px] font-medium shrink-0">권한명</span>
          <Controller
            name="authorityGroupName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchInput
                initialValue={value ? decodeURIComponent(value) : ""}
                className="h-[40px] flex-[1_0_0%] border-gray40 rounded"
                placeholder="검색어를 입력해주세요"
                useInstantSearch={false}
                setKeyword={(newValue) => {
                  const processedValue = newValue
                    ? decodeURIComponent(newValue)
                    : "";
                  setAuthority(processedValue);
                  onChange(processedValue);
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-[8px] items-center self-stretch">
        <Controller
          name="searchFilter"
          control={control}
          render={({ field: { onChange, value } }) => (
            <BasicDrawer
              value={value ?? "ALL"}
              onChange={onChange}
              title="검색전체"
              drawerTitle="아이디 사용여부 조회"
              Content={CustomDrawerContent}
              contentProps={{
                data: searchFilter
              }}
              className="flex-[0_0_96px] h-[40px]"
            />
          )}
        />
        <Controller
          name="keyWord"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SearchInput
              initialValue={value ? decodeURIComponent(value) : ""}
              className="h-[40px] flex-[1_0_0%] border-gray40 rounded"
              useInstantSearch={false}
              setKeyword={(newValue) => {
                const processedValue = newValue
                  ? decodeURIComponent(newValue)
                  : "";
                setSearchKeyword(processedValue);
                onChange(processedValue);
              }}
            />
          )}
        />
      </div>
    </>
  );
}
