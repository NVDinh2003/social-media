import React, { useState } from "react";
import { Post } from "../../../../../utils/GlobalInterface";
import ReplyOutlineSVG from "../../../../../components/SVGs/ReplyOutlineSVG";
import RepostOutlineSVG from "../../../../../components/SVGs/RepostOutlineSVG";
import LikeOutlineSVG from "../../../../../components/SVGs/LikeOutlineSVG";
import ViewsSVG from "../../../../../components/SVGs/ViewsSVG";
import BookmarksSVG from "../../../../../components/SVGs/BookmarksSVG";
import ShareSVG from "../../../../../components/SVGs/ShareSVG";
import { convertCount } from "../../../utils/PostUtils";
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
  const { toggleReply, createRepost, createLike, createBookmark } =
    usePostActions();

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

  return (
    <div className="post-action-bar">
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
          onClick={() => createRepost(post)}
        >
          <RepostOutlineSVG height={20} width={20} color={colors.repost} />
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
          onClick={() => createLike(post)}
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
            onClick={() => createBookmark(post)}
          >
            <BookmarksSVG height={20} width={20} color={colors.bookmark} />
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
