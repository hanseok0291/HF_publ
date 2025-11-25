export function formatDateWithTime(
  inputDateString: string,
  type?: "default" | "detail" | "second"
) {
  if (inputDateString === null) {
    return "-";
  }
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");
  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds = String(inputDate.getSeconds()).padStart(2, "0");
  const defaultFormat = `${year}-${month}-${day}`;
  const detailFormat = `${year}-${month}-${day}(${hours}:${minutes})`;
  const secondFormat = `${year}-${month}-${day}(${hours}:${minutes}:${seconds})`;
  if (type === "default" || !type) {
    return defaultFormat;
  } else if (type === "detail") {
    return detailFormat;
  } else {
    return secondFormat;
  }
}

// Comma 제거
export function formatNumberWithoutCommas(
  strNumber: number | string,
  defaultValue: number = 0
) {
  try {
    const s = String(strNumber ?? "")
      .replace(/,/g, "")
      .trim();

    const number = Number(s);
    return Number.isFinite(number) ? Number(number) : defaultValue;
  } catch (e) {
    console.log(`formatNumberWithoutCommas Error : ${e}`);
    return defaultValue;
  }
}

// 숫자 포맷 함수
export function formatNumberWithCommas(number: number | string) {
  if (isNaN(number as number)) {
    return "isNaN";
  }
  if (!number || !/^[0-9,]/.test(String(number))) {
    return number as any;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 전화번호 포맷 함수
export function formatPhoneNumber(value: string) {
  const numbers = value?.replaceAll(/[^0-9]/g, "") ?? "";
  const length = numbers.length;

  if (length === 8) {
    return numbers.replace(/([0-9]{4})([0-9]{4})/, "$1-$2");
  } else if (numbers.startsWith("02") && (length === 9 || length === 10)) {
    return numbers.replace(/([0-9]{2})([0-9]{3,4})([0-9]{4})/, "$1-$2-$3");
  } else if (!numbers.startsWith("02") && (length === 10 || length === 11)) {
    return numbers.replace(/([0-9]{3})([0-9]{3,4})([0-9]{4})/, "$1-$2-$3");
  } else {
    return numbers
      .replace(/([0-9]{3})(?=\d)/g, "$1-")
      .replace(/([0-9]{4})(?=\d)/g, "$1-");
  }
}

export const formatMaskingName = (name: string) => {
  if (!name || name.length === 0) {
    return "-";
  }
  if (name.length === 1) {
    return name;
  }
  return name.charAt(0) + "*".repeat(name.length - 1);
};

export const formatMaskingEmail = (email: string) => {
  if (!email || email.length === 0) {
    return "-";
  }
  const mask = "*".repeat(email.split("@")[0].length - 1);
  return email.slice(0, 3) + mask + email.slice(mask.length + 1, email.length);
};

export function formatMaskingPhoneNumber(phoneNumber: string | null) {
  if (phoneNumber === null) return "-";
  const values = phoneNumber.split("-");

  if (values.length !== 3) return phoneNumber;

  values[1] = "*".repeat(values[1].length);
  values[2] = "*".repeat(values[2].length);

  return values.join("-");
}
