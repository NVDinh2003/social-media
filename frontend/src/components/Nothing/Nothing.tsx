import React from "react";
import nothingLogo from "../../assets/snapedit_1731227093815.png";

// import "../VerifiedNotifications.css";

export const Nothing: React.FC = () => {
  return (
    <div className="verified-notification">
      <img
        src={nothingLogo}
        alt="verified Notification"
        className="verified-notification-img"
      />
      <h1 className="verified-notification-header">
        Nothing to see here -- yet
      </h1>
    </div>
  );
};
