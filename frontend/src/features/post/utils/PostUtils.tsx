import LocationSVG from "../../../components/SVGs/LocationSVG";
import { MONTHS } from "../../../utils/DateUtils";
import { Post } from "../../../utils/GlobalInterface";
import { getDisplayLocationInfo } from "../../feed/utils/LocationUtils";

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

// export const formatTextContent = (text: any) => {
//   return { __html: text.replace(/\n/g, "<br />") };
// };

export const convertPostContentToElements = (
  content: string,
  location: string
): JSX.Element[] => {
  let tags: JSX.Element[] = [
    <span
      className={
        location === "creator"
          ? "feed-post-creator-content-paragraph"
          : "post-content-span"
      }
    ></span>,
  ];

  if (!content) {
    return []; // Trả về mảng rỗng nếu content là null hoặc undefined
  }

  let characters: string[] = Array.from(content);
  let currentWord = "";
  for (let char of characters) {
    if (char === "\n" || char === "\r") {
      tags.push(<br />);
      tags.push(
        <span
          className={
            location === "creator"
              ? "feed-post-creator-conent-paragraph"
              : "post-content-span"
          }
        ></span>
      );
      currentWord = "";
    } else if (char !== " ") {
      currentWord += char;
      tags.splice(
        tags.length - 1,
        1,
        <span
          className={
            location === "creator"
              ? "feed-post-creator-conent-paragraph"
              : "post-content-span"
          }
        >
          {currentWord}
        </span>
      );
    } else {
      tags.push(
        <span
          className={
            location === "creator"
              ? "feed-post-creator-conent-paragraph"
              : "post-content-span"
          }
        >
          {" "}
        </span>
      );
      tags.push(
        <span
          className={
            location === "creator"
              ? "feed-post-creator-conent-paragraph"
              : "post-content-span"
          }
        ></span>
      );
      currentWord = "";
    }
  }

  tags = tags.map((tag) => {
    if (
      tag.props.children &&
      typeof tag.props.children === "string" &&
      tag.props.children.startsWith("@") &&
      tag.props.children.length > 1
    ) {
      tag = {
        ...tag,
        props: {
          ...tag.props,
          className:
            location === "creator"
              ? "feed-post-creator-content-paragraph-mention"
              : "post-content-mention",
        },
      };
    }

    return tag;
  });

  return tags;
};

export const convertPostContentToElementsForNotifications = (
  elements: JSX.Element[]
) => {
  return elements.map((element) => {
    element = {
      ...element,
      props: {
        ...element.props,
        className: "post-notification-content-text",
      },
    };

    return element;
  });
};

export const convertCount = (count: number) => {
  if (count >= 1_000_000 && count < 10_000_000)
    return `${(count / 1_000_000).toFixed(2)}M`;
  else if (count >= 10_000_000 && count < 100_000_000)
    return `${(count / 1_000_000).toFixed(1)}M`;
  else if (count >= 100_000_000 && count < 1_000_000_000)
    return `${Math.floor(count / 1_000_000)}M`;
  else if (count >= 1_000_000_000)
    return `${(count / 1_000_000_000).toFixed(1)}B`;
  else if (count >= 1000 && count < 10_000)
    return `${(count / 1000).toFixed(2)}K`;
  else if (count >= 10_000 && count < 100_000)
    return `${(count / 1000).toFixed(1)}K`;
  else if (count >= 100_000 && count < 1_000_000)
    return `${Math.floor(count / 1000)}K`;

  return `${count}`;
};

export const getMarginLeft = (count: number) => {
  if (count < 10) return "26px";
  // if (count < 100) return "10px";
  if (count < 1000) return "28px";
  return "28px";
};

export const renderLocationInfo = (post: Post) => {
  if (!post) return null;

  const { districtCode, provinceCode, wardCode, address } = post;
  const isLocationValid = districtCode && provinceCode && wardCode;

  if (!isLocationValid) return null;

  // console.log(districtCode, provinceCode, wardCode);

  const locationInfo = getDisplayLocationInfo({
    address,
    provinceCode,
    districtCode,
    wardCode,
  });

  return (
    <div className="location-modal-content-address-info">
      <LocationSVG height={20} width={20} color={"#1da1f2"} />
      <p className="location-modal-content-address-info-text">{locationInfo}</p>
    </div>
  );
};
