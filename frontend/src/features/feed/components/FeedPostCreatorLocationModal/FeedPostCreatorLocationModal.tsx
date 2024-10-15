import React from "react";

import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { LocationModalTopBar } from "./LocationModalTopBar/LocationModalTopBar";
import { LocationModalContent } from "./LocationModalContent/LocationModalContent";

export const FeedPostCreatorLocationModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<LocationModalTopBar />}
      content={<LocationModalContent />}
    />
  );
};
