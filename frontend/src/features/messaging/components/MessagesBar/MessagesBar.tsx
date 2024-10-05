import React, { useContext } from "react";

import "./MessagesBar.css";
import {
  MessagingContext,
  MessagingContextType,
} from "../../context/MessagingContext";
import Circle from "@mui/icons-material/Circle";
import CreateMessageSVG from "../../../../components/SVGs/Messages/CreateMessageSVG";
import CloseMessageSVG from "../../../../components/SVGs/Messages/CloseMessageSVG";
import OpenMessageSVG from "../../../../components/SVGs/Messages/OpenMessageSVG";

export const MessagesBar: React.FC = () => {
  //

  const { open, unreadMessages, togglePopup } = useContext(
    MessagingContext
  ) as MessagingContextType;

  return (
    <div
      className={`messages-bar${
        unreadMessages.length > 0 ? " unread-messages" : ""
      }`}
      onClick={togglePopup}
    >
      <div className="messages-bar-header-group">
        <h2 className="messages-bar-header">Messages</h2>
        {unreadMessages.length > 0 && (
          <Circle sx={{ color: "black", height: "10px", width: "10px" }} />
        )}
      </div>
      <div className="messages-bar-icon-group">
        <div className="messages-bar-icon-wrapper">
          <CreateMessageSVG height={20} width={20} color="none" />
        </div>

        <div className="messages-bar-icon-wrapper">
          {open ? (
            <CloseMessageSVG height={20} width={20} />
          ) : (
            <OpenMessageSVG height={20} width={20} />
          )}
        </div>
      </div>
    </div>
  );
};
