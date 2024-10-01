import React from "react";

import "./MentionsLearnMoreModal.css";
import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { MentionLearnMoreModalTop } from "../MentionLearnMoreModalTop/MentionLearnMoreModalTop";
import { MentionLearnMoreModalContent } from "../MentionLearnMoreModalContent/MentionLearnMoreModalContent";

export const MentionsLearnMoreModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<MentionLearnMoreModalTop />}
      content={<MentionLearnMoreModalContent />}
    />
  );
};
