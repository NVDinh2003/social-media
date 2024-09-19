import React from "react";

import "./Reply.css";
import { Post } from "../../../../utils/GlobalInterface";
import CircleIcon from "@mui/icons-material/Circle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";

import { convertPostedDateToString } from "../../utils/PostUtils";

interface ReplyProps {
  reply: Post;
}

export const Reply: React.FC<ReplyProps> = ({ reply }) => {
  //
  const defaultPfp = process.env.REACT_APP_PFP;

  return (
    <div className="reply">
      <div className="post-left">
        <img
          className="post-pfp"
          src={
            reply.author.profilePicture
              ? reply.author.profilePicture.imageURL
              : defaultPfp
          }
          alt={`${reply.author.nickname}'s pfp`}
        />
      </div>

      <div className="post-right">
        <div className="post-right-top">
          <div className="post-user-info">
            <p className="post-nickname">{reply.author.nickname}</p>
            {/* Add in verified once i add verified to the user on the backend */}
            {reply.author.verifiedAccount && (
              <VerifiedIcon
                sx={{
                  color: "#1da1f2",
                  width: "20px",
                  height: "20px",
                }}
              />
            )}

            {/* Add in ord image once i add orgs to the user on the backend */}
            {reply.author.organization && (
              <img
                className="post-organization"
                src={reply.author.organization.imageURL}
                alt={`${reply.author.username}'s organization`}
              />
            )}

            <p className="post-username">@{reply.author.username}</p>
            {/* <div className="post-dot-section">
              <p className="post-dot">.</p>
            </div> */}
            <CircleIcon
              sx={{
                height: "4px",
                width: "4px",
                color: "#657786",
              }}
            />
            {/* Update convert posted date to string to say hours up to 24, days up to 7, then mon day if this year, mon day, year after */}
            {reply.postedDate && (
              <p className="post-posted-at">
                {convertPostedDateToString(reply.postedDate)}
              </p>
            )}
          </div>
        </div>

        <div className="post-content">{reply.content}</div>

        {<p className="reply-show-more">Show more</p>}
      </div>
    </div>
  );
};
