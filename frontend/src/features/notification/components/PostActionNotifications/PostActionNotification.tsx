import React from "react";
import { Notification as INotification } from "../../../../utils/GlobalInterface";

import "./PostActionNotification.css";
import { Notification } from "../Notification/Notification";
import { NotificationUsersText } from "../NotificationUsersText/NotificationUsersText";
import { NotificationPostContent } from "../NotificationPostContent/NotificationPostContent";

interface PostActionNotificationProps {
  icon: JSX.Element;
  text: string;
  notifications: INotification[];
}

export const PostActionNotification: React.FC<PostActionNotificationProps> = ({
  icon,
  text,
  notifications,
}) => {
  return (
    <>
      {notifications[0].post && (
        <Notification icon={icon} notifications={notifications}>
          <NotificationUsersText notifications={notifications} text={text} />
          <NotificationPostContent post={notifications[0].post} />
        </Notification>
      )}
    </>
  );
};
