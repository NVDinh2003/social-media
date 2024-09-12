import React, { useState } from "react";
import { Post as IPost } from "../../../../utils/GlobalInterface";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";

import ReplyOutlineSVG from "../../../../components/SVGs/ReplyOutlineSVG";
import RepostOutlineSVG from "../../../../components/SVGs/RepostOutlineSVG";
import LikeOutlineSVG from "../../../../components/SVGs/LikeOutlineSVG";
import ViewsSVG from "../../../../components/SVGs/ViewsSVG";
import ShareSVG from "../../../../components/SVGs/ShareSVG";
import BookmarksSVG from "../../../../components/SVGs/BookmarksSVG";

import "./Post.css";

interface PostProps {
  post: IPost;
}

interface HoverColor {
  reply: string;
  repost: string;
  like: string;
  views: string;
  bookmark: string;
  share: string;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  //
  const defaultPfp = process.env.REACT_APP_PFP;
  const { author, content, postedDate } = post;

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

  const convertPostedDateToString = (): string => {
    const postedDateString = `${postedDate}`;
    // console.log("postedDate: ", postedDate);
    // console.log("post date string: ", postedDateString);

    let d = new Date(postedDateString);
    return d.toDateString();
  };

  return (
    <div className="post">
      <div className="post-left">
        <img
          className="post-pfp"
          src={author.profilePicture ? author.profilePicture : defaultPfp}
          alt={`${author.nickname}'s pfp`}
        />
      </div>

      <div className="post-right">
        <div className="post-right-top">
          <div className="post-user-info">
            <p className="post-nickname">{author.nickname}</p>
            {/* Add in verified once i add verified to the user on the backend */}
            {/* Add in ord image once i add orgs to the user on the backend */}
            <p className="post-username">@{author.username}</p>
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
            {postedDate && (
              <p className="post-posted-at">{convertPostedDateToString()}</p>
            )}
          </div>

          <div className="post-more">
            <MoreHorizIcon
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
          </div>
        </div>

        <div className="post-content">{content}</div>

        <div className="post-action-bar">
          <div className="post-action-bar-group">
            <div
              className="post-action-bar-blue-wrapper"
              id="reply"
              onMouseOver={updateHoverColor}
              onMouseLeave={resetColors}
            >
              <ReplyOutlineSVG height={20} width={20} color={"#aab8c2"} />
            </div>
            {/* Number of replies beside it */}
          </div>

          <div className="post-action-bar-group">
            <div
              className="post-action-bar-repost-wrapper"
              id="repost"
              onMouseOver={updateHoverColor}
              onMouseLeave={resetColors}
            >
              <RepostOutlineSVG height={20} width={20} color={colors.repost} />
            </div>
            {/* Number of repost beside it */}
          </div>

          <div className="post-action-bar-group">
            <div
              className="post-action-bar-like-wrapper"
              id="like"
              onMouseOver={updateHoverColor}
              onMouseLeave={resetColors}
            >
              <LikeOutlineSVG height={20} width={20} color={colors.like} />
            </div>
            {/* Number of likes beside it */}
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
          </div>

          <div className="post-action-bar-right">
            <div
              className="post-action-bar-blue-wrapper"
              id="bookmark"
              onMouseOver={updateHoverColor}
              onMouseLeave={resetColors}
            >
              <BookmarksSVG height={20} width={20} color={colors.bookmark} />
            </div>
            {/* Number of bookmarks beside it */}

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
  );
};
