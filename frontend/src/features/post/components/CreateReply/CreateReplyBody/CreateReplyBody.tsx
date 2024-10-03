import React, { useEffect } from "react";

import "./CreateReplyBody.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import VerifiedIcon from "@mui/icons-material/Verified";
import CircleIcon from "@mui/icons-material/Circle";
import {
  convertPostContentToElements,
  convertPostedDateToString,
} from "../../../utils/PostUtils";
import { CreatePostTextArea } from "../../CreatePostTextArea/CreatePostTextArea";
import { initializeCurrentReply } from "../../../../../redux/Slices/PostSlice";
import { FeedPostCreatorImages } from "../../../../feed/components/FeedPostCreatorImages/FeedPostCreatorImages";
import { FeedPostCreatorPoll } from "../../../../feed/components/FeedPostCreatorPoll/FeedPostCreatorPoll";

export const CreateReplyBody: React.FC = () => {
  const defaultPfp = process.env.REACT_APP_PFP;
  const feedPost = useSelector((state: RootState) => state.feed.currentPost);
  const postState = useSelector((state: RootState) => state.post);
  const user = useSelector((state: RootState) => state.user.loggedIn);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (feedPost && user) {
      dispatch(
        initializeCurrentReply({
          post: feedPost,
          user,
        })
      );
    }
  }, [feedPost?.postId, user?.userId]);

  return (
    <div className="create-reply-body">
      {feedPost && (
        <div className="create-reply-body-post">
          <div className="create-reply-body-post-left">
            <img
              src={
                feedPost.author.profilePicture
                  ? feedPost.author.profilePicture.imageURL
                  : defaultPfp
              }
              alt={`${feedPost.author.nickname}'s pfp`}
              className="create-reply-body-post-pfp"
            />

            <div className="create-reply-body-post-divider"></div>
          </div>

          <div className="create-reply-body-post-right">
            <div className="create-reply-body-post-top-right">
              <p className="create-reply-body-post-nickname">
                {feedPost.author.nickname}
              </p>

              {feedPost.author.verifiedAccount && (
                <VerifiedIcon
                  sx={{
                    color: "#1da1f2",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}

              {feedPost.author.organization && (
                <img
                  className="post-organization"
                  src={feedPost.author.organization.imageURL}
                  alt={`${feedPost.author.username}'s organization`}
                />
              )}

              <p className="create-reply-body-post-username">
                @{feedPost.author.username}
              </p>

              <CircleIcon
                sx={{
                  height: "2px",
                  width: "2px",
                  color: "#657786",
                }}
              />
              {feedPost.postedDate && (
                <p className="create-reply-body-posted-date">
                  {convertPostedDateToString(feedPost.postedDate)}
                </p>
              )}
            </div>

            <div className="create-reply-body-post-bottom-right">
              <div
                className="create-reply-body-post-content"
                // dangerouslySetInnerHTML={formatTextContent(feedPost.content)}
              >
                {convertPostContentToElements(feedPost.content, "creator")}
              </div>
              <p className="create-reply-body-post-replying-to">
                Replying to{" "}
                <span className="create-reply-body-post-replying-to-user post-content-span">
                  @{feedPost.author.username}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="create-reply-body-reply">
        {/* Refactor the feed post creator to reuse in here */}
        {postState.currentReply ? (
          <>
            <div className="create-reply-body-reply-content-group">
              <img
                className="create-reply-body-post-pfp"
                style={{ marginTop: "8px" }}
                src={
                  user && user.profilePicture
                    ? user.profilePicture.imageURL
                    : defaultPfp
                }
                alt="User's avatar"
              />
              <div className="create-reply-body-post-reply">
                <CreatePostTextArea
                  location="reply"
                  placeholder="Post your reply..."
                />
              </div>
            </div>

            {(postState.currentReplyImages.length > 0 ||
              (postState.currentReply &&
                postState.currentReply.images.length > 0)) && (
              <FeedPostCreatorImages />
            )}

            {postState.currentReply?.poll && <FeedPostCreatorPoll />}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
