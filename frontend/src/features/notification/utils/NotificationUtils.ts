import { Notification } from "../../../utils/GlobalInterface";

export function sortNotificationsByTS(
  notifications: Notification[]
): Notification[] {
  return notifications.sort((a, b) => {
    return -(
      new Date(a.notificationTimestamp).getTime() -
      new Date(b.notificationTimestamp).getTime()
    );
  });
}
