import React, { useEffect, useRef, useState } from "react";

import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  fetchNextFeedPage,
  loadFeedPage,
} from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";
import { FeedPostCreatorEditImageModal } from "../FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPostCreatorGifModal } from "../FeedPostCreatorGifModal/FeedPostCreatorGifModal";
import { SchedulePostModal } from "../../../schedule-post/SchedulePostModal/SchedulePostModal";
import { CreateReply } from "../../../post/components/CreateReply/CreateReply";

export const Feed: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);
  const postState = useSelector((state: RootState) => state.post);

  // display modal
  const displayEditImageModal = useSelector(
    (state: RootState) => state.modal.displayEditPostImage
  );

  const displayTagPeopleModal = useSelector(
    (state: RootState) => state.modal.displayTagPeople
  );

  const displayGifModal = useSelector(
    (state: RootState) => state.modal.displayGif
  );

  const displayScheduleModal = useSelector(
    (state: RootState) => state.modal.displaySchedule
  );

  const displayCreateReplyModal = useSelector(
    (state: RootState) => state.modal.displayCreateReply
  );

  // const currentPageNumber = useSelector((state: RootState) => state.feed.currentPageNumber);
  // const sessionStart = useSelector((state: RootState) => state.feed.sessionStart);

  const [sessionStart, setSessionStart] = useState<Date>(() => {
    return new Date();
  });

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch();

  const hiddenDiv = useRef<HTMLDivElement>(null);

  const fetchNextPosts = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting && userState.loggedIn && userState.token) {
        dispatch(
          fetchNextFeedPage({
            token: userState.token,
            userId: userState.loggedIn.userId,
            page: currentPageNumber + 1,
            sessionStart,
          })
        );
        console.log("Try fetch post !");
        setCurrentPageNumber(currentPageNumber + 1);
      }
    });
  };

  useEffect(() => {
    if (userState.loggedIn && userState.token && postState.loading === false) {
      dispatch(
        loadFeedPage({
          token: userState.token,
          userId: userState.loggedIn.userId,
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
  }, [userState.token, userState.loggedIn, postState.loading]);

  useEffect(() => {
    console.log(
      "Session start: ",
      sessionStart,
      "current page: ",
      currentPageNumber
    );
  }, [sessionStart, currentPageNumber]);

  return (
    <div className="feed">
      <FeedTopBar />

      {displayEditImageModal && <FeedPostCreatorEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPostCreatorGifModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayCreateReplyModal && <CreateReply />}

      <FeedPostCreator />
      {feedState.posts.length > 0 && (
        <div className="feed-posts">
          {feedState.posts.map((post) => (
            <Post feedPost={post} />
          ))}
        </div>
      )}

      <div
        id="autoload"
        ref={hiddenDiv}
        hidden={feedState.posts.length === 0}
      ></div>
    </div>
  );
};
