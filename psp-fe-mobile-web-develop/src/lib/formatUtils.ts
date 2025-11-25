/**
 *
 * @param {string} phoneNumber '01012341234'
 * @returns '010-1234-1234
 */
// export const formattingPhoneNum = (phoneNumber?: string | null) => {
//   const numbers = phoneNumber?.replace(/\D/g, "") ?? "";

//   if (numbers.length <= 7) {
//     return numbers.replace(/(\d{3})(\d{3,4})/, "$1-$2");
//   } else {
//     return numbers.replace(/(\d{2,3})(\d{3,4})(\d{1,4})/, "$1-$2-$3");
//   }
// };
export const formattingPhoneNum = (phoneNumber?: string | null) => {
  const numbers = phoneNumber?.replaceAll(/[^0-9]/g, "") ?? "";
  const length = numbers.length;

  if (length === 8) {
    return numbers.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (numbers.startsWith("02") && (length === 9 || length === 10)) {
    return numbers.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3");
  } else if (!numbers.startsWith("02") && (length === 10 || length === 11)) {
    return numbers.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  } else {
    return numbers;
  }
};

/**
 *
 * @param {string} number '10000000'
 * @returns '10,000,000'
 */
export const numWithComma = (number?: number | string) => {
  const exclude = [undefined, null, ""];
  if (exclude.includes(number as any)) return "0";

  if (typeof number === "number") {
    return new Intl.NumberFormat("ko-KR").format(number);
  }

  const numberRegex = /^-?\d*\.?\d+$/;
  if (!numberRegex.test(number!)) {
    return number;
  }

  return new Intl.NumberFormat("ko-KR").format(Number(number));
};
