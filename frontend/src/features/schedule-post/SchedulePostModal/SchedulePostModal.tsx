import React from "react";

import { BottomlessModal } from "../../../components/BottomlessModal/BottomlessModal";
import { SchedulePostModalTopBar } from "../SchedulePostModalTopBar/SchedulePostModalTopBar";
import { SchedulePostModalContent } from "../SchedulePostModalContent/SchedulePostModalContent";

export const SchedulePostModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<SchedulePostModalTopBar />}
      content={<SchedulePostModalContent />}
    />
  );
};
