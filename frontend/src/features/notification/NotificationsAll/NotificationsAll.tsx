import React from "react";
import { Notification as INotification } from "../../../utils/GlobalInterface";

import "./NotificationsAll.css";
import { FollowNotification } from "../FollowNotification/FollowNotification";
import { sortNotificationsByTimestamp } from "../utils/NotificationUtils";

export const NotificationsAll: React.FC<{ notifications: INotification[] }> = ({
  notifications,
}) => {
  const groupedNotifications = (): JSX.Element[] => {
    const sorted: INotification[] = sortNotificationsByTimestamp(notifications);
    let notificationMap = new Map<string, INotification[]>();
    let notificationComponent: JSX.Element[] = [];

    // loop through all of the notifications
    sorted.forEach((notification) => {
      switch (notification.notificationType) {
        case "FOLLOW":
          if (notification.acknowledged) {
            const notificationMonth = new Date(
              notification.notificationTimeStamp
            ).getMonth();
            const key = `readFollowNotificationsForMonth${notificationMonth}`;

            if (!notificationMap.has(key)) {
              notificationMap.set(key, [notification]);
              break;
            }

            let notificationsForThisMonth = notificationMap.get(key);
            notificationsForThisMonth!.push(notification); // !may not exist
            notificationMap.set(key, notificationsForThisMonth!);
          } else {
            if (!notificationMap.has("unreadFollowNotifications"))
              notificationMap.set("unreadFollowNotifications", []);

            const unreadFollowNotifications = notificationMap.get(
              "unreadFollowNotifications"
            );
            unreadFollowNotifications!.push(notification);
            notificationMap.set(
              "unreadFollowNotifications",
              unreadFollowNotifications!
            );
          }
          break;
        default:
          break;
      }
    });

    notificationMap.forEach((notificationList) => {
      switch (notificationList[0].notificationType) {
        case "FOLLOW":
          notificationComponent.push(
            <FollowNotification
              key={notificationList[0].notificationId}
              notifications={notificationList}
            />
          );
          break;
        default:
          break;
      }
    });

    return notificationComponent;
  };

  return <div className="notification-all">{groupedNotifications()}</div>;
};
