import React from "react";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";

import "./Home.css";
import { Feed } from "../features/feed/components/Feed/Feed";
import { FeedPostCreatorEditImageModal } from "../features/feed/components/FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPostCreatorGifModal } from "../features/feed/components/FeedPostCreatorGifModal/FeedPostCreatorGifModal";
import { SchedulePostModal } from "../features/schedule-post/SchedulePostModal/SchedulePostModal";
import { FeedPostCreatorLocationModal } from "../features/feed/components/FeedPostCreatorLocationModal/FeedPostCreatorLocationModal";
import { EditProfile } from "../features/profile/components/EditProfile/EditProfile";

export const Home: React.FC = () => {
  //
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

  const displayLocationModal = useSelector(
    (state: RootState) => state.modal.displayLocation
  );

  return (
    <div className="home">
      {displayEditImageModal && <FeedPostCreatorEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displayGifModal && <FeedPostCreatorGifModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayLocationModal && <FeedPostCreatorLocationModal />}

      <Feed />
    </div>
  );
};
