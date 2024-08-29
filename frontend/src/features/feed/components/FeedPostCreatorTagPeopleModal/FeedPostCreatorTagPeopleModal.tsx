import React from "react";

import { Modal } from "../../../../components/Modal/Modal";
import { FeedPostCreatorTagPeopleModalTop } from "./FeedPostCreatorTagPeopleModalTop/FeedPostCreatorTagPeopleModalTop";

export const FeedPostCreatorTagPeopleModal: React.FC = () => {
  return (
    <Modal
      topContent={<FeedPostCreatorTagPeopleModalTop />}
      content={<>Content</>}
      bottomContent={<>Bottom content</>}
    />
  );
};
