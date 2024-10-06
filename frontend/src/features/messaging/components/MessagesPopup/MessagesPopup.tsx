import React, { useContext, useEffect } from "react";

import "./MessagesPopup.css";
import {
  MessagingContext,
  MessagingContextType,
} from "../../context/MessagingContext";
import { MessagesBar } from "../MessagesBar/MessagesBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { loadConversations } from "../../../../redux/Slices/MessagesSlice";

export const MessagesPopup: React.FC = () => {
  //
  const userState = useSelector((state: RootState) => state.user);
  const messageState = useSelector((state: RootState) => state.message);

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
