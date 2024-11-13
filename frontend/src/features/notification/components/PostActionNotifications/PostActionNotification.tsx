import React from "react";
import { Notification } from "../Notification/Notification";
import { NotificationPostContent } from "../NotificationPostContent/NotificationPostContent";
import { NotificationUsersText } from "../NotificationUsersText/NotificationUsersText";
import { Notification as INotification } from "../../../../utils/GlobalInterface";

interface PostActionNotificationsProps {
  icon: JSX.Element;
  text: string;
  notifications: INotification[];
}

export const PostActionNotification: React.FC<PostActionNotificationsProps> = ({
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
