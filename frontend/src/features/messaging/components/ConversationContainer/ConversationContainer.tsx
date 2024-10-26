import React from "react";

import "./ConversationContainer.css";
import { Conversation } from "../../../../utils/GlobalInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { ConversationUserInfo } from "../ConversationUserInfo/ConversationUserInfo";
import { filterConversationUsers } from "../../utils/utils";

export const ConversationContainer: React.FC<{
  conversation: Conversation;
}> = ({ conversation }) => {
  //
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const filteredConversationUsers = () => {
    if (loggedIn) {
      return filterConversationUsers(conversation.conversationUsers, loggedIn);
    }

    return conversation.conversationUsers;
  };

  return (
    <div className="conversation-container">
      <ConversationUserInfo user={filteredConversationUsers()[0]} />

      {conversation.conversationMessage.map((message) => {
        return <p>{message.messageText}</p>;
      })}
    </div>
  );
};
