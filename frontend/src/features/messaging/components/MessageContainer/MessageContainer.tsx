import React from "react";

import "./MessageContainer.css";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { Circle } from "@mui/icons-material";
import {
  getDayOfWeek,
  lessThanDay,
  lessThanWeek,
  stringifyDate,
  stringifyTime,
} from "../../../../utils/DateUtils";
import { convertElementsToMessageText } from "../../../../utils/EmojiUtils";
import { MessageConversationImage } from "../MessageConversationImage/MessageConversationImage";
import { Message } from "../../../../utils/GlobalInterface";
import { convertPostContentToElements } from "../../../post/utils/PostUtils";

export const MessageContainer: React.FC<{
  message: Message;
  showSent: boolean;
}> = ({ message, showSent }) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const conversation = useSelector(
    (state: RootState) => state.message.conversation
  );

  const usersMessage = () => {
    return message.sentBy.userId === loggedIn?.userId;
  };

  const sentAt = () => {
    const sentAtDate = new Date(message.sentAt);
    const time = stringifyTime(sentAtDate);

    if (lessThanDay(sentAtDate, new Date())) {
      return time;
    } else if (lessThanWeek(sentAtDate, new Date())) {
      const day = getDayOfWeek(sentAtDate);
      return `${day} ${time}`;
    } else {
      const fullDate = stringifyDate({
        month: sentAtDate.getMonth(),
        day: sentAtDate.getDate(),
        year: sentAtDate.getFullYear(),
      });

      return `${fullDate}, ${time}`;
    }
  };

  const textContent = (): JSX.Element[] => {
    let postContent = convertPostContentToElements(message.messageText, "post");
    let messageElements = convertElementsToMessageText(
      postContent,
      "container"
    );
    return messageElements;
  };

  return (
    <div className="message-container">
      <div
        className={`message-content-group ${
          usersMessage() ? "right-messages" : "left-messages"
        }`}
      >
        {usersMessage() ? (
          <div className="message-subtitle-right">
            {message.messageImage && (
              <MessageConversationImage message={message} />
            )}
            {message.messageText !== "" && (
              <div className="message message-blue">{textContent()}</div>
            )}

            <div className="message-subtitle">
              {sentAt()}
              {(showSent ||
                (message.seenBy && message.seenBy.length !== 0)) && (
                <Circle sx={{ fontSize: "4px", color: "#657786" }} />
              )}
              {showSent && <>Sent</>}
              {conversation &&
                conversation.conversationUsers &&
                conversation.conversationUsers.length > 2 &&
                message.seenBy &&
                message.seenBy.length > 0 && (
                  <>Seen by {message.seenBy.length} person</>
                )}
            </div>
          </div>
        ) : (
          <div>
            <div className="gray-message-group">
              <ProfilePicture user={message.sentBy} size={"40px"} />
              <div>
                {message.messageImage && (
                  <MessageConversationImage message={message} />
                )}
                {message.messageText !== "" && (
                  <div className="message message-gray">{textContent()}</div>
                )}
              </div>
            </div>
            <div className="message-subtitle message-subtitle-left">
              {message.sentBy.nickname}
              <Circle sx={{ fontSize: "4px", color: "#657786" }} />
              {sentAt()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
