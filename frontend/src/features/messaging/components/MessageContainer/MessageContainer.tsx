import React, { useEffect, useRef, useState } from "react";

import "./MessageContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { Circle, MoreHoriz } from "@mui/icons-material";
import {
  getDayOfWeek,
  lessThanDay,
  lessThanWeek,
  stringifyDate,
  stringifyTime,
} from "../../../../utils/DateUtils";
import { convertElementsToMessageText } from "../../../../utils/EmojiUtils";
import { MessageConversationImage } from "../MessageConversationImage/MessageConversationImage";
import { MessageMoreModal } from "../MessageMoreModal/MessageMoreModal";
import { MessageReactModal } from "../MessageReactModal/MessageReactModal";
import { Message } from "../../../../utils/GlobalInterface";
import { convertPostContentToElements } from "../../../post/utils/PostUtils";
import ReactSVG from "../../../../components/SVGs/Messages/ReactSVG";
import { MessageReactionContainer } from "../MessageReactionContainer/MessageReactionContainer";
import { reactToMessage } from "../../../../redux/Slices/MessagesSlice";

export const MessageContainer: React.FC<{
  message: Message;
  showSent: boolean;
}> = ({ message, showSent }) => {
  const { loggedIn, token } = useSelector((state: RootState) => state.user);
  const conversation = useSelector(
    (state: RootState) => state.message.conversation
  );
  const [messageHover, setMessageHover] = useState<boolean>(false);
  const [displayMore, setDisplayMore] = useState<boolean>(false);
  const [displayReact, setDisplayReact] = useState<boolean>(false);
  const [reactDistance, setReactDistance] = useState<{
    bottom: number;
    right: number;
  }>({ bottom: 0, right: 0 });
  const [moreDistance, setMoreDistance] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [flipMore, setFlipMore] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const reactRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const watcherRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (
      watcherRef &&
      watcherRef.current &&
      !watcherRef.current.contains(e.target)
    ) {
      setDisplayReact(false);
    }
  };

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

  const messageMore = () => {
    setDisplayMore(true);
    if (moreRef && moreRef.current) {
      const top = moreRef.current.getBoundingClientRect().top;
      const left = moreRef.current.getBoundingClientRect().left;
      if (
        window.innerHeight - moreRef.current.getBoundingClientRect().top <
        132
      ) {
        setFlipMore(true);
      } else {
        setFlipMore(false);
      }

      setMoreDistance({ top, left });
    }
  };

  const react = () => {
    setDisplayReact(true);
    console.log(displayReact);
    if (reactRef && reactRef.current) {
      const bottom =
        window.innerHeight - reactRef.current.getBoundingClientRect().top;
      const right =
        window.innerWidth -
        Math.round(reactRef.current.getBoundingClientRect().right);
      console.log(bottom, right);
      setReactDistance({ bottom, right });
    }
  };

  const messageReaction = (emoji: string) => {
    if (loggedIn && token) {
      dispatch(
        reactToMessage({
          user: loggedIn,
          message,
          reaction: emoji,
          token,
        })
      );
    }
    setDisplayReact(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [watcherRef]);

  return (
    <div
      className="message-container"
      ref={watcherRef}
      onMouseOver={() => setMessageHover(true)}
      onMouseLeave={() => setMessageHover(false)}
    >
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
            <div className="message-reaction-right-wrapper">
              {message.reactions.length > 0 && (
                <MessageReactionContainer message={message} />
              )}
            </div>
            <div className="message-subtitle">
              {sentAt()}
              {(showSent ||
                (message.seenBy && message.seenBy.length !== 0)) && (
                <Circle sx={{ fontSize: "4px", color: "#657786" }} />
              )}
              {showSent && message.seenBy.length === 0 && <>Sent</>}
              {conversation &&
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

            <div className="message-reaction-left-wrapper">
              {message.reactions.length > 0 && (
                <MessageReactionContainer message={message} />
              )}
            </div>

            <div className="message-subtitle message-subtitle-left">
              {message.sentBy.nickname}
              <Circle sx={{ fontSize: "4px", color: "#657786" }} />
              {sentAt()}
            </div>
          </div>
        )}
        {(messageHover || displayReact || displayMore) && (
          <div className="message-content-options">
            <div className="message-content-react-options">
              {displayReact && (
                <MessageReactModal
                  handleClick={messageReaction}
                  distance={reactDistance}
                  fromUser={usersMessage()}
                />
              )}
              <div
                className="message-content-option-wrapper"
                ref={reactRef}
                onClick={react}
                id="messageReact"
              >
                <ReactSVG height={20} width={20} color="#657786" />
              </div>
            </div>
            <div
              className="message-content-option-wrapper"
              ref={moreRef}
              onClick={messageMore}
              onMouseLeave={() => setDisplayMore(false)}
            >
              {displayMore && (
                <MessageMoreModal
                  distance={moreDistance}
                  fromUser={usersMessage()}
                  flipMore={flipMore}
                  handleCopyClicked={() => {}}
                  handleReportClicked={() => {}}
                  handleDeleteClicked={() => {}}
                  handleReplyClicked={() => {}}
                />
              )}
              <MoreHoriz
                sx={{ height: "20px", width: "20px", color: "#657786" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
