import React from "react";
import "./FeedPostCreator.css";
import { Link } from "react-router-dom";
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
import { renderLocationInfo } from "../../../post/utils/PostUtils";

export const FeedPostCreator: React.FC = () => {
  // Chỉ lấy các phần cần thiết từ state
  const currentPost = useSelector((state: RootState) => state.post.currentPost);
  const currentPostImages = useSelector(
    (state: RootState) => state.post.currentPostImages
  );
  const loggedInUser = useSelector((state: RootState) => state.user.loggedIn);
  const token = useSelector((state: RootState) => state.user.token);

  const dispatch: AppDispatch = useDispatch();

  const activate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentPost && loggedInUser) {
      let p: Post = {
        postId: 0,
        content: "",
        author: loggedInUser,
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

  // const submitPost = () => {
  //   if (currentPost && loggedInUser) {
  //     let body = {
  //       content: currentPost.content,
  //       author: currentPost.author,
  //       replies: [],
  //       audience: currentPost.audience,
  //       replyRestriction: currentPost.replyRestriction,
  //       scheduled: currentPost.scheduled,
  //       scheduledDate: currentPost.scheduledDate,
  //       provinceCode: currentPost.provinceCode,
  //       districtCode: currentPost.districtCode,
  //       wardCode: currentPost.wardCode,
  //       address: currentPost.address,
  //       token: token,
  //       images: currentPostImages.length > 0 ? [] : currentPost.images,
  //       poll: currentPost.poll,
  //       imageFiles: currentPostImages,
  //     };

  //     if (currentPostImages.length === 0) {
  //       dispatch(createPost(body));
  //     } else {
  //       dispatch(createPostWithMedia(body));
  //     }
  //   }
  // };

  const submitPost = () => {
    if (currentPost && loggedInUser) {
      let body = {
        content: currentPost.content,
        author: currentPost.author,
        replies: [],
        audience: currentPost.audience,
        replyRestriction: currentPost.replyRestriction,
        scheduled: currentPost.scheduled,
        scheduledDate: currentPost.scheduledDate,
        provinceCode: currentPost.provinceCode,
        districtCode: currentPost.districtCode,
        wardCode: currentPost.wardCode,
        address: currentPost.address,
        token: token,
        images: currentPostImages.length > 0 ? [] : currentPost.images,
        poll: currentPost.poll,
        imageFiles: currentPostImages,
      };

      if (currentPostImages.length === 0) {
        if (currentPost.poll !== undefined && currentPost.images.length < 1) {
          let poll = JSON.parse(JSON.stringify(currentPost.poll));
          console.log("there is a poll");
          let timeString = currentPost.poll.endTime;
          console.log(timeString);
          let days = timeString.split(":")[0];
          let hours = timeString.split(":")[1];
          let minutes = timeString.split(":")[2];
          let endTime = new Date();
          endTime.setDate(endTime.getDate() + +days);
          endTime.setHours(endTime.getHours() + +hours);
          endTime.setMinutes(endTime.getMinutes() + +minutes);
          poll = {
            ...poll,
            endTime: `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`,
          };
          body.poll = poll;
        }
        dispatch(createPost(body));
      } else {
        dispatch(createPostWithMedia(body));
      }
    }
  };
  const generateButtonClass = (): string => {
    if (currentPost) {
      let content: string = currentPost.content;
      return content !== "" ||
        currentPostImages.length > 0 ||
        currentPost.images.length >= 1 ||
        currentPost.poll !== undefined
        ? "feed-post-creator-post-button post-active"
        : "feed-post-creator-post-button";
    }
    return "feed-post-creator-post-button";
  };

  const activateButton = (): boolean => {
    if (currentPost) {
      let content: string = currentPost.content;
      return !(
        content !== "" ||
        currentPostImages.length > 0 ||
        currentPost.images.length >= 1 ||
        currentPost.poll !== undefined
      );
    }
    return false;
  };

  return (
    <div className="feed-post-creator" onClick={activate}>
      <Link to={`/${loggedInUser?.username}`}>
        <img
          src={
            loggedInUser && loggedInUser.profilePicture
              ? loggedInUser.profilePicture.imageURL
              : process.env.REACT_APP_PFP
          }
          alt="User's avatar"
          className="feed-post-creator-pfp"
        />
      </Link>

      <div className="feed-post-creator-right">
        {currentPost ? <FeedPostAudienceDropDown /> : <></>}

        <CreatePostTextArea
          location="post"
          placeholder="What is happening !?"
        />

        {(currentPostImages.length > 0 ||
          (currentPost && currentPost.images.length > 0)) && (
          <FeedPostCreatorImages />
        )}

        {currentPost && renderLocationInfo(currentPost)}

        {currentPost && currentPost.poll && <FeedPostCreatorPoll />}

        {currentPost ? <FeedPostReplyRestrictionDropDown /> : <></>}

        <div
          className={
            currentPost
              ? "feed-post-creator-bottom-icon icons-border"
              : "feed-post-creator-bottom-icon"
          }
        >
          <div className="feed-post-creator-icons-left">
            <CreatePostButtonCluster type="post" />
          </div>
          <div className="feed-post-creator-submit-cluster">
            {currentPost && currentPost.content !== "" ? (
              <div className="feed-post-creator-submit-cluster-left">
                <FeedPostCreatorProgress
                  percent={(currentPost.content.length / 256) * 100}
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
    </div>
  );
};
