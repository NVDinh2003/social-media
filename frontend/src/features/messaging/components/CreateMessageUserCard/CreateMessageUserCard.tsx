import React from "react";
import "./CreateMessageUserCard.css";
import { ConversationUser, User } from "../../../../utils/GlobalInterface";
import FollowNotificationSVG from "../../../../components/SVGs/FollowNotificationSVG";
import { CheckSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import {
  openConversation,
  updateConversationUsers,
} from "../../../../redux/Slices/MessagesSlice";
import { updateDisplayCreateMessage } from "../../../../redux/Slices/ModalSlice";
import Verified from "@mui/icons-material/Verified";
import {
  generateConversationName,
  generateFollowingText,
} from "../../utils/utils";
import { MessageConversationPicture } from "../MessageConversationPicture/MessageConversationPicture";

interface CreateMessageUserCardProps {
  users: User[];
  conversationName?: string;
  conversationPicture?: string;
}

export const CreateMessageUserCard: React.FC<CreateMessageUserCardProps> = ({
  users,
  conversationName,
  conversationPicture,
}) => {
  //
  const default_pfp = process.env.REACT_APP_PFP;
  const userState = useSelector((state: RootState) => state.user);
  const messageState = useSelector((state: RootState) => state.message);
  const dispatch: AppDispatch = useDispatch();

  const selected = () => {
    return (
      users.length === 1 &&
      messageState.conversationUsers.some(
        (u: ConversationUser) => u.userId === users[0].userId
      )
    );
  };

  const disabled = () => {
    if (messageState.conversationUsers.length > 0 && users.length > 1)
      return true;

    if (messageState.createGroup && users.length > 1) return true;

    return false;
  };

  const handleConversationClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (users.length === 1) {
      let currentConversationUsers = JSON.parse(
        JSON.stringify(messageState.conversationUsers)
      );
      if (
        currentConversationUsers.some(
          (u: ConversationUser) => u.userId === users[0].userId
        )
      ) {
        currentConversationUsers = currentConversationUsers.filter(
          (u: ConversationUser) => u.userId !== users[0].userId
        );
      } else {
        currentConversationUsers.push({
          userId: users[0].userId,
          nickname: users[0].nickname,
          pfp: users[0].profilePicture ? users[0].profilePicture.imageURL : "",
        });
      }

      dispatch(updateConversationUsers(currentConversationUsers));
    } else if (users.length > 1 && !disabled()) {
      let cUsers: ConversationUser[] = users.map((user: User) => {
        return {
          userId: user.userId,
          nickname: user.nickname,
          pfp: user.profilePicture ? user.profilePicture.imageURL : "",
        };
      });

      dispatch(updateDisplayCreateMessage());

      if (userState.loggedIn && userState.token) {
        cUsers.push({
          userId: userState.loggedIn.userId,
          nickname: userState.loggedIn.nickname,
          pfp: userState.loggedIn.profilePicture
            ? userState.loggedIn.profilePicture.imageURL
            : "",
        });

        dispatch(
          openConversation({
            token: userState.token,
            conversationUsers: cUsers,
          })
        );
      }
    }
  };

  return (
    <div
      className={`create-message-user-card ${
        disabled()
          ? "create-message-user-card-disabled"
          : "create-message-user-card-active"
      }`}
      onClick={handleConversationClicked}
    >
      <div className="create-message-user-card-left-container">
        <MessageConversationPicture
          users={users}
          conversationPicture={conversationPicture}
        />

        <div>
          <div className="create-message-user-card-info-nickname">
            {generateConversationName(users, conversationName)}
            {users.length === 1 && users[0].verifiedAccount && (
              <Verified
                sx={{ width: "15px", height: "15px", color: "#1da1f2" }}
              />
            )}
          </div>
          <p className="create-message-user-card-info-text">
            {users.length === 1
              ? `@${users[0].username}`
              : `${users.length} people`}
          </p>

          {generateFollowingText(
            users,
            userState.following,
            userState.followers
          ) && (
            <div className="create-message-user-card-following-container">
              <FollowNotificationSVG
                height={12}
                width={12}
                color="rgba(113,118,123)"
              />
              <p className="create-message-user-card-info-text">
                {generateFollowingText(
                  users,
                  userState.following,
                  userState.followers
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {selected() && (
        <CheckSharp sx={{ height: "18px", width: "18px", color: "#1da1f2" }} />
      )}
    </div>
  );
};
