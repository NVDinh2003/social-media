import React from "react";
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

export const Navigation: React.FC = () => {
  return (
    <div className="navigation">
      <nav className="navigation-container">
        <Link to="/home" className="navigation-logo-bg">
          <img src={blueLogo} alt="" className="navigation-logo" />
        </Link>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <HomeSVG height={26} width={26} />
            <p className="navigation-text navigation-active">Home</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <ExploreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Explore</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <NotificationSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Notification</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <MessagesSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Message</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <ListsSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">List</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <CommunitiesSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Communities</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <BookmarksSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Bookmarks</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <ProfileSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Profile</p>
          </Link>
        </div>

        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
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
          src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"
        />

        <div className="navigation-options-info">
          <p className="navigation-options-info-display-name">EnViDii</p>
          <p className="navigation-options-info-handle">@Envidiii</p>
        </div>

        <p className="navigation-option-dotdotdot">...</p>
      </div>
    </div>
  );
};
