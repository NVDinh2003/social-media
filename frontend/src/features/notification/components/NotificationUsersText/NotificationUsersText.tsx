import React from "react";
import { Notification as INotification } from "../../../../utils/GlobalInterface";

import "./NotificationUsersText.css";
import { PostUsername } from "../../../post/components/Post/PostUsername/PostUsername";

export const NotificationUsersText: React.FC<{
  notifications: INotification[];
  text: string;
}> = ({ notifications, text }) => {
  function generateText(): JSX.Element {
    switch (notifications.length) {
      case 1:
        return (
          <>
            <PostUsername author={notifications[0].actionUser} repost={false} />
            {text}
          </>
        );
      case 2:
        return (
          <>
            <PostUsername author={notifications[0].actionUser} repost={false} />{" "}
            and
            <PostUsername
              author={notifications[1].actionUser}
              repost={false}
            />{" "}
            {text}
          </>
        );
      default:
        return (
          <>
            <PostUsername author={notifications[0].actionUser} repost={false} />{" "}
            and {`${notifications.length - 1} others`} {text}
          </>
        );
    }
  }

  return <div className="notification-users-text">{generateText()}</div>;
};
