import React, { useEffect, useMemo, useRef, useState } from "react";

import "./Reply.css";
import { Post } from "../../../../utils/GlobalInterface";
import CircleIcon from "@mui/icons-material/Circle";
import VerifiedIcon from "@mui/icons-material/Verified";

import {
  convertPostContentToElements,
  convertPostedDateToString,
} from "../../utils/PostUtils";
import { createImagePostContainer } from "../../../feed/utils/FeedUtils";

interface ReplyProps {
  reply: Post;
}

export const Reply: React.FC<ReplyProps> = ({ reply }) => {
  //
  // console.log(reply);
  const defaultPfp = process.env.REACT_APP_PFP;
  const overflowRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState<boolean>(false);
  const replyImageContainer = useMemo(
    () => createImagePostContainer(reply.images),
    [reply.postId]
  );

  useEffect(() => {
    if (reply.content && overflowRef && overflowRef.current) {
      if (overflowRef.current.clientHeight < overflowRef.current.scrollHeight)
        setOverflowing(true);
    }
  }, [reply.content]);

  return (
    <div className="reply">
      <div className="reply-left">
        <img
          className="reply-pfp"
          src={
            reply.author && reply.author.profilePicture
              ? reply.author.profilePicture.imageURL
              : defaultPfp
          }
          alt={`${reply.author.nickname}'s pfp`}
        />
      </div>
      <div className="reply-right">
        <div className="post-right-top">
          <div className="post-user-info">
            <p className="post-nickname">{reply.author.nickname}</p>
            {reply.author.verifiedAccount && (
              <VerifiedIcon
                sx={{
                  color: "#1DA1F2",
                  width: "20px",
                  height: "20px",
                }}
              />
            )}
            {reply.author.organization && (
              <img
                className="post-organization"
                src={reply.author.organization.imageURL}
                alt={`${reply.author.username}'s organization`}
              />
            )}
            <p className="post-username">@{reply.author.username}</p>
            <CircleIcon
              sx={{ height: "4px", width: "4px", color: "#657786" }}
            />
            {reply.postedDate && (
              <p className="post-posted-at">
                {convertPostedDateToString(reply.postedDate)}
              </p>
            )}
          </div>
        </div>
        <div className="reply-content" ref={overflowRef}>
          {convertPostContentToElements(reply.content, "post")}
        </div>
        {overflowing && <p className="reply-show-more">Show more</p>}
        {reply.images.length > 0 && replyImageContainer}
      </div>
    </div>
  );
};
