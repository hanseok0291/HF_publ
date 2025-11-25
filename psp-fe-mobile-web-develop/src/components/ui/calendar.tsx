"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn("bg-white p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "black", size: "icon" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "selectedDay", size: "icon" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-black aria-selected:text-white",
        day_range_end:
          "day-range-end aria-selected:bg-black aria-selected:text-white",
        day_selected: "bg-black !text-white hover:bg-black/80 focus:bg-gray",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent-50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-[#e0e0e0] aria-selected:text-black",
        day_hidden: "invisible",
        caption_end: props.mode === "range" ? "border-l pl-4" : "",
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className="h-4 w-4 text-black" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className="h-4 w-4 text-black" />
        ),
        CaptionLabel: ({ displayMonth }) => (
          <span className="font-bold">
            {format(displayMonth, "yyyy년 MM월")}
          </span>
        ),
        DayContent: ({ date }) => (
          <span
            className={cn(
              date.getDay() === 0
                ? "text-red-500"
                : date.getDay() === 6
                  ? "text-blue-500"
                  : ""
            )}
          >
            {date.getDate()}
          </span>
        ),
        Head: () => (
          <thead>
            <tr className="grid grid-cols-[repeat(7,32px)]">
              {DAY_NAMES.map((day, index) => (
                <th
                  key={index}
                  className={
                    index === 0
                      ? "text-red-500"
                      : index === 6
                        ? "text-blue-500"
                        : ""
                  }
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        )
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
