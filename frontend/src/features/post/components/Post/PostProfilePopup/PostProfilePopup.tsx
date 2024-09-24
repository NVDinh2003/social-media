import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import "./PostProfilePopup.css";
import { User } from "../../../../../utils/GlobalInterface";

interface PostProfilePopupProps {
  author: User;
  following: User[];
  followers: User[];
}

export const PostProfilePopup: React.FC<PostProfilePopupProps> = ({
  author,
  followers,
  following,
}) => {
  const defaultPfp = process.env.REACT_APP_PFP;

  return (
    <div className="post-profile-popup">
      <div className="post-profile-top">
        <img
          src={
            author.profilePicture ? author.profilePicture.imageURL : defaultPfp
          }
          alt="user profile picture"
          className="post-profile-pfp"
        />

        <button className="post-profile-following-btn">
          {/* determine whether or not the user is following  */} Following
        </button>
      </div>

      <div className="post-profile-nickname-bar">
        <p className="post-profile-nickname">{author.nickname}</p>
        {author.verifiedAccount && (
          <VerifiedIcon
            sx={{
              color: "#1da1f2",
              width: "20px",
              height: "20px",
            }}
          />
        )}
        {author.organization && (
          <img
            className="post-profile-organization"
            src={author.organization.imageURL}
            alt={`${author.username}'s organization`}
          />
        )}
      </div>

      <p className="post-profile-username">@{author.username}</p>
      <p className="post-profile-bio">{author.bio}</p>
      <div className="post-profile-following-followers">
        <p className="post-profile-following-followers-text">
          <span className="post-profile-count">{following.length}</span>{" "}
          Following
        </p>

        <p className="post-profile-following-followers-text">
          <span className="post-profile-count">{followers.length}</span>{" "}
          Followers
        </p>
      </div>

      <div className="post-profile-followed-by-container">
        <div className="post-profile-followed-by-pfps">
          {/* figure out how to stack up to three pfps */}
        </div>
        <p className="post-profile-followed-by-users">
          Followed by ...
          {/* map the first three user names, and then the count after the first three */}
        </p>
      </div>
    </div>
  );
};
