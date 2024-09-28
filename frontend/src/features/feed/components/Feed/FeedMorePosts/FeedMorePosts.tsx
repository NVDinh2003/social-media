import React from "react";

import "./FeedMorePosts.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import { readNotifications } from "../../../../../redux/Slices/NotificationSlice";
import { loadFeedPage } from "../../../../../redux/Slices/FeedSlice";

export const FeedMorePosts: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const posts = useSelector(
    (state: RootState) => state.notification.newPostNotifications
  );
  const dispatch: AppDispatch = useDispatch();

  const formatNumberOfPosts = (posts: number): string => {
    return posts < 100 ? `${posts}` : "100+";
  };

  const loadNewPosts = () => {
    if (userState.loggedIn && userState.token) {
      dispatch(readNotifications("NEW_POST"));
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          sessionStart: new Date(),
        })
      );
    }
  };

  return (
    <div className="feed-more-posts" onClick={loadNewPosts}>
      Show {formatNumberOfPosts(posts.length)} posts
    </div>
  );
};
