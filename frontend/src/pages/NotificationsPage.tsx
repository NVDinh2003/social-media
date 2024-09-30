import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useLocation } from "react-router-dom";

import "./NotificationsPage.css";
import { NotificationHeader } from "../features/notification/Notification/NotificationHeader/NotificationHeader";
import { NotificationsAll } from "../features/notification/NotificationsAll/NotificationsAll";

export default function NotificationsPage() {
  const notificationState = useSelector(
    (state: RootState) => state.notification
  );

  const location = useLocation();

  return (
    <div className="notifications">
      <NotificationHeader />

      {location.pathname === "/notifications" && (
        <NotificationsAll
          notifications={[
            ...notificationState.followNotifications,
            ...notificationState.postActionNotifications,
          ]}
        />
      )}
    </div>
  );
}
