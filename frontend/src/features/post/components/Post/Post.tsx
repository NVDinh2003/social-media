import React, { useEffect, useRef } from "react";
import { FeedPost, Post as IPost } from "../../../../utils/GlobalInterface";

import CircleIcon from "@mui/icons-material/Circle";
import VerifiedIcon from "@mui/icons-material/Verified";
import RepostOutlineSVG from "../../../../components/SVGs/RepostOutlineSVG";
import "./Post.css";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../../redux/Slices/FeedSlice";
import {
  convertPostedDateToString,
  renderLocationInfo,
} from "../../utils/PostUtils";
import { batchPostView } from "../../../../redux/Slices/PostSlice";
import { useNavigate } from "react-router-dom";
import { PostMore } from "../PostMore/PostMore";
import { PostUsername } from "./PostUsername/PostUsername";
import { PostContent } from "./PostContent/PostContent";
import { PostActionBar } from "./PostActionBar/PostActionBar";
import { getDisplayLocationInfo } from "../../../feed/utils/LocationUtils";
import LocationSVG from "../../../../components/SVGs/LocationSVG";

interface PostProps {
  feedPost: FeedPost;
  notification: boolean;
}

export const Post: React.FC<PostProps> = ({ feedPost, notification }) => {
  //
  const postRef = useRef<HTMLDivElement>(null);
  //
  const defaultPfp = process.env.REACT_APP_PFP;
  const { post } = feedPost;
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const batchView = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        let updatedPost = JSON.parse(JSON.stringify(post));

        if (
          loggedIn &&
          !post.views.some(
            (user) => user.userId === loggedIn.userId && !notification
          )
        ) {
          let views = [...post.views, loggedIn];
          updatedPost = {
            ...updatedPost,
            views,
          };
          dispatch(updatePost(updatedPost));
          dispatch(batchPostView(post.postId));
        }
      }
    });
  };

  const openPost = () => {
    navigate(`/post/${post.postId}`);
  };

  const navigateToUserProfile = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    navigate(`/${post.author.username}`);
  };

  useEffect(() => {
    if (postRef && postRef.current) {
      const observer = new IntersectionObserver(batchView, {
        root: null,
        threshold: 1,
      });
      const target = postRef.current;

      observer.observe(target);
    }
  }, []);

  return (
    <div
      className={notification ? "" : "post"}
      ref={postRef}
      onClick={openPost}
    >
      {feedPost.repost && (
        <p
          className="post-repost-info"
          onMouseOver={() => {
            /* popup a modal with the user information on mouse over */
          }}
        >
          <RepostOutlineSVG height={18} width={18} color={"#657786"} />
          <PostUsername author={feedPost.repostUser} repost={true} />
        </p>
      )}

      <div
        className={
          notification ? "post-body-wrapper-notification" : "post-body-wrapper"
        }
      >
        <div
          className={notification ? "post-left-notification" : "post-left"}
          onClick={navigateToUserProfile}
        >
          <img
            className="post-pfp"
            src={
              post.author.profilePicture
                ? post.author.profilePicture.imageURL
                : defaultPfp
            }
            alt={`${post.author.nickname}'s pfp`}
          />
        </div>

        <div className="post-right">
          <div className="post-right-top">
            <div className="post-user-info">
              {/* <p className="post-nickname">{post.author.nickname}</p> */}
              <PostUsername author={post.author} repost={false} />
              {/* Add in verified once i add verified to the user on the backend */}
              {post.author.verifiedAccount && (
                <VerifiedIcon
                  sx={{
                    color: "#1da1f2",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}

              {/* Add in ord image once i add orgs to the user on the backend */}
              {post.author.organization && (
                <img
                  className="post-organization"
                  src={post.author.organization.imageURL}
                  alt={`${post.author.username}'s organization`}
                />
              )}

              <p className="post-username">@{post.author.username}</p>
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
              {post.postedDate && (
                <p className="post-posted-at">
                  {convertPostedDateToString(post.postedDate)}
                </p>
              )}
            </div>

            <PostMore postId={post.postId} postAuthor={post.author} />
          </div>

          {notification && feedPost.replyTo && (
            <div className="post-replying-to-container">
              <div className="post-replying-to">
                Replying to{" "}
                <div className="post-replying-to-user">
                  @{feedPost.replyTo?.author.username}
                </div>
              </div>
            </div>
          )}

          <div
            className={
              notification && feedPost.replyTo
                ? "post-content-negative-wrapper"
                : ""
            }
          >
            <PostContent post={feedPost.post} location={"post"} />
          </div>

          {renderLocationInfo(feedPost.post)}

          <PostActionBar post={feedPost.post} isIndividual={false} />
        </div>
      </div>
    </div>
  );
};
