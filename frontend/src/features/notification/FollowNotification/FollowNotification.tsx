import React, { useState } from "react";
import { Notification as INotification } from "../../../utils/GlobalInterface";

import "./FollowNotification.css";
import { Notification } from "../Notification/Notification";
import FollowNotificationSVG from "../../../components/SVGs/FollowNotificationSVG";

export const FollowNotification: React.FC<{
  notifications: INotification[];
}> = ({ notifications }) => {
  const [firstUser, setFirstUser] = useState<string>(() => {
    return notifications[0].actionUser.nickname;
  });
  return (
    <Notification
      icon={<FollowNotificationSVG height={30} width={30} color="#1da1f2" />}
      notifications={notifications}
    >
      <p className="follow-notification-text">
        <span className="follow-notification-text-bold">{firstUser}</span>{" "}
        {notifications.length > 1
          ? `and ${notifications.length - 1} other`
          : ""}{" "}
        followed you
      </p>
    </Notification>
  );
};
