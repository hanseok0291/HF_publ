"use client";

import { CustomTabsType } from "@/types/components/common/CommonComponents.type";
import { Controller, useController, useFormContext } from "react-hook-form";
import ContactTabs from "@/components/common/ContactTabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobInquiryListParam } from "../page";

export default function CustomTabsFoo({ className, data }: CustomTabsType) {
  const { control, setValue } = useFormContext<JobInquiryListParam>();
  const { field } = useController({ name: "writerType", control });

  return (
    <Tabs
      defaultValue="ALL"
      value={field.value}
      onValueChange={(value) => {
        field.onChange(value);
        setValue("page", 0);
      }}
    >
      {/** 조회 게시글 리스트*/}
      <Controller
        control={control}
        name="writerType"
        render={({ field: { onChange } }) => (
          <TabsList>
            {data.map((list) => {
              return (
                <div className="w-full" key={list.id}>
                  <TabsTrigger
                    value={list.value}
                    onClick={() => {
                      onChange(list.value);
                    }}
                    className={` ${
                      field.value === list.value
                        ? "text-black"
                        : "text-[#A5A5A5]"
                    } h-full whitespace-pre`}
                  >
                    {list.trigger}
                  </TabsTrigger>
                  <hr
                    className={`h-[2px] border-0 ${
                      field.value === list.value ? "bg-black" : "bg-[#F4F4F4]"
                    }`}
                  />
                </div>
              );
            })}
          </TabsList>
        )}
      />
      {data.map((list) => {
        return (
          <TabsContent value={list.value} key={list.id}>
            <ContactTabs />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
