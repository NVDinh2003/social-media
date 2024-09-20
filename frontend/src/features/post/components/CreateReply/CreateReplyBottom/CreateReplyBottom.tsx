import React from "react";

import "./CreateReplyBottom.css";
import { CreatePostButtonCluster } from "../../CreatePostButtonCluster/CreatePostButtonCluster";
import { FeedPostCreatorProgress } from "../../../../feed/components/FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import {
  createReply,
  createReplyWithMedia,
} from "../../../../../redux/Slices/PostSlice";
import { updateDisplayCreateReply } from "../../../../../redux/Slices/ModalSlice";

export const CreateReplyBottom = () => {
  const postState = useSelector((state: RootState) => state.post);
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch: AppDispatch = useDispatch();

  const generateButtonClass = (): string => {
    if (postState.currentReply) {
      let content: string = postState.currentReply.replyContent;
      // console.log(content);
      return content !== "" ||
        postState.currentReplyImages.length > 0 ||
        postState.currentReply.images.length >= 1 ||
        postState.currentReply.poll !== undefined
        ? "submit-reply-button reply-button-active"
        : "submit-reply-button reply-button-inactive";
    }
    return "submit-reply-button reply-button-inactive";
  };

  const activateButton = (): boolean => {
    if (postState.currentReply) {
      let content: string = postState.currentReply.replyContent;
      return !(
        content !== "" ||
        postState.currentReplyImages.length > 0 ||
        postState.currentReply.images.length >= 1 ||
        postState.currentReply.poll !== undefined
      );
    }
    return false;
  };

  const postReply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (postState.currentReply && postState.currentReplyImages.length === 0) {
      dispatch(
        createReply({
          reply: postState.currentReply,
          token,
        })
      );

      dispatch(updateDisplayCreateReply());
    } else if (
      postState.currentReply &&
      postState.currentReplyImages.length > 0
    ) {
      dispatch(
        createReplyWithMedia({
          author: postState.currentReply?.author,
          originalPost: postState.currentReply.originalPost.postId,
          replyContent: postState.currentReply.replyContent,
          images: postState.currentReplyImages,
          scheduled: postState.currentReply.scheduled,
          scheduledDate: postState.currentReply.scheduledDate,
          poll: postState.currentReply.poll,
          token,
        })
      );
      dispatch(updateDisplayCreateReply());
    }
  };

  return (
    <div className="create-reply-bottom">
      <CreatePostButtonCluster />
      <div className="create-reply-submit-group">
        {postState.currentReply &&
          postState.currentReply.replyContent !== "" && (
            <FeedPostCreatorProgress
              percent={
                (postState.currentReply
                  ? postState.currentReply.replyContent.length / 256
                  : 0) * 100
              }
            />
          )}
      </div>

      <button
        className={generateButtonClass()}
        disabled={activateButton()}
        onClick={postReply}
      >
        Reply
      </button>
    </div>
  );
};
