import React, { useEffect, useRef, useState } from "react";

import "./CreateMessageBar.css";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import { ArrowForwardIos } from "@mui/icons-material";
import { convertPostContentToElements } from "../../../post/utils/PostUtils";
import { convertElementsToMessageText } from "../../../../utils/EmojiUtils";
import SendMessageSVG from "../../../../components/SVGs/Messages/SendMessageSVG";

export const CreateMessageBar: React.FC = () => {
  //
  const [showActions, setShowActions] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textContent = (): JSX.Element[] => {
    let postContent = convertPostContentToElements(messageContent, "post");
    let messageElement = convertElementsToMessageText(postContent);
    return messageElement;
  };

  const focusOntext = () => {
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
  };

  const calculateLineHeight = () => {
    if (textAreaRef && textAreaRef.current) {
      let lineHeight = 24;
      textAreaRef.current.style.lineHeight = `${lineHeight}px`;
      textAreaRef.current.style.height = "24px";

      let lineNumber = textAreaRef.current.scrollHeight / lineHeight;
      textAreaRef.current.style.height = lineNumber * lineHeight + "px";
    }
  };

  //   const handleTextChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //     calculateLineHeight();
  //     setMessageContent((e.target as HTMLTextAreaElement).value); // Chuyển đổi kiểu để truy cập thuộc tính value
  //   };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    calculateLineHeight();
    setMessageContent(e.target.value);
  };

  useEffect(() => {
    calculateLineHeight();
  }, [showActions]);

  return (
    <div className="create-message-bar">
      <div className="create-message-bar-bg">
        {showActions ? (
          <div className="create-message-bar-action-wrapper">
            <div className="create-message-bar-icon-wrapper">
              <MediaSVG height={20} width={20} color="rgb(29, 155, 240)" />
            </div>
            <div className="create-message-bar-icon-wrapper">
              <GIFSVG height={20} width={20} color="rgb(29, 155, 240)" />
            </div>
            <div className="create-message-bar-icon-wrapper">
              <EmojiSVG height={20} width={20} color="rgb(29, 155, 240)" />
            </div>
          </div>
        ) : (
          <div className="create-message-bar-icon-wrapper">
            <ArrowForwardIos
              sx={{ height: "20px", width: "20px", color: "rgb(29, 155, 240)" }}
            />
          </div>
        )}
        {/* Message text area  */}
        <div className="create-message-bar-text-area">
          {messageContent !== "" && (
            <div
              className="create-message-bar-text-area-content"
              onClick={focusOntext}
            >
              {textContent()}
            </div>
          )}

          {/* text area  */}
          <textarea
            className={`create-message-bar-text-area-input ${
              showActions
                ? "create-message-bar-text-input-deactive"
                : "create-message-bar-text-input-active"
            }`}
            placeholder="Bắt đầu chat nào !"
            ref={textAreaRef}
            onChange={handleTextChange}
            onFocus={() => setShowActions(false)}
            onBlur={() => setShowActions(true)}
            value={messageContent}
          />
        </div>
        <div
          className={`create-message-bar-send-icon ${
            messageContent !== "" ? "send-icon-active" : ""
          }`}
        >
          <SendMessageSVG
            height={20}
            width={20}
            color={
              messageContent !== ""
                ? "rgb(29, 155, 240)"
                : "rgba(29, 155, 240, .5)"
            }
          />
        </div>
      </div>
    </div>
  );
};
