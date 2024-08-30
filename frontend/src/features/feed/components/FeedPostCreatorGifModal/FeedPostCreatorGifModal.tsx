import React from "react";

import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { FeedPostCreatorGifModalTop } from "./FeedPostCreatorGifModalTop/FeedPostCreatorGifModalTop";

export const FeedPostCreatorGifModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<FeedPostCreatorGifModalTop />}
      content={<>Content</>}
    />
  );
};
