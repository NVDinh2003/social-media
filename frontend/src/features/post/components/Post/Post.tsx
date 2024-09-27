import React, { useEffect, useMemo, useRef, useState } from "react";
import { FeedPost, Post as IPost } from "../../../../utils/GlobalInterface";

import CircleIcon from "@mui/icons-material/Circle";
import VerifiedIcon from "@mui/icons-material/Verified";

import ReplyOutlineSVG from "../../../../components/SVGs/ReplyOutlineSVG";
import RepostOutlineSVG from "../../../../components/SVGs/RepostOutlineSVG";
import LikeOutlineSVG from "../../../../components/SVGs/LikeOutlineSVG";
import ViewsSVG from "../../../../components/SVGs/ViewsSVG";
import ShareSVG from "../../../../components/SVGs/ShareSVG";
import BookmarksSVG from "../../../../components/SVGs/BookmarksSVG";

import "./Post.css";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayCreateReply } from "../../../../redux/Slices/ModalSlice";
import { setCurrentPost, updatePost } from "../../../../redux/Slices/FeedSlice";
import { convertPostedDateToString } from "../../utils/PostUtils";
import { batchPostView } from "../../../../redux/Slices/PostSlice";
import { createImagePostContainer } from "../../../feed/utils/FeedUtils";
import { useNavigate } from "react-router-dom";
import { PostMore } from "../PostMore/PostMore";
import { PostUsername } from "./PostUsername/PostUsername";
import { PostContent } from "./PostContent/PostContent";
import { PostActionBar } from "./PostActionBar/PostActionBar";

interface PostProps {
  feedPost: FeedPost;
}

export const Post: React.FC<PostProps> = ({ feedPost }) => {
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
          !post.views.some((user) => user.userId === loggedIn.userId)
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
    <div className="post" ref={postRef} onClick={openPost}>
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

      <div className="post-body-wrapper">
        <div className="post-left">
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

          <PostContent post={feedPost.post} />

          <PostActionBar post={feedPost.post} isIndividual={false} />
        </div>
      </div>
    </div>
  );
};
