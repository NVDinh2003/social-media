import React from "react";
import { Notification as INotification } from "../../../../utils/GlobalInterface";

import "./NotificationsAll.css";
import { FollowNotification } from "../FollowNotification/FollowNotification";

import { lessThanMonth, lessThanYear } from "../../../../utils/DateUtils";
import { PostActionNotification } from "../PostActionNotifications/PostActionNotification";
import { Notification } from "../Notification/Notification";
import { Post } from "../../../post/components/Post/Post";
import LikeNotificationSVG from "../../../../components/SVGs/NotificationAction/LikeNotificationSVG";
import RepostNotificationSVG from "../../../../components/SVGs/NotificationAction/RepostNotificationSVG";
import { Nothing } from "../../../../components/Nothing/Nothing";
import { sortNotificationsByTS } from "../../utils/NotificationUtils";
import StarsSVG from "../../../../components/SVGs/StarsSVG";
import StarNotificationSVG from "../../../../components/SVGs/NotificationAction/StarNotificationSVG";

export const NotificationsAll: React.FC<{ notifications: INotification[] }> = ({
  notifications,
}) => {
  const groupedNotifications = (): JSX.Element[] => {
    const sorted: INotification[] = sortNotificationsByTS(notifications);
    let notificationMap = new Map<string, INotification[]>();
    let notificationComponents: JSX.Element[] = [];
    let key = "";

    sorted.forEach((notification) => {
      const todaysDate = new Date();
      const notificationDate = new Date(notification.notificationTimestamp);
      const dateString = `${
        notificationDate.getMonth() + 1
      }-${notificationDate.getDate()}-${notificationDate.getFullYear()}`;
      key = "";

      if (notification.acknowledged) {
        if (
          notification.notificationType === "REPLY" &&
          notification.post &&
          notification.reply
        ) {
          key = `read${notification.notificationType.toLowerCase()}NotificationForPost${
            notification.post.postId
          }${notification.notificationType.toLowerCase()}${
            notification.reply.postId
          }`;
        } else if (lessThanMonth(todaysDate, notificationDate)) {
          key = `read${notification.notificationType.toLowerCase()}NotificationsFor${dateString}${
            notification.post ? `AndPost${notification.post.postId}` : ""
          }`;
        } else if (lessThanYear(todaysDate, notificationDate)) {
          key = `read${notification.notificationType.toLowerCase()}Notifications${
            notification.post ? `ForPost${notification.post.postId}` : ""
          }`;
        }

        if (key !== "" && !notificationMap.has(key)) {
          notificationMap.set(key, [notification]);
        } else if (key !== "" && notificationMap.has(key)) {
          let readNotifications = notificationMap.get(key);
          readNotifications!.push(notification);
          notificationMap.set(key, readNotifications!);
        }
      } else {
        if (
          notification.notificationType === "REPLY" &&
          notification.post &&
          notification.reply
        ) {
          key = `unread${notification.notificationType.toLowerCase()}NotificationForPost${
            notification.post.postId
          }${notification.notificationType.toLowerCase()}${
            notification.reply.postId
          }`;
        } else {
          key = `unread${notification.notificationType.toLowerCase()}NotificationsFor${dateString}${
            notification.post ? `ForPost${notification.post.postId}` : ""
          }`;
        }

        if (!notificationMap.has(key)) notificationMap.set(key, []);

        const unreadNotifications = notificationMap.get(key);
        unreadNotifications!.push(notification);
        notificationMap.set(key, unreadNotifications!);
      }
    });

    let unreadNotificationLists: Array<INotification[]> = [];
    let readNotificationLists: Array<INotification[]> = [];

    notificationMap.forEach((notificationList) => {
      if (notificationList[0].acknowledged) {
        readNotificationLists.push(notificationList);
      } else {
        unreadNotificationLists.push(notificationList);
      }
    });

    unreadNotificationLists.forEach((notificationList) => {
      notificationComponents.push(notificationListToElement(notificationList));
    });

    readNotificationLists.forEach((notificationList) => {
      notificationComponents.push(notificationListToElement(notificationList));
    });

    return notificationComponents;
  };

  const notificationListToElement = (
    notificationList: INotification[]
  ): JSX.Element => {
    let feedPost;
    switch (notificationList[0].notificationType) {
      case "FOLLOW":
        return (
          <FollowNotification
            key={notificationList[0].notificationId}
            notifications={notificationList}
          />
        );
      case "LIKE":
        return (
          <PostActionNotification
            key={notificationList[0].notificationId}
            notifications={notificationList}
            text={" liked your post"}
            icon={
              <LikeNotificationSVG
                height={30}
                width={30}
                color={"rgb(249, 24, 128)"}
              />
            }
          />
        );
      case "REPOST":
        return (
          <PostActionNotification
            key={notificationList[0].notificationId}
            notifications={notificationList}
            text={" reposted your post"}
            icon={
              <RepostNotificationSVG
                height={30}
                width={30}
                color={"rgb(0, 186, 124)"}
              />
            }
          />
        );
      case "STAR":
        return (
          <PostActionNotification
            key={notificationList[0].notificationId}
            notifications={notificationList}
            text={" starred to your post"}
            icon={
              <StarNotificationSVG
                height={35}
                width={35}
                color={"rgb(234, 165, 5)"}
              />
            }
          />
        );
      case "REPLY":
        feedPost = {
          post: notificationList[0].reply!,
          replyTo: notificationList[0].post!,
          repost: false,
          repostUser: notificationList[0].actionUser,
        };

        return (
          <Notification icon={<></>} notifications={notificationList}>
            <Post
              key={notificationList[0].notificationId}
              feedPost={feedPost}
              notification={true}
            />
          </Notification>
        );
      case "MENTION":
        feedPost = {
          post: notificationList[0].post!,
          replyTo: null,
          repost: false,
          repostUser: notificationList[0].actionUser,
        };
        return (
          <Notification icon={<></>} notifications={notificationList}>
            <Post
              key={notificationList[0].notificationId}
              feedPost={feedPost}
              notification={true}
            />
          </Notification>
        );
      default:
        return <></>;
    }
  };

  return <div className="notifications-all">{groupedNotifications()}</div>;
};
