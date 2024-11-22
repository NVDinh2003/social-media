import { MoreHoriz } from "@mui/icons-material";
import React, { useState } from "react";
import { mapReactionBar } from "../../../../utils/EmojiUtils";

import "./MessageReactModal.css";

interface MessageReactModalProps {
  handleClick: (emoji: string) => void;
  distance: { bottom: number; right: number };
  fromUser: boolean;
}
export const MessageReactModal: React.FC<MessageReactModalProps> = ({
  handleClick,
  distance,
  fromUser,
}) => {
  const reactionBarData = mapReactionBar();
  const [displayDropDown, setDisplayDropDown] = useState<boolean>(false);

  const modalStyle = () => {
    if (fromUser) {
      return {
        marginBottom: `${distance.bottom + 8}px`,
        marginLeft: `-${distance.right - 94}px`,
      };
    } else {
      return {
        marginBottom: `${distance.bottom + 8}px`,
        marginLeft: `-${distance.right + 140}px`,
      };
    }
  };

  const emojiClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleClick(e.currentTarget.id);
  };

  return (
    <div
      className={`message-react-modal ${
        displayDropDown ? "react-modal-more" : "react-modal-default"
      }`}
      style={modalStyle()}
    >
      {!displayDropDown && (
        <>
          {reactionBarData.map((emoji) => {
            return (
              <div
                className="message-react-modal-option"
                id={emoji.emoji}
                onClick={emojiClicked}
              >
                <img
                  className="message-react-moda-option-emoji"
                  src={emoji.img}
                />
              </div>
            );
          })}
          <div
            className="message-react-modal-more-option"
            onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
            onClick={() => setDisplayDropDown(true)}
          >
            <MoreHoriz
              sx={{ height: "24px", width: "24px", color: "#657786" }}
            />
          </div>
        </>
      )}
    </div>
  );
};
