import React, { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  fetchNextFeedPage,
  loadFeedPage,
  setCurrentPageNumber,
  setSessionTime,
} from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";
import { sendBatchedPostViews } from "../../../../redux/Slices/PostSlice";
import { FeedMorePosts } from "./FeedMorePosts/FeedMorePosts";

export const Feed: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);
  const postState = useSelector((state: RootState) => state.post);
  const notificationState = useSelector(
    (state: RootState) => state.notification
  );

  const currentPageNumber = useSelector(
    (state: RootState) => state.feed.currentPageNumber
  );
  const sessionStart = useSelector(
    (state: RootState) => state.feed.sessionStart
  );

  // const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch();

  const hiddenDiv = useRef<HTMLDivElement>(null);

  const fetchNextPosts = (entries: any) => {
    entries.forEach((entry: any) => {
      if (
        entry.isIntersecting &&
        userState.loggedIn &&
        userState.token &&
        sessionStart
      ) {
        dispatch(setCurrentPageNumber());
      }
    });
  };

  const initBeforeUnload = () => {
    window.onbeforeunload = (event: Event) => {
      dispatch(
        sendBatchedPostViews({
          ids: postState.batchedViews,
          token: userState.token,
        })
      );
    };
  };

  useEffect(() => {
    if (sessionStart === undefined) {
      dispatch(setSessionTime(new Date()));
    }

    if (
      userState.loggedIn &&
      userState.token &&
      postState.loading === false &&
      sessionStart
    ) {
      console.log("reloading feed page!");
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          sessionStart,
        })
      );
    }
    if (hiddenDiv && hiddenDiv.current) {
      const observer = new IntersectionObserver(fetchNextPosts, {
        root: null,
        threshold: 1,
      });

      const target = hiddenDiv.current;

      observer.observe(target);
    }
  }, [userState.token, userState.loggedIn, postState.loading, sessionStart]);

  useEffect(() => {
    if (currentPageNumber !== 0 && userState.loggedIn && sessionStart) {
      dispatch(
        sendBatchedPostViews({
          ids: postState.batchedViews,
          token: userState.token,
        })
      );

      dispatch(
        fetchNextFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
          page: currentPageNumber,
          sessionStart,
        })
      );
    }
  }, [currentPageNumber, sessionStart]);

  useEffect(() => {
    initBeforeUnload();

    return () => {
      dispatch(
        sendBatchedPostViews({
          ids: postState.batchedViews,
          token: userState.token,
        })
      );
    };
  }, []);

  return (
    <div className="feed">
      <FeedTopBar />

      <FeedPostCreator />

      {notificationState.newPostNotifications.length > 0 && <FeedMorePosts />}

      {feedState.posts.length > 0 && (
        <div className="feed-posts">
          {feedState.posts.map((post) => (
            <Post feedPost={post} key={post.post.postId} notification={false} />
          ))}
        </div>
      )}

      <div id="autoload" ref={hiddenDiv} hidden={feedState.posts.length === 0}>
        <CircularProgress
          size={30}
          sx={{
            color: "#1da1f2",
          }}
        />
      </div>
    </div>
  );
};
