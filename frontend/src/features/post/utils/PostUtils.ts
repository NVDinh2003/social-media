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

export const formatTextContent = (text: any) => {
  return { __html: text.replace(/\n/g, "<br />") };
};

export const convertCount = (count: number) => {
  if (count >= 1000 && count < 10_000) return `${(count / 1000).toFixed(2)}K`;
  else if (count >= 10_000 && count < 100_000)
    return `${(count / 1000).toFixed(1)}K`;
  else if (count >= 100_000 && count < 1_000_000)
    return `${Math.floor(count / 1000)}K`;
  return `${count}`;
};
