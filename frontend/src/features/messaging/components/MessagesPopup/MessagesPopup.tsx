import React, { useContext } from "react";

import "./MessagesPopup.css";
import {
  MessagingContext,
  MessagingContextType,
} from "../../context/MessagingContext";
import { MessagesBar } from "../MessagesBar/MessagesBar";

export const MessagesPopup: React.FC = () => {
  const { open, conversationOpen } = useContext(
    MessagingContext
  ) as MessagingContextType;

  return (
    <div className="messages-popup-container">
      <div
        className={`messages-popup ${
          open ? "messages-open" : "messages-closed"
        }`}
      >
        <MessagesBar />

        {open && (
          <div className="messages-popup-content">
            {conversationOpen ? (
              <>MessagingConversationComponent</>
            ) : (
              <>MessagingOverviewComponent</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
