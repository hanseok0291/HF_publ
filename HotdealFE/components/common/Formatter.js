import moment from "moment";

//2022-01-01 00:00:00
export const getRealDate = (date) => {
  if (!date || date.length === 0) return;
  const yy = date.substring(0, 4);
  const mm = date.substring(4, 6);
  const dd = date.substring(6, 8);

  let h = "00";
  let m = "00";
  let s = "00";

  if (date.length === 14) {
    h = date.substring(8, 10);
    m = date.substring(10, 12);
    s = date.substring(12, 14);
  }

  return new Date(yy, mm - 1, dd, h, m, s);
};

export const getDoW = (dt) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const stDofW = week[new Date(dt).getDay()];

  return stDofW;
};

export const dispYYMMDD = (date) => {
  const dt = getRealDate(date);
  return moment(dt).format("YY년 M월 D일");
};

export const dispMMDDHHMMSS = (date) => {
  const dt = getRealDate(date);
  return moment(dt).format("M월 D일 HH:mm:ss");
};

export const dispDate = (date) => {
  const dt = getRealDate(date);
  const mmt = moment(dt);

  return `${mmt.format("YYYY. M. D")} ${dispAmPm(
    mmt.format("HH")
  )} ${mmt.format("h")}:${mmt.format("mm")}`;
};

export const dispYYYYMMDDHHMMSS = (date) => {
  const dt = getRealDate(date);
  const mmt = moment(dt);

  return `${mmt.format("YYYY. MM. DD")} ${mmt.format("HH")}:${mmt.format(
    "mm"
  )}:${mmt.format("ss")}`;
};

export const dispStartDay = (date) => {
  const dt = getRealDate(date);
  return moment(dt).format("M월 D일");
};

export const dispPeriod = (date1, date2) => {
  const mmt1 = moment(getRealDate(date1));
  const mmt2 = moment(getRealDate(date2));

  return `${mmt1.format("YYYY.M.D")} ~ ${mmt2.format("YYYY.M.D")}`;
};

export const dispYYMMDDWithWeek = (date) => {
  const dt = getRealDate(date);
  return moment(dt).format("YY. M. D") + "(" + getDoW(dt) + ")";
};

export const dispAmPm = (date) => {
  const time = date.substring(0, 2);
  let amPm = "오전";

  if (time > 12) {
    amPm = "오후";
  }
  return amPm;
};

export const price = (price) => {
  let nFormat = new Intl.NumberFormat();
  return nFormat.format(price);
};

export const name = (name) => {
  if (name.length > 6) {
    name = name.substr(0, 6) + "...";
  }
  return name;
};
