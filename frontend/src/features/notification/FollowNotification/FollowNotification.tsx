import React, { useState } from "react";
import { Notification as INotification } from "../../../utils/GlobalInterface";

import "./FollowNotification.css";
import { Notification } from "../Notification/Notification";
import FollowNotificationSVG from "../../../components/SVGs/FollowNotificationSVG";
import { NotificationUsersText } from "../NotificationUsersText/NotificationUsersText";

export const FollowNotification: React.FC<{
  notifications: INotification[];
}> = ({ notifications }) => {
  return (
    <Notification
      icon={<FollowNotificationSVG height={30} width={30} color="#1da1f2" />}
      notifications={notifications}
    >
      <NotificationUsersText
        notifications={notifications}
        text={" followed you"}
      />
    </Notification>
  );
};
