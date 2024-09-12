import React, { useEffect } from "react";

import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { loadFeedPage } from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";

export const Feed: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
        })
      );
    }
  }, [userState.token, userState.loggedIn]);

  return (
    <div className="feed">
      <FeedTopBar />
      <FeedPostCreator />
      {!feedState.loading && (
        <div className="feed-posts">
          {feedState.posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
