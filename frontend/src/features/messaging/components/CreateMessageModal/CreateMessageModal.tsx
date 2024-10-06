import React from "react";

import "./CreateMessageModal.css";
import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { CreateMessageModalTop } from "./CreateMessageModalTop/CreateMessageModalTop";
import { CreateMessageModalContent } from "./CreateMessageModalContent/CreateMessageModalContent";
import DiscoveryProvider from "../../../discovery/context/DiscoveryContext";

export const CreateMessageModal: React.FC = () => {
  return (
    <BottomlessModal
      topBar={<CreateMessageModalTop />}
      content={
        <DiscoveryProvider>
          <CreateMessageModalContent />
        </DiscoveryProvider>
      }
    />
  );
};
