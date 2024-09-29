import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useLocation } from "react-router-dom";

import "./NotificationsPage.css";

export default function NotificationsPage() {
  const notificationState = useSelector(
    (state: RootState) => state.notification
  );
  const allNotifications = [
    ...notificationState.followNotifications,
    ...notificationState.postActionNotifications,
    ...notificationState.mentionNotifications,
  ];

  const location = useLocation();

  return (
    <div className="notifications">
      Notifications:
      {allNotifications.map((notification) => (
        <h2>
          {notification.notificationType} Notification from{" "}
          {notification.actionUser.username}
        </h2>
      ))}
    </div>
  );
}
