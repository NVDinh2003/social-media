import React, { useEffect, useRef } from "react";

import "./ConversationContainer.css";
import { Conversation } from "../../../../utils/GlobalInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { ConversationUserInfo } from "../ConversationUserInfo/ConversationUserInfo";
import { filterConversationUsers } from "../../utils/utils";
import { MessageContainer } from "../MessageContainer/MessageContainer";

export const ConversationContainer: React.FC<{
  conversation: Conversation;
}> = ({ conversation }) => {
  //
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const messages = useSelector(
    (state: RootState) => state.message.conversation?.conversationMessage
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredConversationUsers = () => {
    if (loggedIn) {
      return filterConversationUsers(conversation.conversationUsers, loggedIn);
    }

    return conversation.conversationUsers;
  };

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages?.length]);

  return (
    <div className="conversation-container" ref={scrollRef}>
      <ConversationUserInfo user={filteredConversationUsers()[0]} />

      {conversation.conversationMessage.map((message) => {
        return <p>{message.messageText}</p>;
      })}

      <div className="conversation-messages">
        {conversation.conversationMessage.map((message, idx) => {
          const showSent = idx === conversation.conversationMessage.length - 1;
          return <MessageContainer message={message} showSent={showSent} />;
        })}
      </div>
      <div ref={scrollRef} className="conversation-container-bottom"></div>
    </div>
  );
};
