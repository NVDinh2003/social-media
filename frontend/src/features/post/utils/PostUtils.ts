import { MONTHS } from "../../../utils/DateUtils";

export const convertPostedDateToString = (postedDate: Date): string => {
  const postedDateString = `${postedDate}`;
  let d = new Date(postedDateString);
  let today = new Date();

  let timeDifference = today.getTime() - d.getTime();

  let minutes = Math.round(timeDifference / 60_000);
  if (minutes < 60) return `${minutes}m ago`;

  let hours = Math.round(timeDifference / (60_000 * 60));
  if (hours < 24) return `${hours}h ago`;

  let days = Math.round(timeDifference / (1000 * 3600 * 24));
  if (days < 7) return `${days}d ago`;

  if (d.getFullYear() === today.getFullYear())
    return `${MONTHS[d.getMonth() + 1].substring(0, 3)} ${d.getDate()}`;

  return `${MONTHS[d.getMonth() + 1].substring(
    0,
    3
  )} ${d.getDate()}, ${d.getFullYear()}`;
};
