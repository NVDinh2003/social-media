import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { FeedPostCreatorEditImageModal } from "../../features/feed/components/FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";
import { FeedPostCreatorGifModal } from "../../features/feed/components/FeedPostCreatorGifModal/FeedPostCreatorGifModal";
import { SchedulePostModal } from "../../features/schedule-post/SchedulePostModal/SchedulePostModal";
import { CreateReply } from "../../features/post/components/CreateReply/CreateReply";
import { MentionsLearnMoreModal } from "../../features/notification/components/MentionNotification/MentionsLearnMoreModal/MentionsLearnMoreModal";
import { CreateMessageModal } from "../../features/messaging/components/CreateMessageModal/CreateMessageModal";
import { FeedPostCreatorLocationModal } from "../../features/feed/components/FeedPostCreatorLocationModal/FeedPostCreatorLocationModal";

export default function ModalContainer() {
  const displayEditImageModal = useSelector(
    (state: RootState) => state.modal.displayEditPostImage
  );
  const displayTagPeopleModal = useSelector(
    (state: RootState) => state.modal.displayTagPeople
  );
  const displatGifModal = useSelector(
    (state: RootState) => state.modal.displayGif
  );
  const displayScheduleModal = useSelector(
    (state: RootState) => state.modal.displaySchedule
  );
  const displayCreateReply = useSelector(
    (state: RootState) => state.modal.displayCreateReply
  );
  const displatMentionLearnMore = useSelector(
    (state: RootState) => state.modal.displayMentionLearnMore
  );
  const displayCreateMessage = useSelector(
    (state: RootState) => state.modal.displayCreateMessage
  );
  const displayLocationModal = useSelector(
    (state: RootState) => state.modal.displayLocation
  );

  return (
    <>
      {displayEditImageModal && <FeedPostCreatorEditImageModal />}
      {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
      {displatGifModal && <FeedPostCreatorGifModal />}
      {displayScheduleModal && <SchedulePostModal />}
      {displayLocationModal && <FeedPostCreatorLocationModal />}
      {displayCreateReply && <CreateReply />}
      {displatMentionLearnMore && <MentionsLearnMoreModal />}
      {displayCreateMessage && <CreateMessageModal />}
    </>
  );
}
