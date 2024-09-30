import React, { useState } from "react";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";

import "./NotificationHeader.css";
import { useLocation, useNavigate } from "react-router-dom";

export const NotificationHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(() => {
    switch (location.pathname) {
      case "/notifications/verified":
        return "Verified";
      case "/notifications/mentions":
        return "Mentions";
      default:
        return "All";
    }
  });

  const navigateToNotifications = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.id) {
      case "Verified":
        navigate("/notifications/verified");
        setActive("Verified");
        break;
      case "Mentions":
        navigate("/notifications/mentions");
        setActive("Mentions");
        break;
      default:
        navigate("/notifications");
        setActive("All");
        break;
    }
  };

  return (
    <div className="notification-header">
      <div className="notification-header-top">
        <h2 className="notification-header-title">Notifications</h2>
        <div className="notification-header-settings-wrapper">
          <SettingsOutlined sx={{ height: "20px", width: "20px" }} />
        </div>
      </div>

      <div className="notification-header-tabs">
        <div
          id="All"
          className="notification-header-tab"
          onClick={navigateToNotifications}
        >
          <p
            className={
              active === "All"
                ? "notification-header-text-active"
                : "notification-header-text-inactive"
            }
          >
            All
          </p>
          {active === "All" && (
            <div className="notification-header-active"></div>
          )}
        </div>

        <div
          id="Verified"
          className="notification-header-tab"
          onClick={navigateToNotifications}
        >
          <p
            className={
              active === "Verified"
                ? "notification-header-text-active"
                : "notification-header-text-inactive"
            }
          >
            Verified
          </p>
          {active === "Verified" && (
            <div className="notification-header-active"></div>
          )}
        </div>

        <div
          id="Mentions"
          className="notification-header-tab"
          onClick={navigateToNotifications}
        >
          <p
            className={
              active === "Mentions"
                ? "notification-header-text-active"
                : "notification-header-text-inactive"
            }
          >
            Mentions
          </p>
          {active === "Mentions" && (
            <div className="notification-header-active"></div>
          )}
        </div>
      </div>
    </div>
  );
};
