import React from "react";
import { Notification as INotification } from "../../../../utils/GlobalInterface";

import "./Notification.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { readNotifications } from "../../../../redux/Slices/NotificationSlice";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

interface NotificationProps {
  icon: JSX.Element;
  notifications: INotification[];
  children: React.ReactNode;
}

export const Notification: React.FC<NotificationProps> = ({
  icon,
  notifications,
  children,
}) => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (notifications[0].acknowledged) {
      // Do more work , this is just for this episode
      switch (notifications[0].notificationType) {
        case "FOLLOW":
          if (notifications.length > 1) {
            navigate(`/${notifications[0].actionUser.username}`);
          } else {
            navigate(`/${notifications[0].recipient.username}/followers`);
          }
          break;
        case "LIKE":
        case "REPOST":
        case "MENTION":
        case "REPLY":
          if (notifications[0].post)
            navigate(`/${notifications[0].post.postId}`);
          break;
      }
    } else {
      if (token) {
        dispatch(
          readNotifications({
            notifications,
            token,
          })
        );
      }
    }
  };

  return (
    <div
      className={`notification ${
        notifications[0].acknowledged ? "" : "notification-unread"
      } ${
        notifications[0].notificationType !== "REPLY" &&
        notifications[0].notificationType !== "MENTION"
          ? " notification-padding"
          : ""
      }`}
      onClick={handleNotificationClicked}
    >
      {notifications[0].notificationType !== "REPLY" &&
        notifications[0].notificationType !== "MENTION" && (
          <div className="notification-top">
            <div className="notification-top-icon-container">{icon}</div>
            <div className="notification-pfps">
              {notifications.slice(0, 10).map((noti) => {
                return (
                  <ProfilePicture
                    user={noti.actionUser}
                    size={"32"}
                    key={noti.notificationId}
                  />
                );
              })}
            </div>
          </div>
        )}

      {children}
    </div>
  );
};
