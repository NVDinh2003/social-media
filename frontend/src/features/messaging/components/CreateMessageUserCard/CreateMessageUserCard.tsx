import React, { useState } from "react";
import "./CreateMessageUserCard.css";
import { ConversationUser, User } from "../../../../utils/GlobalInterface";
import FollowNotificationSVG from "../../../../components/SVGs/FollowNotificationSVG";
import { CheckSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { checkFollowing } from "../../../../services/UserService";
import {
  openConversation,
  togglePopup,
  updateConversationUsers,
} from "../../../../redux/Slices/MessagesSlice";
import { updateDisplayCreateMessage } from "../../../../redux/Slices/ModalSlice";

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

  const [selected, setSelected] = useState<boolean>(false);

  const generateFollowingText = () => {
    if (users.length === 1) {
      let user = users[0];
      let loggedInUserFollowsUser = checkFollowing(userState.following, user);
      let userFollowsLoggedInUser = checkFollowing(userState.followers, user);

      if (!loggedInUserFollowsUser && !userFollowsLoggedInUser) return "";
      if (!loggedInUserFollowsUser && userFollowsLoggedInUser)
        return "Follows you";
      if (loggedInUserFollowsUser && !userFollowsLoggedInUser)
        return "Following";
      if (loggedInUserFollowsUser && userFollowsLoggedInUser)
        return "You follow each other";
    } else return "";
  };

  const generateNicknameText = () => {
    if (conversationName) return conversationName;
    if (users.length === 1) return users[0].nickname;
    else if (users.length === 2) {
      return `${users[0].nickname}, ${users[1].nickname}`;
    } else if (users.length > 2) {
      return `${users[0].nickname}, ${users[1].nickname} and ${
        users.length - 2
      } others`;
    }
  };

  const generatePfp = (user: User): JSX.Element => {
    return user.profilePicture ? (
      <div
        className="create-message-user-card-pfp"
        style={{ backgroundImage: `url("${user.profilePicture.imageURL}")` }}
        key={`${user.userId}-converstion-pfp`}
      ></div>
    ) : (
      <div
        className="create-message-user-card-pfp"
        style={{ backgroundImage: `url("${default_pfp}")` }}
        key={`${user.userId}-converstion-pfp`}
      ></div>
    );
  };

  const handleConversationClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (users.length === 1) {
      setSelected((selected) => {
        return !selected;
      });
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
    } else {
      let cUsers: ConversationUser[] = users.map((user: User) => {
        return {
          userId: user.userId,
          nickname: user.nickname,
          pfp: user.profilePicture ? user.profilePicture.imageURL : "",
        };
      });

      dispatch(openConversation(cUsers));
      dispatch(updateDisplayCreateMessage());
      dispatch(togglePopup());
    }
  };

  return (
    <div
      className="create-message-user-card"
      onClick={handleConversationClicked}
    >
      <div className="create-message-user-card-left-container">
        <div className="create-message-user-card-pfps-container">
          {conversationPicture ? (
            <div
              className="create-message-user-card-pfp"
              style={{ backgroundImage: `url("${conversationPicture}")` }}
            ></div>
          ) : (
            users.slice(0, 4).map((user) => generatePfp(user))
          )}
        </div>

        <div>
          <h3 className="create-message-user-card-info-nickname">
            {generateNicknameText()}
          </h3>
          <p className="create-message-user-card-info-text">
            {users.length === 1
              ? `@${users[0].username}`
              : `${users.length} people`}
          </p>

          {generateFollowingText() && (
            <div className="create-message-user-card-following-container">
              <FollowNotificationSVG
                height={12}
                width={12}
                color="rgba(113,118,123)"
              />
              <p className="create-message-user-card-info-text">
                {generateFollowingText()}
              </p>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <CheckSharp sx={{ height: "18px", width: "18px", color: "#1da1f2" }} />
      )}
    </div>
  );
};
