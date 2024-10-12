import React from "react";
import "./MessageConversationPicture.css";
import { User } from "../../../../utils/GlobalInterface";

export const MessageConversationPicture: React.FC<{
  users: User[];
  conversationPicture?: string;
}> = ({ users, conversationPicture }) => {
  //
  const defaultPfp = process.env.REACT_APP_PFP;

  const generatePfp = (user: User): JSX.Element => {
    return user.profilePicture ? (
      <div
        className="message-conversation-picture-pfp"
        style={{ backgroundImage: `url("${user.profilePicture.imageURL}")` }}
        key={`${user.userId}-converstion-pfp`}
      ></div>
    ) : (
      <div
        className="message-conversation-picture-pfp"
        style={{ backgroundImage: `url("${defaultPfp}")` }}
        key={`${user.userId}-converstion-pfp`}
      ></div>
    );
  };

  return (
    <div className="message-conversation-picture">
      {conversationPicture ? (
        <div
          className="message-conversation-picture-pfp"
          style={{ backgroundImage: `url("${conversationPicture}")` }}
        ></div>
      ) : (
        users.slice(0, 4).map((user) => generatePfp(user))
      )}
    </div>
  );
};
