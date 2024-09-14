import React from "react";

import "./CreateReplyBody.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/Store";
import VerifiedIcon from "@mui/icons-material/Verified";
import CircleIcon from "@mui/icons-material/Circle";
import { convertPostedDateToString } from "../../../utils/PostUtils";

export const CreateReplyBody: React.FC = () => {
  const defaultPfp = process.env.REACT_APP_PFP;
  const post = useSelector((state: RootState) => state.feed.currentPost);

  return (
    <div className="create-reply-body">
      {post && (
        <div className="create-reply-body-post">
          <div className="create-reply-body-post-left">
            <img
              src={
                post.author.profilePicture
                  ? post.author.profilePicture.imageURL
                  : defaultPfp
              }
              alt={`${post.author.nickname}'s pfp`}
              className="create-reply-body-post-pfp"
            />

            <div className="create-reply-body-post-divider"></div>
          </div>

          <div className="create-reply-body-post-right">
            <div className="create-reply-body-post-top-right">
              <p className="create-reply-body-post-nickname">
                {post.author.nickname}
              </p>

              {post.author.verifiedAccount && (
                <VerifiedIcon
                  sx={{
                    color: "#1da1f2",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}

              {post.author.organization && (
                <img
                  className="post-organization"
                  src={post.author.organization.imageURL}
                  alt={`${post.author.username}'s organization`}
                />
              )}

              <p className="create-reply-body-post-username">
                @{post.author.username}
              </p>

              <CircleIcon
                sx={{
                  height: "2px",
                  width: "2px",
                  color: "#657786",
                }}
              />
              {post.postedDate && (
                <p className="create-reply-body-posted-date">
                  {convertPostedDateToString(post.postedDate)}
                </p>
              )}
            </div>

            <div className="create-reply-body-post-bottom-right">
              <div className="create-reply-body-post-content">
                {post.content}
              </div>
              <p className="create-reply-body-post-replying-to">
                Replying to{" "}
                <span className="create-reply-body-post-replying-to-user post-content-span">
                  @{post.author.username}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="create-reply-body-reply">
        {/* Refactor the feed post creator to reuse in here */}
      </div>
    </div>
  );
};
