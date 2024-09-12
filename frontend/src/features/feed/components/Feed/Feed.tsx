import React, { useEffect } from "react";

import "./Feed.css";
import { FeedTopBar } from "../FeedTopBar/FeedTopBar";
import { FeedPostCreator } from "../FeedPostCreator/FeedPostCreator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { loadFeedPage } from "../../../../redux/Slices/FeedSlice";
import { Post } from "../../../post/components/Post/Post";
import { FeedPostCreatorEditImageModal } from "../FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPostCreatorGifModal } from "../FeedPostCreatorGifModal/FeedPostCreatorGifModal";
import { SchedulePostModal } from "../../../schedule-post/SchedulePostModal/SchedulePostModal";

export const Feed: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const feedState = useSelector((state: RootState) => state.feed);

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

      {displayEditImageModal && <FeedPostCreatorEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPostCreatorGifModal />}
      {displayScheduleModal && <SchedulePostModal />}

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
