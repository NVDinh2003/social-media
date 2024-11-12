import React from "react";

import "./IndividualReply.css";
import { Post, User } from "../../../../utils/GlobalInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { initializeCurrentReply } from "../../../../redux/Slices/PostSlice";
import { CreatePostTextArea } from "../CreatePostTextArea/CreatePostTextArea";
import { FeedPostCreatorImages } from "../../../feed/components/FeedPostCreatorImages/FeedPostCreatorImages";
import { CreateReplyBottom } from "../CreateReply/CreateReplyBottom/CreateReplyBottom";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface IndividualReplyProps {
  user: User;
  originalPost: Post;
}

export const IndividualReply: React.FC<IndividualReplyProps> = ({
  user,
  originalPost,
}) => {
  const currentFeedPost = useSelector(
    (state: RootState) => state.feed.currentPost
  );
  const postState = useSelector((state: RootState) => state.post);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/${originalPost.author.username}`);
  };

  const initReply = () => {
    if (currentFeedPost && user && !postState.currentPost) {
      dispatch(
        initializeCurrentReply({
          post: currentFeedPost,
          user,
        })
      );
    }
  };

  return (
    <div
      className={
        postState.currentReply
          ? "individual-reply"
          : "individual-reply inactive"
      }
    >
      <div className="individual-reply-left">
        <ProfilePicture user={user} size="40" />
      </div>

      <div className="individual-reply-right">
        {postState.currentReply && (
          <p className="individual-reply-replying-to">
            Replying to{" "}
            <span
              className="individual-reply-replying-to-user"
              onClick={navigateToProfile}
            >
              @{originalPost.author.username}
            </span>
          </p>
        )}

        <div className="individual-reply-text-wrapper" onClick={initReply}>
          <CreatePostTextArea location="reply" placeholder="Post your reply" />
        </div>
        {(postState.currentReplyImages.length > 0 ||
          (postState.currentReply &&
            postState.currentReply.images.length > 0)) && (
          <FeedPostCreatorImages />
        )}

        {postState.currentReply && <CreateReplyBottom type="reply" />}
      </div>
      {!postState.currentReply && (
        <div className="individual-reply-fake-btn">Reply</div>
      )}
    </div>
  );
};
