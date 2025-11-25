import { forwardRef, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { format, formatISO, isValid, parseISO, set } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type Props = React.ComponentProps<"input"> & {
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  minDate?: Date;
  maxDate?: Date;
  setValue?: UseFormSetValue<any>;
  name?: string;
  onCustomBlur?: (value: string) => void;
  timepicker?: boolean;
};

const NumBtnsColumn = ({
  value,
  length,
  onChange
}: {
  value?: number;
  length: number;
  onChange: (value: number) => void;
}) => {
  return (
    <ScrollArea className="h-full w-full p-1">
      {Array.from({ length }).map((u, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={cn(
            "size-[40px] flex items-center justify-center rounded-md hover:bg-gray30",
            value === index && "bg-gray30"
          )}
        >
          {index.toString().padStart(2, "0")}
        </button>
      ))}
      <ScrollBar />
    </ScrollArea>
  );
};

export const StyledInputDayPicker = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      className,
      error,
      value,
      onChange,
      onCustomBlur,
      minDate,
      maxDate,
      setValue,
      name,
      timepicker,
      ...others
    } = props;
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    // ISO 형식의 문자열에서 Date 객체 및 시간 정보 추출
    const parsedDate = useMemo(() => {
      if (!value) return null;

      try {
        const date = parseISO(value);
        // 유효한 날짜인지 확인
        return isValid(date) ? date : null;
      } catch (e) {
        console.error("Invalid date format:", value);
        return null;
      }
    }, [value]);

    // 시간 정보 추출
    const timeInfo = useMemo(() => {
      if (!parsedDate || !isValid(parsedDate)) return { hour: 0, minute: 0 };

      return {
        hour: parsedDate.getHours(),
        minute: parsedDate.getMinutes()
      };
    }, [parsedDate]);

    // 표시용 포맷팅된 값
    const displayValue = useMemo(() => {
      if (isFocused) {
        return inputValue;
      }

      if (!parsedDate || !isValid(parsedDate)) return "";

      try {
        if (timepicker) {
          return format(parsedDate, "yyyy-MM-dd HH:mm");
        }
        return format(parsedDate, "yyyy-MM-dd");
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    }, [parsedDate, timepicker, isFocused, inputValue]);

    const modifyDate = (inputValue: string) => {
      const cleaned = inputValue.replace(/\D/g, "");
      const now = new Date();

      const adjustDate = (year: number, rawMonth: number, rawDate: number) => {
        const adjustedYear = year < 1900 ? now.getFullYear() : year; // 1900 미만이면 현재 연도
        const month = Math.max(0, Math.min(11, rawMonth)); // 0 ~ 11
        const date = Math.max(1, rawDate); // 최소 1일
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const finalDate = Math.min(date, lastDayOfMonth);
        return set(now, { year: adjustedYear, month, date: finalDate });
      };

      let resultDate;
      switch (cleaned.length) {
        case 1: // 1 -> 2025-03-01
          resultDate = set(now, { date: parseInt(cleaned, 10) });
          break;
        case 2: // 00 -> 2025-03-01, 99 -> 2025-03-31
          resultDate = adjustDate(
            now.getFullYear(),
            now.getMonth(),
            parseInt(cleaned, 10)
          );
          break;
        case 3: // 100 -> 2025-01-01, 999 -> 2025-09-30
          resultDate = adjustDate(
            now.getFullYear(),
            parseInt(cleaned.slice(0, 1), 10) - 1,
            parseInt(cleaned.slice(1, 3), 10)
          );
          break;
        case 4: // 0000 -> 2025-01-01, 0312 -> 2025-03-12, 9999 -> 2025-12-31
          resultDate = adjustDate(
            now.getFullYear(),
            parseInt(cleaned.slice(0, 2), 10) - 1,
            parseInt(cleaned.slice(2, 4), 10)
          );
          break;
        case 5: // 50312 -> 2025-03-12 (연도 = 현재연도의 앞 3자리 + 입력 첫자리)
          resultDate = adjustDate(
            parseInt(
              now.getFullYear().toString().slice(0, 3) + cleaned.slice(0, 1),
              10
            ),
            parseInt(cleaned.slice(1, 3), 10) - 1,
            parseInt(cleaned.slice(3, 5), 10)
          );
          break;
        case 6: // 250312 -> 2025-03-12, 999999 -> 2099-12-31, 000000 => 2000-01-01
          resultDate = adjustDate(
            parseInt(`20${cleaned.slice(0, 2)}`, 10),
            parseInt(cleaned.slice(2, 4), 10) - 1,
            parseInt(cleaned.slice(4, 6), 10)
          );
          break;
        case 7: // 2250312 -> 2225-03-12 (연도 = 현재연도의 앞 1자리 + 입력 첫 3자리)
          resultDate = adjustDate(
            parseInt(
              now.getFullYear().toString().slice(0, 1) + cleaned.slice(0, 3),
              10
            ),
            parseInt(cleaned.slice(3, 5), 10) - 1,
            parseInt(cleaned.slice(5, 7), 10)
          );
          break;
        case 8: // 20250312 -> 2025-03-12, 20991299 -> 2099-12-31
          resultDate = adjustDate(
            parseInt(cleaned.slice(0, 4), 10),
            parseInt(cleaned.slice(4, 6), 10) - 1,
            parseInt(cleaned.slice(6, 8), 10)
          );
          break;
        default:
          return inputValue;
      }

      // 유효한 날짜인지 확인
      if (!isValid(resultDate)) {
        console.error("Invalid date generated:", resultDate);
        return inputValue;
      }

      // minDate, maxDate 범위 체크 추가
      if (minDate && resultDate < minDate) {
        // 최소 날짜보다 이전이면 minDate로 보정
        resultDate = minDate;
      }
      if (maxDate && resultDate > maxDate) {
        // 최대 날짜보다 이후면 maxDate로 보정
        resultDate = maxDate;
      }

      // 날짜 포맷 적용
      if (timepicker) {
        // 타임피커 활성화된 경우 시간 정보 유지
        if (parsedDate && isValid(parsedDate)) {
          // 기존 시간 정보 유지
          resultDate.setHours(parsedDate.getHours());
          resultDate.setMinutes(parsedDate.getMinutes());
        } else {
          // 기본 시간 설정 (00:00)
          resultDate.setHours(0, 0, 0, 0);
        }
        // ISO 형식으로 반환
        return formatISO(resultDate);
      } else {
        // 타임피커가 비활성화된 경우, 시간 정보 제거하고 yyyy-MM-dd 형식으로 반환
        resultDate.setHours(0, 0, 0, 0);
        return format(resultDate, "yyyy-MM-dd");
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = e.target.value;
      setInputValue(newInputValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // 포맷팅된 값이 있으면 그대로 표시, 없으면 빈 문자열
      setInputValue(
        parsedDate && isValid(parsedDate)
          ? timepicker
            ? format(parsedDate, "yyyy-MM-dd HH:mm")
            : format(parsedDate, "yyyy-MM-dd")
          : ""
      );
      e.target.select();
    };

    const handleBlur = () => {
      setIsFocused(false);

      // 입력값이 있을 때만 처리
      if (inputValue) {
        const formattedValue = modifyDate(inputValue);

        if (setValue && name) {
          setValue(name, formattedValue, { shouldValidate: true });
        }

        if (onCustomBlur) {
          onCustomBlur(formattedValue);
        }

        if (onChange) {
          onChange(formattedValue);
        }
      }
    };

    const handleSelect = (date: Date | undefined) => {
      if (!date || !isValid(date)) return;

      // 날짜 선택 후 포맷팅
      let formattedDate: string;

      if (timepicker) {
        // 타임피커 활성화된 경우 시간 정보 유지
        if (parsedDate && isValid(parsedDate)) {
          date.setHours(timeInfo.hour);
          date.setMinutes(timeInfo.minute);
        } else {
          date.setHours(0, 0, 0, 0);
        }
        // ISO 형식으로 반환
        formattedDate = formatISO(date);
      } else {
        // 타임피커 비활성화 시, 시간 정보 제거하고 yyyy-MM-dd 형식으로 반환
        date.setHours(0, 0, 0, 0);
        formattedDate = format(date, "yyyy-MM-dd");
      }

      // 변경사항 적용
      if (onChange) {
        onChange(formattedDate);
      }

      // 타임피커가 활성화된 상태에서는 날짜를 선택해도 팝오버를 닫지 않음
      if (!timepicker) {
        setOpen(false);

        // 팝오버가 닫힐 때 onCustomBlur 호출
        if (onCustomBlur && formattedDate) {
          setTimeout(() => {
            onCustomBlur(formattedDate);
          }, 0);
        }
      }
    };

    // 시간 변경 핸들러
    const handleTimeChange = (type: "hour" | "minute", newValue: number) => {
      // 날짜가 없는 경우 현재 날짜 사용
      const date =
        parsedDate && isValid(parsedDate) ? new Date(parsedDate) : new Date();

      // 시간 정보 업데이트
      if (type === "hour") {
        date.setHours(newValue);
      } else {
        date.setMinutes(newValue);
      }

      // 타임피커가 활성화된 경우에만 ISO 형식으로 변환
      const formattedDate = timepicker
        ? formatISO(date)
        : format(date, "yyyy-MM-dd");

      if (onChange) {
        onChange(formattedDate);
      }
    };

    return (
      <Popover
        open={open}
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          // 팝오버가 닫힐 때 onCustomBlur 호출
          if (!newOpen && onCustomBlur && value) {
            setTimeout(() => {
              onCustomBlur(value);
            }, 0);
          }
        }}
        modal
      >
        <div
          className={cn(
            "flex h-[48px] w-[180px] border border-gray40 rounded bg-gray10 items-center px-2",
            error && "border-[#EF4444] focus-visible:ring-0",
            others.disabled && "bg-[#E5E7EB] border-none",
            className
          )}
        >
          <input
            className={cn(
              "border-none outline-none w-full bg-gray10 text-xs text-[#030712]",
              others.disabled && "bg-[#E5E7EB] border-none"
            )}
            ref={ref}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={timepicker ? "YYYY-MM-DD HH:MM" : "YYYY-MM-DD"}
            disabled={others.disabled}
            autoFocus={others.autoFocus}
          />
          {!props.disabled && (
            <>
              <PopoverTrigger asChild className="cursor-pointer">
                <CalendarIcon className="size-4" />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 relative" align="start">
                <Calendar
                  mode="single"
                  locale={ko}
                  selected={
                    parsedDate && isValid(parsedDate) ? parsedDate : undefined
                  }
                  onSelect={handleSelect}
                  initialFocus
                  disabled={(date) =>
                    (minDate ? date < minDate : false) ||
                    (maxDate ? date > maxDate : false)
                  }
                />
                {timepicker && (
                  <div className="box-content absolute top-0 right-0 bg-white h-full translate-x-[100%] translate-y-[-1px] flex shadow-md rounded-r-sm border-t outline-none">
                    {/* Hour */}
                    <NumBtnsColumn
                      value={timeInfo.hour}
                      length={24}
                      onChange={(hour) => handleTimeChange("hour", hour)}
                    />
                    {/* Minute */}
                    <NumBtnsColumn
                      value={timeInfo.minute}
                      length={60}
                      onChange={(minute) => handleTimeChange("minute", minute)}
                    />
                  </div>
                )}
              </PopoverContent>
            </>
          )}
        </div>
      </Popover>
    );
  }
);
