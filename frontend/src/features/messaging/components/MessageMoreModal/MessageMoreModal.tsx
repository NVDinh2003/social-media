import React from "react";

import "./MessageMoreModal.css";
import MessageReplySVG from "../../../../components/SVGs/Messages/MessageReplySVG";
import CopyMessageSVG from "../../../../components/SVGs/Messages/CopyMessageSVG";
import DeleteMessageSVG from "../../../../components/SVGs/Messages/DeleteMessageSVG";
interface MessageMoreModalProps {
  distance: { top: number; left: number };
  handleReplyClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleCopyClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDeleteClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const MessageMoreModal: React.FC<MessageMoreModalProps> = ({
  distance,
  handleReplyClicked,
  handleCopyClicked,
  handleDeleteClicked,
}) => {
  return (
    <div
      className="message-more-modal"
      style={{
        marginTop: `${distance.top}px`,
        marginLeft: `${distance.left}px`,
      }}
    >
      <div
        className="message-more-modal-option-group"
        onClick={handleReplyClicked}
      >
        <MessageReplySVG height={20} width={20} color="black" />
        Reply
      </div>
      <div
        className="message-more-modal-option-group"
        onClick={handleCopyClicked}
      >
        <CopyMessageSVG height={20} width={20} color="black" />
        Copy message
      </div>
      <div
        className="message-more-modal-option-group"
        onClick={handleDeleteClicked}
      >
        <DeleteMessageSVG height={20} width={20} color="black" />
        Delete for you
      </div>
    </div>
  );
};
