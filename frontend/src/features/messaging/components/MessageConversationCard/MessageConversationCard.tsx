import React, { useEffect, useState } from "react";
import "./MessageConversationCard.css";
import { Conversation, User } from "../../../../utils/GlobalInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { generateConversationName } from "../../utils/utils";
import Verified from "@mui/icons-material/Verified";
import Circle from "@mui/icons-material/Circle";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { MessageConversationPicture } from "../MessageConversationPicture/MessageConversationPicture";
import { selectConversation } from "../../../../redux/Slices/MessagesSlice";

export const MessageConversationCard: React.FC<{
  conversation: Conversation;
}> = ({ conversation }) => {
  //
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch: AppDispatch = useDispatch();

  const [filteredConversationUsers, setFilteredConversationUsers] = useState<
    User[]
  >([]);
  const [optionsIcon, setOptionsIcon] = useState<boolean>(false);
  const [optionsColor, setOptionsColor] = useState<string>("#657786");

  const handleConversationClicked = () => {
    dispatch(selectConversation(conversation));
  };

  useEffect(() => {
    if (loggedIn) {
      setFilteredConversationUsers(() => {
        return conversation.conversationUsers.filter(
          (u) => u.userId !== loggedIn.userId
        );
      });
    }
  }, [loggedIn]);

  return (
    <div
      className="message-conversation-card"
      onClick={handleConversationClicked}
      onMouseOver={() => setOptionsIcon(true)}
      onMouseLeave={() => setOptionsIcon(false)}
    >
      <div className="message-conversation-card-user">
        <MessageConversationPicture
          users={
            conversation.conversationUsers.length > 2
              ? conversation.conversationUsers
              : filteredConversationUsers
          }
          conversationPicture={conversation.conversationPicture}
        />
        <div className="">
          <div className="message-conversation-card-info-bar">
            <div
              className={`message-conversation-card-name ${
                filteredConversationUsers.length < 2
                  ? " message-conversation-card-nickname"
                  : " message-conversation-card-group-name"
              }`}
            >
              {generateConversationName(
                filteredConversationUsers,
                conversation.conversationName
              )}
            </div>
            {filteredConversationUsers.length === 1 &&
              filteredConversationUsers[0].verifiedAccount && (
                <Verified
                  sx={{
                    width: "15px",
                    height: "15px",
                    color: "#1da1f2",
                  }}
                />
              )}
            {filteredConversationUsers.length === 1 && (
              <div className="message-conversation-card-text message-conversation-card-username">
                @{filteredConversationUsers[0].username}
              </div>
            )}
            <Circle
              sx={{
                fontSize: "3px",
                color: "#657786",
              }}
            />
            <p className="message-conversation-card-text">
              Sept 20{" "}
              {
                // todo after we finish messages
              }
            </p>
          </div>

          <div className="message-conversation-card-text message-conversation-card-content">
            Todo: after complete message
          </div>
        </div>
      </div>

      {optionsIcon && (
        <div
          className="message-conversation-card-options-wrapper"
          onMouseOver={() => setOptionsColor("#1da1f2")}
          onMouseLeave={() => setOptionsColor("#657786")}
        >
          <MoreHoriz
            sx={{
              fontSize: "20px",
              color: `${optionsIcon}`,
            }}
          />
        </div>
      )}
    </div>
  );
};
