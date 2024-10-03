import React, { useEffect } from "react";

import "./IndividualPost.css";
import { Post } from "../../../../utils/GlobalInterface";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { usePostActions } from "../../../../hooks/usePostActions";
import { setCurrentPost } from "../../../../redux/Slices/FeedSlice";
import { PostUsername } from "../Post/PostUsername/PostUsername";
import Verified from "@mui/icons-material/Verified";
import { PostMore } from "../PostMore/PostMore";
import { PostContent } from "../Post/PostContent/PostContent";
import Circle from "@mui/icons-material/Circle";
import { PostActionBar } from "../Post/PostActionBar/PostActionBar";
import { stringifyFullDate, stringifyTime } from "../../../../utils/DateUtils";
import { convertCount } from "../../utils/PostUtils";

interface IndividualPostProps {
  post: Post;
}

export const IndividualPost: React.FC<IndividualPostProps> = ({ post }) => {
  const defaultPfp = process.env.REACT_APP_PFP;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { createSingleView } = usePostActions();

  const navigateToProfile = () => {
    navigate(`/profile/${post.author.username}`);
  };

  useEffect(() => {
    dispatch(setCurrentPost(post));
    createSingleView(post);
  }, [post]);

  return (
    <div className="individual-post">
      <div className="individual-post-top">
        <div className="individual-post-top-right" onClick={navigateToProfile}>
          <img
            src={
              post.author.profilePicture
                ? post.author.profilePicture.imageURL
                : defaultPfp
            }
            alt="user pfp"
            className="individual-post-pfp"
          />

          <div className="individual-post-user">
            <div className="individual-post-user-nickname-section">
              <PostUsername author={post.author} repost={false} />
              {post.author.verifiedAccount && (
                <Verified
                  sx={{
                    color: "#1da1f2",
                    width: "20px",
                    height: "20px",
                  }}
                />
              )}
              {post.author.organization && (
                <img
                  src={post.author.organization.imageURL}
                  alt="organization"
                  className="individual-post-organization"
                />
              )}
            </div>

            <p className="individual-post-username">@{post.author.username}</p>
          </div>
        </div>

        <div className="individual-post-top-left">
          <PostMore postId={post.postId} postAuthor={post.author} />
        </div>
      </div>

      <div className="individual-post-content-wrapper">
        <PostContent post={post} location={"post"} />
      </div>

      <div className="individual-post-data-section">
        {post.postedDate && (
          <p className="individual-post-data-text">
            {stringifyTime(new Date(post.postedDate))}
          </p>
        )}
        <Circle
          sx={{
            width: "4px",
            height: "4px",
            color: "#657786",
          }}
        />

        {post.postedDate && (
          <p className="individual-post-data-text">
            {stringifyFullDate(new Date(post.postedDate))}
          </p>
        )}
        <Circle
          sx={{
            width: "4px",
            height: "4px",
            color: "#657786",
          }}
        />
        <p className="individual-post-data-text-bold">
          {convertCount(post.views.length)}
        </p>
        <p className="individual-post-data-text">Views</p>
      </div>

      <div className="individual-post-divider"></div>
      <div className="individual-post-action-bar-wrapper">
        <PostActionBar post={post} isIndividual={true} />
      </div>
      <div className="individual-post-divider"></div>
    </div>
  );
};
