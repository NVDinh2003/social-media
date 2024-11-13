import React, { useState, useEffect } from "react";
import { Post } from "../../../../../utils/GlobalInterface";
import ReplyOutlineSVG from "../../../../../components/SVGs/ReplyOutlineSVG";
import RepostOutlineSVG from "../../../../../components/SVGs/RepostOutlineSVG";
import LikeOutlineSVG from "../../../../../components/SVGs/LikeOutlineSVG";
import ViewsSVG from "../../../../../components/SVGs/ViewsSVG";
import BookmarksSVG from "../../../../../components/SVGs/BookmarksSVG";
import ShareSVG from "../../../../../components/SVGs/ShareSVG";
import { convertCount, getMarginLeft } from "../../../utils/PostUtils";
import { usePostActions } from "../../../../../hooks/usePostActions";

import "./PostActionBar.css";

interface PostActionBarProps {
  post: Post;
  isIndividual: boolean;
}

interface HoverColor {
  reply: string;
  repost: string;
  like: string;
  views: string;
  bookmark: string;
  share: string;
}

export const PostActionBar: React.FC<PostActionBarProps> = ({
  post,
  isIndividual,
}) => {
  const {
    toggleReply,
    createRepost,
    createLike,
    createBookmark,
    hasUserLiked,
    hasUserReposted,
    hasUserBookmarked,
  } = usePostActions();

  const [colors, setColors] = useState<HoverColor>({
    reply: "#aab8c2",
    repost: "#aab8c2",
    like: "#aab8c2",
    views: "#aab8c2",
    bookmark: "#aab8c2",
    share: "#aab8c2",
  });

  useEffect(() => {
    setColors((prevColors) => ({
      ...prevColors,
      repost: hasUserReposted(post) ? "rgb(0, 230, 64)" : "#aab8c2",
      like: hasUserLiked(post) ? "rgb(242, 38, 19)" : "#aab8c2",
      bookmark: hasUserBookmarked(post) ? "rgb(248, 184, 78)" : "#aab8c2",
    }));
  }, [post, hasUserLiked, hasUserReposted, hasUserBookmarked]);

  const updateHoverColor = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    switch (id) {
      case "reply":
        setColors((prevColors) => ({
          ...prevColors,
          reply: "rgb(29, 155, 240)",
        }));
        break;
      case "repost":
        setColors((prevColors) => ({
          ...prevColors,
          repost: "rgb(0, 230, 64)",
        }));
        break;
      case "like":
        setColors((prevColors) => ({
          ...prevColors,
          like: "rgb(242, 38, 19)",
        }));
        break;
      case "views":
        setColors((prevColors) => ({
          ...prevColors,
          views: "rgb(29, 155, 240)",
        }));
        break;
      case "bookmark":
        setColors((prevColors) => ({
          ...prevColors,
          bookmark: "rgb(248, 184, 78)",
        }));
        break;
      case "share":
        setColors((prevColors) => ({
          ...prevColors,
          share: "rgb(29, 155, 240)",
        }));
        break;
      default:
        break;
    }
  };

  const resetColors = () => {
    setColors((prevColors) => ({
      ...prevColors,
      repost: hasUserReposted(post) ? "rgb(0, 230, 64)" : "#aab8c2",
      like: hasUserLiked(post) ? "rgb(242, 38, 19)" : "#aab8c2",
      bookmark: hasUserBookmarked(post) ? "rgb(248, 184, 78)" : "#aab8c2",
    }));
  };

  return (
    <div className="post-action-bar">
      <div className="post-action-bar-group">
        <div
          className="post-action-bar-like-wrapper"
          id="like"
          onMouseOver={updateHoverColor}
          onMouseLeave={resetColors}
          onClick={(e) => {
            e.stopPropagation();
            createLike(post);
          }}
        >
          <LikeOutlineSVG height={20} width={20} color={colors.like} />
        </div>
        {/* Number of likes beside it */}
        {post.likes.length > 0 && (
          <p
            className="post-action-bar-count"
            style={{
              color: colors.like,
              marginLeft: getMarginLeft(post.likes.length),
            }}
          >
            {convertCount(post.likes.length)}
          </p>
        )}
      </div>

      <div className="post-action-bar-group">
        <div
          className="post-action-bar-blue-wrapper"
          id="reply"
          onMouseOver={updateHoverColor}
          onMouseLeave={resetColors}
          onClick={() => toggleReply(post)}
        >
          <ReplyOutlineSVG height={20} width={20} color={"#aab8c2"} />
        </div>
        {/* Number of replies beside it */}
        {post.replies.length > 0 && (
          <p
            className="post-action-bar-count"
            style={{
              color: colors.reply,
              marginLeft: getMarginLeft(post.replies.length),
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
          onClick={(e) => {
            e.stopPropagation();
            createRepost(post);
          }}
        >
          <RepostOutlineSVG height={20} width={20} color={colors.repost} />
        </div>
        {/* Number of repost beside it */}
        {post.reposts.length > 0 && (
          <p
            className="post-action-bar-count"
            style={{
              color: colors.repost,
              marginLeft: getMarginLeft(post.reposts.length),
            }}
          >
            {convertCount(post.reposts.length)}
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
          <div
            className="post-action-bar-count"
            style={{
              color: colors.views,
              paddingLeft: "2px",
              marginLeft: getMarginLeft(post.views.length),
            }}
          >
            {convertCount(post.views.length)}
          </div>
        )}
      </div>

      <div className="post-action-bar-right">
        <div className="post-action-bar-group">
          <div
            className="post-action-bar-blue-wrapper"
            id="bookmark"
            onMouseOver={updateHoverColor}
            onMouseLeave={resetColors}
            onClick={(e) => {
              e.stopPropagation();
              createBookmark(post);
            }}
          >
            <BookmarksSVG height={16} width={16} color={colors.bookmark} />
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
  );
};
