import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FeedPost,
  Post as IPost,
  User,
} from "../../../../utils/GlobalInterface";

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
import {
  convertPostedDateToString,
  formatTextContent,
} from "../../utils/PostUtils";
import { Reply } from "../Reply/Reply";
import {
  bookmarkPost,
  likePost,
  repostPost,
  viewPost,
} from "../../../../redux/Slices/PostSlice";
import { createImagePostContainer } from "../../../feed/utils/FeedUtils";
import { useNavigate } from "react-router-dom";
import { PostMore } from "../PostMore/PostMore";
import { PostUsername } from "./PostUsername/PostUsername";

interface PostProps {
  feedPost: FeedPost;
}

interface HoverColor {
  reply: string;
  repost: string;
  like: string;
  views: string;
  bookmark: string;
  share: string;
}

export const Post: React.FC<PostProps> = ({ feedPost }) => {
  //
  const postRef = useRef<HTMLDivElement>(null);
  //
  const defaultPfp = process.env.REACT_APP_PFP;
  const { post, replyTo, repost, repostUser } = feedPost;
  const token = useSelector((state: RootState) => state.user.token);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const postImageContainer = useMemo(
    () => createImagePostContainer(feedPost.post.images),
    [feedPost.post.postId]
  );

  const [colors, setColors] = useState<HoverColor>({
    reply: "#aab8c2",
    repost: "#aab8c2",
    like: "#aab8c2",
    views: "#aab8c2",
    bookmark: "#aab8c2",
    share: "#aab8c2",
  });

  const updateHoverColor = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    switch (id) {
      case "reply":
        setColors({ ...colors, reply: "rgb(29, 155, 240)" });
        break;
      case "repost":
        setColors({ ...colors, repost: "rgb(0, 230, 64)" });
        break;
      case "like":
        setColors({ ...colors, like: "rgb(242, 38, 19)" });
        break;
      case "views":
        setColors({ ...colors, views: "rgb(29, 155, 240)" });
        break;
      case "bookmark":
        setColors({ ...colors, bookmark: "rgb(29, 155, 240)" });
        break;
      case "share":
        setColors({ ...colors, share: "rgb(29, 155, 240)" });
        break;
      default:
        break;
    }
  };

  const resetColors = () => {
    setColors({
      reply: "#aab8c2",
      repost: "#aab8c2",
      like: "#aab8c2",
      views: "#aab8c2",
      bookmark: "#aab8c2",
      share: "#aab8c2",
    });
  };

  // console.log("postedDate: ", post);

  const toggleReply = () => {
    dispatch(setCurrentPost(post));
    dispatch(updateDisplayCreateReply());
  };

  const convertCount = (count: number) => {
    if (count >= 1000 && count < 10_000) return `${(count / 1000).toFixed(2)}K`;
    else if (count >= 10_000 && count < 100_000)
      return `${(count / 1000).toFixed(1)}K`;
    else if (count >= 100_000 && count < 1_000_000)
      return `${Math.floor(count / 1000)}K`;
    return `${count}`;
  };

  const createRepost = () => {
    let updatedPost = JSON.parse(JSON.stringify(post));

    if (
      loggedIn &&
      !post.reposts.some((user) => user.userId === loggedIn.userId)
    ) {
      // console.log("adding repost user");
      let reposts = [...post.reposts, loggedIn];
      updatedPost = {
        ...updatedPost,
        reposts,
      };
      dispatch(updatePost(updatedPost));
    }
    if (
      loggedIn &&
      post.reposts.some((user) => user.userId === loggedIn.userId)
    ) {
      // console.log("removed");
      let reposts = updatedPost.reposts.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        reposts,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      repostPost({
        postId: post.postId,
        token,
      })
    );
  };

  const createLike = () => {
    let updatedPost = JSON.parse(JSON.stringify(post));
    if (
      loggedIn &&
      !post.likes.some((user) => user.userId === loggedIn.userId)
    ) {
      let likes = [...post.likes, loggedIn];
      updatedPost = {
        ...updatedPost,
        likes,
      };
      dispatch(updatePost(updatedPost));
    }
    if (
      loggedIn &&
      post.likes.some((user) => user.userId === loggedIn.userId)
    ) {
      let likes = updatedPost.likes.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        likes,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      likePost({
        postId: post.postId,
        token,
      })
    );
  };

  const createBookmark = () => {
    let updatedPost = JSON.parse(JSON.stringify(post));
    if (
      loggedIn &&
      !post.bookmarks.some((user) => user.userId === loggedIn.userId)
    ) {
      let bookmarks = [...post.bookmarks, loggedIn];
      updatedPost = {
        ...updatedPost,
        bookmarks,
      };
      dispatch(updatePost(updatedPost));
    }
    if (
      loggedIn &&
      post.bookmarks.some((user) => user.userId === loggedIn.userId)
    ) {
      let bookmarks = updatedPost.bookmarks.filter(
        (user: User) => user.userId !== loggedIn.userId
      );
      updatedPost = {
        ...updatedPost,
        bookmarks,
      };

      dispatch(updatePost(updatedPost));
    }

    dispatch(
      bookmarkPost({
        postId: post.postId,
        token,
      })
    );
  };

  const createView = (entries: any) => {
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
          dispatch(
            viewPost({
              postId: post.postId,
              token,
            })
          );
        }
      }
    });
  };

  useEffect(() => {
    if (postRef && postRef.current) {
      const observer = new IntersectionObserver(createView, {
        root: null,
        threshold: 1,
      });
      const target = postRef.current;

      observer.observe(target);
    }
  }, []);

  return (
    <div className="post" ref={postRef}>
      {feedPost.repost && (
        <p
          className="post-repost-info"
          onMouseOver={() => {
            /* popup a modal with the user information on mouse over */
          }}
        >
          <RepostOutlineSVG height={18} width={18} color={"#657786"} />
          <span
            className="post-repost-user"
            onClick={() => navigate(`/${feedPost.repostUser.username}`)}
          >
            {feedPost.repostUser.nickname ?? feedPost.repostUser.username}{" "}
            reposted
          </span>
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
              <PostUsername author={post.author} />
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

          {/* <div className="post-content">
          {" "}
          {post.content.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div> */}

          <div
            className="post-content"
            dangerouslySetInnerHTML={formatTextContent(post.content)}
          />

          {feedPost.post.images.length > 0 && postImageContainer}

          {replyTo && <Reply reply={replyTo}></Reply>}

          <div className="post-action-bar">
            <div className="post-action-bar-group">
              <div
                className="post-action-bar-blue-wrapper"
                id="reply"
                onMouseOver={updateHoverColor}
                onMouseLeave={resetColors}
                onClick={toggleReply}
              >
                <ReplyOutlineSVG height={20} width={20} color={"#aab8c2"} />
              </div>
              {/* Number of replies beside it */}
              {post.replies.length > 0 && (
                <p
                  className="post-action-bar-count"
                  style={{
                    color: colors.reply,
                  }}
                >
                  {convertCount(post.replies.length)}
                </p>
              )}
            </div>

            <div className="post-action-bar-group">
              <div
                className="post-action-bar-repost-wrapper"
                id="repost"
                onMouseOver={updateHoverColor}
                onMouseLeave={resetColors}
                onClick={createRepost}
              >
                <RepostOutlineSVG
                  height={20}
                  width={20}
                  color={colors.repost}
                />
              </div>
              {/* Number of repost beside it */}
              {post.reposts.length > 0 && (
                <p
                  className="post-action-bar-count"
                  style={{
                    color: colors.repost,
                  }}
                >
                  {convertCount(post.reposts.length)}
                </p>
              )}
            </div>

            <div className="post-action-bar-group">
              <div
                className="post-action-bar-like-wrapper"
                id="like"
                onMouseOver={updateHoverColor}
                onMouseLeave={resetColors}
                onClick={createLike}
              >
                <LikeOutlineSVG height={20} width={20} color={colors.like} />
              </div>
              {/* Number of likes beside it */}
              {post.likes.length > 0 && (
                <p
                  className="post-action-bar-count"
                  style={{
                    color: colors.like,
                  }}
                >
                  {convertCount(post.likes.length)}
                </p>
              )}
            </div>

            <div className="post-action-bar-group">
              <div
                className="post-action-bar-blue-wrapper"
                id="views"
                onMouseOver={updateHoverColor}
                onMouseLeave={resetColors}
              >
                <ViewsSVG height={20} width={20} color={colors.views} />
              </div>
              {/* Number of views beside it */}
              {post.views.length > 0 && (
                <p
                  className="post-action-bar-count"
                  style={{
                    color: colors.views,
                  }}
                >
                  {convertCount(post.views.length)}
                </p>
              )}
            </div>

            <div className="post-action-bar-right">
              <div className="post-action-bar-group">
                <div
                  className="post-action-bar-blue-wrapper"
                  id="bookmark"
                  onMouseOver={updateHoverColor}
                  onMouseLeave={resetColors}
                  onClick={createBookmark}
                >
                  <BookmarksSVG
                    height={20}
                    width={20}
                    color={colors.bookmark}
                  />
                </div>
                {/* Number of bookmarks beside it */}
                {post.bookmarks.length > 0 && (
                  <p
                    className="post-action-bar-count"
                    style={{
                      color: colors.bookmark,
                    }}
                  >
                    {convertCount(post.bookmarks.length)}
                  </p>
                )}
              </div>
              <div
                className="post-action-bar-blue-wrapper"
                id="share"
                onMouseOver={updateHoverColor}
                onMouseLeave={resetColors}
              >
                <ShareSVG height={20} width={20} color={colors.share} />
              </div>
              {/* Number of share beside it */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
