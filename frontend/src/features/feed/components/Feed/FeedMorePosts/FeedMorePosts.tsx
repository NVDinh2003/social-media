import React from "react";

import "./FeedMorePosts.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/Store";
import { readNotifications } from "../../../../../redux/Slices/NotificationSlice";
import {
  loadFeedPage,
  setFeedPosts,
} from "../../../../../redux/Slices/FeedSlice";

export const FeedMorePosts: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const posts = useSelector(
    (state: RootState) => state.notification.newPostNotifications
  );
  const dispatch: AppDispatch = useDispatch();

  const formatNumberOfPosts = (posts: number): string => {
    return posts < 100 ? `${posts}` : "100+";
  };

  // const loadNewPosts = () => {
  //   if (userState.loggedIn && userState.token) {
  //     dispatch(
  //       readNotifications({
  //         notifications: posts,
  //         token: userState.token,
  //       })
  //     );
  //     dispatch(
  //       loadFeedPage({
  //         token: userState.token,
  //         userId: userState.loggedIn.userId,
  //         sessionStart: new Date(),
  //       })
  //     );
  //   }
  // };

  const loadNewPosts = () => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        readNotifications({
          notifications: posts,
          token: userState.token,
        })
      );
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          sessionStart: new Date(),
        })
      ).then((action) => {
        if (loadFeedPage.fulfilled.match(action)) {
          dispatch(setFeedPosts(action.payload.posts));
        }
      });
    }
  };

  return (
    <div className="feed-more-posts" onClick={loadNewPosts}>
      Show {formatNumberOfPosts(posts.length)} posts
    </div>
  );
};
