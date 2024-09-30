import { Notification } from "../../../utils/GlobalInterface";

export function sortNotificationsByTimestamp(
  notifications: Notification[]
): Notification[] {
  return notifications.sort((a, b) => {
    return -(
      new Date(a.notificationTimeStamp).getTime() -
      new Date(b.notificationTimeStamp).getTime()
    );
  });
}
