import React from "react";

import "./MessageMoreModal.css";
import MessageReplySVG from "../../../../components/SVGs/Messages/MessageReplySVG";
import CopyMessageSVG from "../../../../components/SVGs/Messages/CopyMessageSVG";
import DeleteMessageSVG from "../../../../components/SVGs/Messages/DeleteMessageSVG";
import ReportMessageSVG from "../../../../components/SVGs/Messages/ReportMessageSVG";
interface MessageMoreModalProps {
  distance: { top: number; left: number };
  fromUser: boolean;
  flipMore: boolean;
  handleReplyClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleReportClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleCopyClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDeleteClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const MessageMoreModal: React.FC<MessageMoreModalProps> = ({
  distance,
  fromUser,
  flipMore,
  handleReplyClicked,
  handleReportClicked,
  handleCopyClicked,
  handleDeleteClicked,
}) => {
  //
  const modalStyle = () => {
    if (fromUser) {
      return {
        marginTop: flipMore ? `${distance.top - 132}px` : `${distance.top}px`,
        marginLeft: `${distance.left}px`,
      };
    } else {
      return {
        marginTop: flipMore ? `${distance.top - 140}px` : `${distance.top}px`,
        marginLeft: `${distance.left - 130}px`,
      };
    }
  };

  return (
    <div className="message-more-modal" style={modalStyle()}>
      <div
        className="message-more-modal-option-group"
        onClick={handleReplyClicked}
      >
        <MessageReplySVG height={20} width={20} color="black" />
        Reply
      </div>

      {!fromUser && (
        <div
          className="message-more-modal-option-group"
          onClick={handleReportClicked}
        >
          <ReportMessageSVG height={20} width={20} color="black" />
          Report message
        </div>
      )}

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
