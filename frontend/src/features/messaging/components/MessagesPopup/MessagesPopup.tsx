import React, { useContext } from "react";

import "./MessagesPopup.css";
import {
  MessagingContext,
  MessagingContextType,
} from "../../context/MessagingContext";
import { MessagesBar } from "../MessagesBar/MessagesBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";

export const MessagesPopup: React.FC = () => {
  //
  const messageState = useSelector((state: RootState) => state.message);

  return (
    <div className="messages-popup-container">
      <div
        className={`messages-popup ${
          messageState.popupOpen ? "messages-open" : "messages-closed"
        }`}
      >
        <MessagesBar />

        {messageState.popupOpen && (
          <div className="messages-popup-content">
            {messageState.conversationOpen ? (
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
