import React from "react";
import { Notification as INotification } from "../../../utils/GlobalInterface";

import "./Notification.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useNavigate } from "react-router-dom";
import { readNotifications } from "../../../redux/Slices/NotificationSlice";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";

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
      navigate(`/${notifications[0].recipient.username}/followers`);
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
      }`}
      onClick={handleNotificationClicked}
    >
      <div className="notification-top">
        <div className="notification-top-icon-container">{icon}</div>
        <div className="notification-pfps">
          {notifications.slice(0, 10).map((noti) => {
            return <ProfilePicture user={noti.actionUser} size={"32"} />;
          })}
        </div>
      </div>

      {children}
    </div>
  );
};
