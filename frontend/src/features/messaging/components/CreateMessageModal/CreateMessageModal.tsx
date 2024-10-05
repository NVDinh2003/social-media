import React from "react";

import "./CreateMessageModal.css";
import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { CreateMessageModalTop } from "./CreateMessageModalTop/CreateMessageModalTop";

export const CreateMessageModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<CreateMessageModalTop />}
      content={<>Create message conten</>}
    />
  );
};
