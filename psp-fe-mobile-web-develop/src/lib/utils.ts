"use client";

import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { isWebView } from "@/utils/WebViewHandler";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loginViewSlide() {
  const event = new CustomEvent("loginEvent", {
    detail: "success"
  });
  document.dispatchEvent(event);
}

export function phoneNumberFormmetting(value: string) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length < 4) {
    return numbers;
  } else if (numbers.length < 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (numbers.length < 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
}

// checkbox value array 조작
export function CBValueController<T extends string | number>(
  CBValueArray: T[],
  CBValue: T
) {
  // CBValueArray가 undefined일 경우 빈 배열로 초기화
  const safeArray = Array.isArray(CBValueArray) ? CBValueArray : [];

  return safeArray.includes(CBValue)
    ? safeArray.filter((value) => value !== CBValue)
    : [...safeArray, CBValue];
}

export const isNumber = (value: string) => /^[+-]?\d+(\.\d+)?$/.test(value);

/** 숫자 + 영어 소문자 조합의 난수 문자열인지 검증한다. */
export const isMixedRandomString = (value: string) =>
  /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/.test(value);

type FormatType = "default" | "short" | "long" | "timeOnly";

const predefinedFormats: Record<FormatType, string> = {
  default: "yyyy-MM-dd(HH:mm)",
  short: "yyyy-MM-dd",
  long: "EEEE, MMMM do yyyy, h:mm a",
  timeOnly: "HH:mm:ss"
};

export function formatDate(
  dateString: string,
  formatType: FormatType = "default"
): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const formatString = predefinedFormats[formatType];
  return format(date, formatString);
}

export function moveArrayItem(
  array: any[],
  fromIndex: number,
  toIndex: number
): any[] {
  // 배열 경계를 벗어나지 않도록 인덱스를 조정
  const validFromIndex = Math.max(0, Math.min(array.length - 1, fromIndex));
  const validToIndex = Math.max(0, Math.min(array.length - 1, toIndex));

  // 아이템 제거 후 복사
  const item = array[validFromIndex];
  const newArray = array.filter((_, index) => index !== validFromIndex);

  // 새로운 위치에 아이템 삽입
  newArray.splice(validToIndex, 0, item);

  return newArray;
}

export function updateUrlWithoutRefersh(value: Record<string, any>) {
  if (typeof window === "undefined") {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(value).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  });

  window.history.pushState(null, "", `?${searchParams.toString()}`);
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams);
}

export function serializeParams(
  obj: Record<string, any>,
  prefix: string = ""
): string {
  const queryString: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object" && value !== null) {
        queryString.push(serializeParams(value, fullKey)); // Recursively handle nested objects
      } else {
        queryString.push(
          `${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return queryString.join("&");
}

/** HTML img 태그에서 base64 인코딩 이미지를 보여주기 위한 처리가 된 문자열을 반환한다. */
export function getBase64ForHtml(base64: string, ext = "png") {
  return base64.startsWith("data:image")
    ? base64
    : `data:image/${ext};base64,${base64}`;
}

/** File 객체를 Base64 문자열로 변환 */
export const fileToBase64 = (
  file: File
): Promise<{
  /** 파일 데이터(base64) */
  base64: string;
  /** 파일명(확장자 제외) */
  name: string;
  /** 파일 확장자 */
  ext: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const extDotIndex = file.name.lastIndexOf(".");
      resolve({
        base64: reader.result?.slice(
          (reader.result as string)?.indexOf(",") + 1
        ) as string,
        name: file.name.slice(0, extDotIndex),
        ext: file.name.slice(extDotIndex + 1)
      });
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Expire Time 설정 (단위 : 초)
 *
 * 판매소/수거업체(Web) : 15분 (15 * 60)
 * 판매소/수거업체(APP) : 2주(14일) (14 * 24 * 60 * 60)
 */
export function getWebCookieMaxAge(): number {
  const WEB_MAX_AGE = 15 * 60;
  const APP_MAX_AGE = 4 * 60 * 60;

  let maxAge = WEB_MAX_AGE;

  // 앱 인경우
  if (isWebView()) {
    maxAge = APP_MAX_AGE;
  } else {
    // 웹 인경우
    maxAge = WEB_MAX_AGE;
  }

  return maxAge;
}
