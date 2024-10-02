import React from "react";
import verifiedNotification from "../../../../assets/verification-notification.png";

import "./VerifiedNotifications.css";

export const VerifiedNotifications: React.FC = () => {
  return (
    <div className="verified-notification">
      <img
        src={verifiedNotification}
        alt="verified Notification"
        className="verified-notification-img"
      />
      <h1 className="verified-notification-header">
        Nothing to see here -- yet
      </h1>
      <p className="verified-notification-text">
        Likes, mentions, reposts, and comments you're tagged in when verified
        account will appear here.
        <span className="verified-notification-text-underline">Learn more</span>
      </p>
    </div>
  );
};
