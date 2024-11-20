import { MoreHoriz } from "@mui/icons-material";
import React, { useState } from "react";
import { mapReactionBar } from "../../../../utils/EmojiUtils";

import "./MessageReactModal.css";

interface MessageReactModalProps {
  handleClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  distance: { bottom: number; right: number };
}
export const MessageReactModal: React.FC<MessageReactModalProps> = ({
  handleClick,
  distance,
}) => {
  const reactionBarData = mapReactionBar();
  const [displayDropDown, setDisplayDropDown] = useState<boolean>(false);
  return (
    <div
      className={`message-react-modal ${
        displayDropDown ? "react-modal-more" : "react-modal-default"
      }`}
      style={{
        marginBottom: `${distance.bottom + 8}px`,
        marginLeft: `-${distance.right - 94}px`,
      }}
    >
      {!displayDropDown && (
        <>
          {reactionBarData.map((emoji) => {
            return (
              <div
                className="message-react-modal-option"
                id={emoji.emoji}
                onClick={handleClick}
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
