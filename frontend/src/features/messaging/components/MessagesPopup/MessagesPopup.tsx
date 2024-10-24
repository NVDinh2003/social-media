import React, { useContext, useEffect, useState } from "react";

import "./MessagesPopup.css";
import {
  MessagingContext,
  MessagingContextType,
} from "../../context/MessagingContext";
import { MessagesBar } from "../MessagesBar/MessagesBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { loadConversations } from "../../../../redux/Slices/MessagesSlice";
import { MessageConversationCard } from "../MessageConversationCard/MessageConversationCard";
import { ConversationContainer } from "../ConversationContainer/ConversationContainer";
import { CreateMessageBar } from "../CreateMessageBar/CreateMessageBar";

export const MessagesPopup: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const messageState = useSelector((state: RootState) => state.message);
  const [height, setHeight] = useState<string>("50px");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userState.loggedIn && userState.token) {
      dispatch(
        loadConversations({
          userId: userState.loggedIn.userId,
          token: userState.token,
        })
      );
    }
  }, [userState.token, userState.loggedIn]);

  useEffect(() => {
    if (messageState.popupOpen) {
      setHeight("480px");
    } else {
      setHeight("50px");
    }
  }, [messageState.popupOpen]);

  return (
    <div className="messages-popup-container" style={{ height }}>
      <div className={`messages-popup`}>
        <MessagesBar />

        {messageState.popupOpen && (
          <div className="messages-popup-content">
            {messageState.conversationOpen && messageState.conversation ? (
              <ConversationContainer conversation={messageState.conversation} />
            ) : (
              <>
                {messageState.conversations.map((conversation) => {
                  return (
                    <MessageConversationCard conversation={conversation} />
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* input message area  */}
        {messageState.conversationOpen && messageState.popupOpen && (
          <CreateMessageBar />
        )}
      </div>
    </div>
  );
};
