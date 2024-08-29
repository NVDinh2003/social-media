import React from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { FeedPostCreatorEditImageModalTop } from "./FeedPostCreatorEditImageModalTop/FeedPostCreatorEditImageModalTop";

export const FeedPostCreatorEditImageModal: React.FC = () => {
  return (
    <Modal
      topContent={<FeedPostCreatorEditImageModalTop />}
      content={<>Content</>}
      bottomContent={<>Bottom content</>}
    />
  );
};
