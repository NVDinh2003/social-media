import React from "react";

import "./MessagesBar.css";
import Circle from "@mui/icons-material/Circle";
import CreateMessageSVG from "../../../../components/SVGs/Messages/CreateMessageSVG";
import CloseMessageSVG from "../../../../components/SVGs/Messages/CloseMessageSVG";
import OpenMessageSVG from "../../../../components/SVGs/Messages/OpenMessageSVG";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { togglePopup } from "../../../../redux/Slices/MessagesSlice";
import { updateDisplayCreateMessage } from "../../../../redux/Slices/ModalSlice";

export const MessagesBar: React.FC = () => {
  //
  const messageState = useSelector((state: RootState) => state.message);
  const dispatch: AppDispatch = useDispatch();

  const createMessage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(updateDisplayCreateMessage());
  };

  const toggle = () => {
    dispatch(togglePopup());
  };

  return (
    <div
      className={`messages-bar${
        messageState.unreadMessages.length > 0 ? " unread-messages" : ""
      } ${messageState.popupOpen ? "message-bar-open" : "message-bar-closed"}`}
      onClick={toggle}
    >
      <div className="messages-bar-header-group">
        <h2 className="messages-bar-header">Messages</h2>
        {messageState.unreadMessages.length > 0 && (
          <Circle sx={{ color: "black", height: "10px", width: "10px" }} />
        )}
      </div>
      <div className="messages-bar-icon-group">
        <div className="messages-bar-icon-wrapper" onClick={createMessage}>
          <CreateMessageSVG height={20} width={20} color="none" />
        </div>

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
