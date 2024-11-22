import React, { useEffect, useState } from "react";

import "./MessageReactionContainer.css";
import { Message, Reaction } from "../../../../utils/GlobalInterface";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";
import { getEmojiImageByEmojiAscii } from "../../../../utils/EmojiUtils";

export const MessageReactionContainer: React.FC<{ message: Message }> = ({
  message,
}) => {
  const { reactions } = message;
  const { loggedIn } = useSelector((state: RootState) => state.user);

  const [groupedReactions, setGroupedReactions] = useState<
    Array<{ count: number; reaction: string; userIds: number[] }>
  >([]);

  const groupReactions = () => {
    let reactionMap = new Map<string, Reaction[]>();
    let reactionCountObj: Array<{
      count: number;
      reaction: string;
      userIds: number[];
    }> = [];

    for (let reaction of reactions) {
      if (!reactionMap.has(`${reaction.reaction}`)) {
        reactionMap.set(`${reaction.reaction}`, []);
      }

      let reactionList = reactionMap.get(`${reaction.reaction}`);
      if (reactionList) {
        reactionList.push(reaction);
        reactionMap.set(`${reaction.reaction}`, reactionList);
      }
    }

    reactionMap.forEach((value: Reaction[], key: string) => {
      let userIds = value.map((r) => r.reactionUser.userId);
      reactionCountObj.push({
        count: value.length,
        reaction: key,
        userIds,
      });
    });

    console.log(reactionCountObj);

    setGroupedReactions(reactionCountObj);
  };

  useEffect(() => {
    groupReactions();
  }, [reactions]);

  return (
    <div className="message-reaction-container">
      {loggedIn &&
        groupedReactions.map((reaction) => {
          return (
            <div
              className={`message-reaction ${
                reaction.userIds.includes(loggedIn.userId)
                  ? "message-reaction-outlined"
                  : ""
              }`}
            >
              <img
                className="message-reaction-emoji"
                src={getEmojiImageByEmojiAscii(reaction.reaction)}
                alt="Reaction emoji"
              />
              <p className="message-reaction-count">{reaction.count}</p>
            </div>
          );
        })}
    </div>
  );
};
