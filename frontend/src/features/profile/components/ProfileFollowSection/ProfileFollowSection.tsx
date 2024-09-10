import React from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./ProfileFollowSection.css";

interface ProfileFollowSectionProps {
  profilePicture: string;
  username: string;
}

export const ProfileFollowSection: React.FC<ProfileFollowSectionProps> = ({
  profilePicture,
  username,
}) => {
  const default_pfp = process.env.REACT_APP_PFP;

  return (
    <div className="profile-follow-section">
      <img
        src={profilePicture ? profilePicture : default_pfp}
        alt={`${username}'s pfp`}
        className="profile-follow-section-pfp"
      />

      <div className="profile-follow-section-left">
        <div className="profile-follow-section-more">
          <MoreHorizIcon />
        </div>

        <button className="profile-follow-section-button">Follow</button>
      </div>
    </div>
  );
};
