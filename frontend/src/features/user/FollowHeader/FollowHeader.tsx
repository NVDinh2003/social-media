// FollowHeader.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Verified from "@mui/icons-material/Verified";
import { User } from "../../../utils/GlobalInterface";
import "./FollowHeader.css";

interface FollowHeaderProps {
  user: User;
}

export const FollowHeader: React.FC<FollowHeaderProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(() => {
    switch (location.pathname) {
      case `/${user.username}/followers`:
        return "followers";
      case `/${user.username}/following`:
        return "following";
      default:
        return "followers";
    }
  });

  const navigateToNotifications = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetId = e.currentTarget.id;
    navigate(`/${user.username}/${targetId}`);
    setActive(targetId);
  };

  const navigateToProfile = () => {
    navigate(`/${user.username}`);
  };

  return (
    <div className="notification-header">
      <div className="profile-top-bar">
        <div className="profile-top-bar-left" onClick={navigateToProfile}>
          <ArrowBack sx={{ height: "20px", width: "20px" }} />
        </div>
        <div className="profile-top-bar-right">
          <div className="profile-top-bar-name-section">
            <p className="profile-top-bar-name">{`${user.firstName} ${user.lastName}`}</p>
            {user.verifiedAccount && (
              <Verified
                sx={{ color: "#1da1f2", width: "20px", height: "20px" }}
              />
            )}
          </div>
          <p className="profile-top-bar-posts">@{user.username}</p>
        </div>
      </div>
      <div className="notification-header-tabs">
        <div
          id="followers"
          className="notification-header-tab"
          onClick={navigateToNotifications}
        >
          <p
            className={
              active === "followers"
                ? "notification-header-text-active"
                : "notification-header-text-inactive"
            }
          >
            Followers
          </p>
          {active === "followers" && (
            <div className="notification-header-active"></div>
          )}
        </div>
        <div
          id="following"
          className="notification-header-tab"
          onClick={navigateToNotifications}
        >
          <p
            className={
              active === "following"
                ? "notification-header-text-active"
                : "notification-header-text-inactive"
            }
          >
            Following
          </p>
          {active === "following" && (
            <div className="notification-header-active"></div>
          )}
        </div>
      </div>
    </div>
  );
};
