import moment from "moment";
import {
  DD_MMM_YYYY,
  DD_MMM_YYYY_HH_MN_SS_A,
  MMM_YYYY,
  MM_YYYY,
  YYYY_MM_DD,
} from "@/app/constants/datepicker";

export const timeInMillis = () => moment().valueOf();

export const getFormattedDate = (timestamp) =>
  moment(timestamp).format(DD_MMM_YYYY);

export const getFormattedDateTime = (timestamp) =>
  moment(timestamp).format(DD_MMM_YYYY_HH_MN_SS_A);

export const getFormattedMinutes = (timeinseconds) =>
  moment.utc(timeinseconds * 1000).format("mm:ss");

export const getDateInMMYY = (timestamp) => moment(timestamp).format(MM_YYYY);

export const getDateInMMMYY = (timestamp) => moment(timestamp).format(MMM_YYYY);

export const getDateInYYMMDD = (timestamp) =>
  moment(timestamp).format(YYYY_MM_DD);

export const getRelativeTime = (timestamp) => moment(timestamp).fromNow();

export const getRelativeTimeSmall = (date) => {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  let output = "";

  switch (true) {
    case seconds < 60:
      output = `${seconds} sec`;
      break;
    case seconds < 60 * 60:
      output = `${Math.floor(seconds / 60)} min`;
      break;
    case seconds < 60 * 60 * 24:
      output = `${Math.floor(seconds / (60 * 60))} h`;
      break;
    case seconds < 60 * 60 * 24 * 30:
      output = `${Math.floor(seconds / (60 * 60 * 24))} d`;
      break;
    case seconds < 60 * 60 * 24 * 365:
      output = `${Math.floor(seconds / (60 * 60 * 24 * 30))} mon`;
      break;
    default:
      output = `${Math.floor(seconds / (60 * 60 * 24 * 365))} yr`;
      break;
  }

  return output;
};

export const secondToMintute = (seconds = 0) => {
  const format = seconds > 3600 ? "HH:mm:ss" : "mm:ss";
  return moment().startOf("day").seconds(seconds).format(format);
};

export const validateDates = (from, to) => moment(from).isBefore(to);
