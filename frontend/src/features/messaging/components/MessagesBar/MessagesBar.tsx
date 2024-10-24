import React from "react";

import "./MessagesBar.css";
import Circle from "@mui/icons-material/Circle";
import CreateMessageSVG from "../../../../components/SVGs/Messages/CreateMessageSVG";
import CloseMessageSVG from "../../../../components/SVGs/Messages/CloseMessageSVG";
import OpenMessageSVG from "../../../../components/SVGs/Messages/OpenMessageSVG";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  selectConversation,
  togglePopup,
} from "../../../../redux/Slices/MessagesSlice";
import { updateDisplayCreateMessage } from "../../../../redux/Slices/ModalSlice";
import {
  filterConversationUsers,
  generateConversationName,
} from "../../utils/utils";
import ArrowBack from "@mui/icons-material/ArrowBack";

export const MessagesBar: React.FC = () => {
  //
  const messageState = useSelector((state: RootState) => state.message);
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch: AppDispatch = useDispatch();

  const createMessage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(updateDisplayCreateMessage());
  };

  const toggle = () => {
    dispatch(togglePopup());
  };

  const closeConversation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(selectConversation(undefined));
  };

  // tạo tên conversation - tạo tên cuộc trò chuyện bằng tên người kia (loại bỏ tên mình ra)
  const conversationName = (): string => {
    if (loggedIn && messageState.conversation) {
      let filteredUsers = filterConversationUsers(
        messageState.conversation.conversationUsers,
        loggedIn
      );
      return generateConversationName(
        filteredUsers,
        messageState.conversation.conversationName
      );
    }
    return "";
  };

  return (
    <div
      className={`messages-bar${
        messageState.unreadMessages.length > 0 ? " unread-messages" : ""
      } ${messageState.popupOpen ? "message-bar-open" : "message-bar-closed"}`}
      onClick={toggle}
    >
      {messageState.conversation ? (
        <div className="messages-bar-header-group">
          <div
            className="messages-bar-icon-wrapper"
            onClick={closeConversation}
          >
            <ArrowBack
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
          </div>

          <div className="messages-bar-conversation-name">
            <h2 className="messages-bar-header">{conversationName()}</h2>
            {messageState.conversation.conversationUsers.length === 2 &&
              loggedIn && (
                <p className="messages-bar-username">
                  @
                  {
                    filterConversationUsers(
                      messageState.conversation.conversationUsers,
                      loggedIn
                    )[0].username
                  }
                </p>
              )}
          </div>
        </div>
      ) : (
        <div className="messages-bar-header-group">
          <h2 className="messages-bar-header">Messages</h2>
          {messageState.unreadMessages.length > 0 && (
            <Circle sx={{ color: "black", height: "10px", width: "10px" }} />
          )}
        </div>
      )}
      <div className="messages-bar-icon-group">
        {!messageState.conversation && (
          <div className="messages-bar-icon-wrapper" onClick={createMessage}>
            <CreateMessageSVG height={20} width={20} color="none" />
          </div>
        )}

        <div className="messages-bar-icon-wrapper">
          {messageState.popupOpen ? (
            <CloseMessageSVG height={20} width={20} />
          ) : (
            <OpenMessageSVG height={20} width={20} />
          )}
        </div>
      </div>
    </div>
  );
};
