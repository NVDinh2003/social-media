import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useLocation } from "react-router-dom";

import "./NotificationsPage.css";
import { NotificationHeader } from "../features/notification/components/Notification/NotificationHeader/NotificationHeader";
import { NotificationsAll } from "../features/notification/components/NotificationsAll/NotificationsAll";
import { MentionNotification } from "../features/notification/components/MentionNotification/MentionNotification";
import { VerifiedNotifications } from "../features/notification/components/VerifiedNotifications/VerifiedNotifications";

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
            ...notificationState.mentionNotifications,
          ]}
        />
      )}

      {location.pathname === "/notifications/mentions" && (
        <MentionNotification
          notifications={notificationState.mentionNotifications}
        />
      )}

      {location.pathname === "/notifications/verified" && (
        <VerifiedNotifications />
      )}
    </div>
  );
}
