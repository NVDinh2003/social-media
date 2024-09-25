import React, { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

import "./PostProfilePopup.css";
import { User } from "../../../../../utils/GlobalInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import { followUser } from "../../../../../redux/Slices/UserSlice";
import { checkFollowing } from "../../../../../services/UserService";
import { PostProfilePopupIcons } from "./PostProfilePopupIcons/PostProfilePopupIcons";

interface PostProfilePopupProps {
  author: User;
  followingList: User[];
  followersList: User[];
  closeModal: () => void;
}

export const PostProfilePopup: React.FC<PostProfilePopupProps> = ({
  author,
  followersList,
  followingList,
  closeModal,
}) => {
  const defaultPfp = process.env.REACT_APP_PFP;
  const currentUsersFollowingList = useSelector(
    (state: RootState) => state.user.following
  );
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const token = useSelector((state: RootState) => state.user.token);

  const dispatch: AppDispatch = useDispatch();

  const [following, setFollowing] = useState<boolean>(() => {
    if (loggedIn) {
      return checkFollowing(followersList, loggedIn);
    }
    return false;
  });

  const [followedBy, setFollowedBy] = useState<User[]>(() => {
    return followersList.filter((user) => {
      return currentUsersFollowingList.some(
        (u) => u.userId === user.userId && u.userId !== loggedIn?.userId
      );
    });
  });

  const [followingBtnContent, setFollowingBtnContent] =
    useState<string>("Following");

  const followingBtnActive = () => {
    setFollowingBtnContent("Unfollow");
  };

  const followingBtnInactive = () => {
    setFollowingBtnContent("Following");
  };

  const mapFollowedByContent = (): string => {
    let content = "Followed by ";

    followedBy.slice(0, 3).forEach((user) => {
      content += `${user.nickname}, `;
    });

    if (followedBy.length > 3) {
      content += `and ${followedBy.length - 3} other you follow.`;
    } else {
      content = content.slice(0, -2) + "."; // - ', ' và + '.'
    }

    return content;
  };

  const follow = () => {
    dispatch(
      followUser({
        followee: author.username,
        token,
      })
    );
  };

  return (
    <div className="post-profile-popup" onMouseLeave={closeModal}>
      <div className="post-profile-top">
        <img
          src={
            author.profilePicture ? author.profilePicture.imageURL : defaultPfp
          }
          alt="user profile picture"
          className="post-profile-pfp"
        />

        {following ? (
          <button
            className="post-profile-following-btn"
            onMouseOver={followingBtnActive}
            onMouseLeave={followingBtnInactive}
          >
            {followingBtnContent}
          </button>
        ) : (
          <button className="post-profile-follow-btn" onClick={follow}>
            Follow
          </button>
        )}
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
          <span className="post-profile-count">{followingList.length}</span>{" "}
          Following
        </p>

        <p className="post-profile-following-followers-text">
          <span className="post-profile-count">{followersList.length}</span>{" "}
          Followers
        </p>
      </div>

      {followedBy.length > 0 && (
        <div className="post-profile-followed-by-container">
          <div className="post-profile-followed-by-pfps">
            {/* figure out how to stack up to three pfps */}
            <PostProfilePopupIcons followedBy={followedBy.slice(0, 3)} />
          </div>
          <p className="post-profile-followed-by-users">
            {mapFollowedByContent()}
            {/* map the first three user names, and then the count after the first three */}
          </p>
        </div>
      )}
    </div>
  );
};
