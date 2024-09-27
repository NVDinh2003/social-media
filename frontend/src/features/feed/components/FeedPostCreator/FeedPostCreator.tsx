import React, { useEffect, useRef, useState } from "react";

import "./FeedPostCreator.css";
import { Link } from "react-router-dom";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { Post } from "../../../../utils/GlobalInterface";
import {
  createPost,
  createPostWithMedia,
  initializeCurrentPost,
} from "../../../../redux/Slices/PostSlice";
import { FeedPostAudienceDropDown } from "../FeedPostAudienceDropDown/FeedPostAudienceDropDown";
import { FeedPostReplyRestrictionDropDown } from "../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown";
import { FeedPostCreatorImages } from "../FeedPostCreatorImages/FeedPostCreatorImages";
import { FeedPostCreatorPoll } from "../FeedPostCreatorPoll/FeedPostCreatorPoll";
import { CreatePostTextArea } from "../../../post/components/CreatePostTextArea/CreatePostTextArea";
import { CreatePostButtonCluster } from "../../../post/components/CreatePostButtonCluster/CreatePostButtonCluster";

export const FeedPostCreator: React.FC = () => {
  //
  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.target);

    if (!state.post.currentPost && state.user.loggedIn) {
      let p: Post = {
        postId: 0,
        content: "",
        author: state.user.loggedIn,
        likes: [],
        replies: [],
        images: [],
        reposts: [],
        views: [],
        bookmarks: [],
        scheduled: false,
        audience: "EVERYONE",
        replyRestriction: "EVERYONE",
      };

      dispatch(initializeCurrentPost(p));
    }
  };

  const submitPost = () => {
    if (state.post.currentPost && state.user.loggedIn) {
      if (state.post.currentPostImages.length === 0) {
        //
        let poll = undefined;
        if (
          state.post.currentPost.poll !== undefined &&
          state.post.currentPost.images.length < 1
        ) {
          poll = JSON.parse(JSON.stringify(state.post.currentPost.poll));
          console.log("There is a poll in post!");
          let timeString = state.post.currentPost.poll.endTime;

          let days = timeString.split(":")[0];
          let hours = timeString.split(":")[1];
          let minutes = timeString.split(":")[2];

          let endTime = new Date();
          // console.log("Time: ", endTime.toUTCString());
          endTime.setDate(endTime.getDate() + +days);
          endTime.setHours(endTime.getHours() + +hours);
          endTime.setMinutes(endTime.getMinutes() + +minutes);

          // console.log("Time +: ", endTime.toUTCString());
          // console.log({ days, hours, minutes });

          poll = {
            ...poll,
            endTime: `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`,
          };
        }

        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          images: state.post.currentPost.images,
          poll,
          replies: [],
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          token: state.user.token,
        };
        dispatch(createPost(body));
        // console.log(body);
      } else {
        let body = {
          content: state.post.currentPost.content,
          author: state.post.currentPost.author,
          replies: [],
          audience: state.post.currentPost.audience,
          replyRestriction: state.post.currentPost.replyRestriction,
          scheduled: state.post.currentPost.scheduled,
          scheduledDate: state.post.currentPost.scheduledDate,
          token: state.user.token,
          images: [],
          poll: undefined,
          imageFiles: state.post.currentPostImages,
        };

        dispatch(createPostWithMedia(body));
      }

      // console.log("check-creator: ", state.post.currentPost.content);
    }
  };

  const generateButtonClass = (): string => {
    if (state.post.currentPost) {
      let content: string = state.post.currentPost.content;
      return content !== "" ||
        state.post.currentPostImages.length > 0 ||
        (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
        (state.post.currentPost && state.post.currentPost.poll !== undefined)
        ? "feed-post-creator-post-button post-active"
        : "feed-post-creator-post-button";
    }
    return "feed-post-creator-post-button";
  };

  const activateButton = (): boolean => {
    if (state.post.currentPost) {
      let content: string = state.post.currentPost.content;
      return !(
        content !== "" ||
        state.post.currentPostImages.length > 0 ||
        (state.post.currentPost && state.post.currentPost.images.length >= 1) ||
        (state.post.currentPost && state.post.currentPost.poll !== undefined)
      );
    }
    return false;
  };

  return (
    <div className="feed-post-creator" onClick={activate}>
      <Link to="">
        <img
          src={
            state.user.loggedIn && state.user.loggedIn.profilePicture
              ? state.user.loggedIn.profilePicture.imageURL
              : process.env.REACT_APP_PFP
          }
          alt="User's avatar"
          className="feed-post-creator-pfp"
        />
      </Link>

      <div className="feed-post-creator-right">
        {state.post.currentPost ? <FeedPostAudienceDropDown /> : <></>}

        <CreatePostTextArea
          location="post"
          placeholder="What is happening !?"
        />

        {(state.post.currentPostImages.length > 0 ||
          (state.post.currentPost &&
            state.post.currentPost.images.length > 0)) && (
          <FeedPostCreatorImages />
        )}

        {state.post.currentPost && state.post.currentPost?.poll && (
          <FeedPostCreatorPoll />
        )}

        {state.post.currentPost ? <FeedPostReplyRestrictionDropDown /> : <></>}

        <div
          className={
            state.post.currentPost
              ? "feed-post-creator-bottom-icon icons-border"
              : "feed-post-creator-bottom-icon"
          }
        >
          <div className="feed-post-creator-icons-left">
            <CreatePostButtonCluster type="post" />
          </div>
          <div className="feed-post-creator-submit-cluster">
            {state.post.currentPost && state.post.currentPost.content !== "" ? (
              <div className="feed-post-creator-submit-cluster-left">
                <FeedPostCreatorProgress
                  percent={
                    (state.post.currentPost
                      ? state.post.currentPost.content.length / 256
                      : 0) * 100
                  }
                />
                <span className="feed-post-creator-submit-cluster-divider"></span>
                <div className="feed-post-creator-submit-cluster-add">+</div>
              </div>
            ) : (
              <></>
            )}

            <button
              className={generateButtonClass()}
              disabled={activateButton()}
              onClick={submitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* <EmojiDropDown /> */}
    </div>
  );
};
