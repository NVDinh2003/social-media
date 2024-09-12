import React, { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";

import "./ProfileFollowSection.css";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../../redux/Slices/UserSlice";
import { ImageInfo } from "../../../../utils/GlobalInterface";

interface ProfileFollowSectionProps {
  profilePicture: ImageInfo | null;
  username: string;
}

export const ProfileFollowSection: React.FC<ProfileFollowSectionProps> = ({
  profilePicture,
  username,
}) => {
  //
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const followingList = useSelector((state: RootState) => state.user.following);

  const [hoveringOverUnfollow, setHoveringOverUnfollow] =
    useState<boolean>(false);

  const handleFollowUser = () => {
    if (token) dispatch(followUser({ token, followee: username }));
  };

  const default_pfp = process.env.REACT_APP_PFP;

  return (
    <div className="profile-follow-section">
      <img
        src={profilePicture ? profilePicture.imageURL : default_pfp}
        alt={`${username}'s pfp`}
        className="profile-follow-section-pfp"
      />

      <div className="profile-follow-section-left">
        <div className="profile-follow-section-more">
          <MoreHorizIcon
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>

        {followingList.find((person) => person.username === username) && (
          <div className="profile-follow-section-more">
            <NotificationAddIcon
              sx={{
                width: "20px",
                height: "20px",
              }}
            />
          </div>
        )}

        {followingList.find((person) => person.username === username) ? (
          <button
            className="profile-follow-section-unfollow-button"
            onMouseEnter={() => setHoveringOverUnfollow(true)}
            onMouseLeave={() => setHoveringOverUnfollow(false)}
          >
            {hoveringOverUnfollow ? "Unfollow" : "Following"}
          </button>
        ) : (
          <button
            className="profile-follow-section-follow-button"
            onClick={handleFollowUser}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
