import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./ProfileTopBar.css";
import VerifiedSVG from "../../../../components/SVGs/VerifiedSVG";
import { convertNumberOfPostsToString } from "../../utils/ProfileUitls";

interface ProfileTopBarProps {
  nickname: string;
  isVerified: boolean;
  organization: string;
  numberOfPosts: number;
}

export const ProfileTopBar: React.FC<ProfileTopBarProps> = ({
  nickname,
  isVerified,
  organization,
  numberOfPosts,
}) => {
  return (
    <div className="profile-top-bar">
      <div className="profile-top-bar-left">
        <ArrowBackIcon
          sx={{
            height: "20px",
            width: "20px",
          }}
        />
      </div>

      <div className="profile-top-bar-right">
        <div className="profile-top-bar-name-section">
          <p className="profile-top-bar-name">{nickname}</p>
          {isVerified && (
            <VerifiedSVG color={"#1da1f2"} width={20} height={20} />
          )}
          {organization && (
            <img
              src={organization}
              alt={`${nickname}'s organization`}
              height={20}
              width={20}
            />
          )}
        </div>

        <p className="profile-top-bar-posts">
          {convertNumberOfPostsToString(numberOfPosts)} posts
        </p>
      </div>
    </div>
  );
};
