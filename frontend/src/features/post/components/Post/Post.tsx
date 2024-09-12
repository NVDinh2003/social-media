import React from "react";
import { Post as IPost } from "../../../../utils/GlobalInterface";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./Post.css";
import ReplyOutlineSVG from "../../../../components/SVGs/ReplyOutlineSVG";
import RepostOutlineSVG from "../../../../components/SVGs/RepostOutlineSVG";
import LikeOutlineSVG from "../../../../components/SVGs/LikeOutlineSVG";
import ViewsSVG from "../../../../components/SVGs/ViewsSVG";
import ShareSVG from "../../../../components/SVGs/ShareSVG";
import BookmarksSVG from "../../../../components/SVGs/BookmarksSVG";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  //
  const defaultPfp = process.env.REACT_APP_PFP;
  const { author, content, postedDate } = post;

  console.log("postedDate: ", post);

  const convertPostedDateToString = (): string => {
    const postedDateString = `${postedDate}`;
    console.log("postedDate: ", postedDate);
    console.log("post date string: ", postedDateString);

    let d = new Date(postedDateString);
    return d.toDateString();
  };

  return (
    <div className="post">
      <div className="post-left">
        <img
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
            <p className="post-username">{author.username}</p>
            {postedDate && (
              <p className="post-posted-at">{convertPostedDateToString()}</p>
            )}
          </div>

          <div className="post-more">
            <MoreHorizIcon />
          </div>
        </div>

        <p className="post-content">{content}</p>

        <div className="post-action-bar">
          <div className="post-action-bar-reply-wrapper">
            <ReplyOutlineSVG height={20} width={20} color={"#aab8c2"} />
          </div>
          {/* Number of replies beside it */}

          <div className="post-action-bar-repost-wrapper">
            <RepostOutlineSVG height={20} width={20} color={"#aab8c2"} />
          </div>
          {/* Number of repost beside it */}

          <div className="post-action-bar-like-wrapper">
            <LikeOutlineSVG height={20} width={20} color={"#aab8c2"} />
          </div>
          {/* Number of likes beside it */}

          <div className="post-action-bar-view-wrapper">
            <ViewsSVG height={20} width={20} color={"#aab8c2"} />
          </div>
          {/* Number of views beside it */}

          <div className="post-action-bar-right">
            <div className="post-action-bar-bookmark-wrapper">
              <BookmarksSVG height={20} width={20} color={"#aab8c2"} />
            </div>
            {/* Number of bookmarks beside it */}

            <div className="post-action-bar-share-wrapper">
              <ShareSVG height={20} width={20} color={"#aab8c2"} />
            </div>
            {/* Number of share beside it */}
          </div>
        </div>
      </div>
    </div>
  );
};
