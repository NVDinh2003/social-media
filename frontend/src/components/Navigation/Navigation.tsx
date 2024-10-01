import React, { useEffect, useState } from "react";
import blueLogo from "../../assets/fwitter-logo-large-blue.png";

import "./Navigation.css";
import { Link } from "react-router-dom";
import HomeSVG from "../SVGs/HomeSVG";
import ExploreSVG from "../SVGs/ExploreSVG";
import NotificationSVG from "../SVGs/NotificationSVG";
import MessagesSVG from "../SVGs/MessagesSVG";
import ListsSVG from "../SVGs/ListsSVG";
import CommunitiesSVG from "../SVGs/CommunitiesSVG";
import ProfileSVG from "../SVGs/ProfileSVG";
import MoreSVG from "../SVGs/MoreSVG";
import BookmarksSVG from "../SVGs/BookmarksSVG";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import Circle from "@mui/icons-material/Circle";

interface NavigationProps {
  currentPage: string;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  //

  useEffect(() => {}, [currentPage]);

  const state = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notification);

  const [newNotifications, setNewNotifications] = useState<number>(0);

  const calculateNewNotifications = () => {
    const allNotifications = [
      ...notifications.postActionNotifications,
      ...notifications.mentionNotifications,
      ...notifications.followNotifications,
    ];

    const unreadNotifications = allNotifications.filter(
      (notification) => !notification.acknowledged
    );

    setNewNotifications(unreadNotifications.length);
  };

  useEffect(() => {
    calculateNewNotifications();
  }, [
    notifications.followNotifications.length,
    notifications.mentionNotifications.length,
    notifications.newPostNotifications.length,
    notifications.postActionNotifications.length,
  ]);

  return (
    <div className="navigation">
      <nav className="navigation-container">
        <Link to="/home" className="navigation-logo-bg">
          <img src={blueLogo} alt="" className="navigation-logo" />
        </Link>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <div className="navigation-notification-wrapper">
              {notifications.newPostNotifications.length > 0 && (
                <Circle
                  sx={{
                    color: "#1da1f2",
                    height: "8px",
                    width: "8px",
                    position: "absolute",
                    top: "-4px",
                    right: 0,
                  }}
                />
              )}
              <HomeSVG height={26} width={26} />
            </div>

            <p
              className={`navigation-text ${
                currentPage === "/home"
                  ? "navigation-active"
                  : "navigation-inactive"
              }`}
            >
              Home
            </p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/explore" className="navigation-link">
            <ExploreSVG height={26} width={26} />
            <p
              className={`navigation-text ${
                currentPage === "/explore"
                  ? "navigation-active"
                  : "navigation-inactive"
              }`}
            >
              Explore
            </p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/notifications" className="navigation-link">
            <div className="navigation-notification-wrapper">
              {newNotifications > 0 && (
                <div className="navigation-notification-count-wrapper">
                  <p className="navigation-notification-count">
                    {newNotifications < 10 ? newNotifications : "9+"}
                  </p>
                </div>
              )}
              <NotificationSVG height={26} width={26} />
            </div>

            <p
              className={`navigation-text 
                ${
                  currentPage.startsWith("/notifications")
                    ? "navigation-active"
                    : "navigation-inactive"
                } `}
            >
              Notifications
            </p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <div className="navigation-notification-wrapper">
              {notifications.messageNotifications.length > 0 && (
                <Circle
                  sx={{
                    color: "#1da1f2",
                    height: "8px",
                    width: "8px",
                    position: "absolute",
                    top: "-4px",
                    right: 0,
                  }}
                />
              )}
              <MessagesSVG height={26} width={26} />
            </div>
            <p className="navigation-text navigation-inactive">Message</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ListsSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">List</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <CommunitiesSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Communities</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <BookmarksSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Bookmarks</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ProfileSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Profile</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <MoreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">More</p>
          </Link>
        </div>

        <button className="navigation-post-button">Post</button>
      </nav>

      <div className="navigation-options">
        <img
          alt=""
          className="navigation-options-pfp"
          src={process.env.REACT_APP_PFP}
        />

        <div className="navigation-options-info">
          <p className="navigation-options-info-display-name">
            {state.loggedIn && state.loggedIn.nickname
              ? state.loggedIn.nickname
              : state.username}
          </p>
          <p className="navigation-options-info-handle">
            @{state.username ? state.username : ""}
          </p>
        </div>

        <p className="navigation-option-dotdotdot">...</p>
      </div>
    </div>
  );
};
