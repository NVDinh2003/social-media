import React from "react";

import "./CreateMessageModalContent.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/Store";

export const CreateMessageModalContent: React.FC = () => {
  //
  const messageState = useSelector((state: RootState) => state.message);

  return (
    <div className="create-message-modal-content">
      <div className="create-message-modal-content-search">Search Bar</div>

      <div className="create-message-modal-content-scroll-box">
        <div className="create-message-modal-content-selected-users">
          Selected users
        </div>

        <div className="create-message-modal-content-conversation-users">
          {messageState.conversations.map((conversation) => {
            return (
              <div className="">
                {conversation.conversationUsers.map((user) => (
                  <>{user.nickname}</>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
