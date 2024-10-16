import React from "react";

import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { LocationModalTopBar } from "./LocationModalTopBar/LocationModalTopBar";
import { LocationModalContent } from "./LocationModalContent/LocationModalContent";

export const FeedPostCreatorLocationModal: React.FC = () => {
  const [dispatchLocationDetail, setDispatchLocationDetail] = React.useState<
    () => void
  >(() => {});

  return (
    <BottomlessModal
      topBar={<LocationModalTopBar onConfirm={dispatchLocationDetail} />}
      content={
        <LocationModalContent
          setDispatchLocationDetail={setDispatchLocationDetail}
        />
      }
    />
  );
};
