import React, { useRef, useState } from "react";

import "./FeedPostCreator.css";
import { Link } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";

export const FeedPostCreator: React.FC = () => {
  //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");

  const activate = () => {
    if (!active) setActive(true);
  };

  const autoGrow = () => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="feed-post-creator" onClick={activate}>
      <Link to="">
        <img
          src={process.env.REACT_APP_PFP}
          alt=""
          className="feed-post-creator-pfp"
        />
      </Link>

      <div className="feed-post-creator-right">
        <div
          className={
            active
              ? "feed-post-creator-audience"
              : "feed-post-creator-audience hide"
          }
        >
          Everyone
          <ExpandMore
            sx={{
              fontSize: "22px",
            }}
          />
        </div>

        <textarea
          className={
            active
              ? "feed-post-creator-input input-active"
              : "feed-post-creator-input"
          }
          placeholder="What is happening?!"
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
        />
        <div
          className={
            active ? "feed-post-creator-reply" : "feed-post-creator-reply hide"
          }
        >
          {<GlobeSVG height={14} width={14} color={"#1DA1F2"} />}
          Everyone can reply
        </div>
        <div
          className={
            active
              ? "feed-post-creator-bottom-icon icons-border"
              : "feed-post-creator-bottom-icon"
          }
        >
          <div className="feed-post-creator-icon-bg">
            <MediaSVG height={20} width={20} color={"#1DA1F2"} />
          </div>
          <div className="feed-post-creator-icon-bg">
            {" "}
            <GIFSVG height={20} width={20} color={"#1DA1F2"} />
          </div>
          <div className="feed-post-creator-icon-bg">
            {" "}
            <PollSVG height={20} width={20} color={"#1DA1F2"} />
          </div>
          <div className="feed-post-creator-icon-bg">
            {" "}
            <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
          </div>
          <div className="feed-post-creator-icon-bg">
            {" "}
            <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
          </div>
          <div className="feed-post-creator-location">
            {" "}
            <LocationSVG height={20} width={20} color={"rgba(29,161,242,.5)"} />
          </div>
          <button
            className={
              postContent === ""
                ? "feed-post-creator-post-button"
                : "feed-post-creator-post-button post-active"
            }
            disabled={postContent === ""}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
