import React from "react";
import "./CreateMessageSelectedUser.css";
import { ConversationUser } from "../../../../utils/GlobalInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateConversationUsers } from "../../../../redux/Slices/MessagesSlice";
import Close from "@mui/icons-material/Close";

export const CreateMessageSelectedUser: React.FC<{
  user: ConversationUser;
}> = ({ user }) => {
  //
  const defaultAvatar = process.env.REACT_APP_PFP;
  const conversationUsers = useSelector(
    (state: RootState) => state.message.conversationUsers
  );
  const dispatch: AppDispatch = useDispatch();

  const removeUser = () => {
    dispatch(
      updateConversationUsers(
        conversationUsers.filter(
          (u: ConversationUser) => u.userId !== user.userId
        )
      )
    );
  };

  return (
    <div className="create-message-selected-user" onClick={removeUser}>
      <div className="create-message-selected-user-left-container">
        <img
          src={user.pfp !== "" ? user.pfp : defaultAvatar}
          alt="conversation user pfp"
          className="create-message-selected-user-pfp"
        />
        <p className="create-message-selected-user-name">{user.nickname}</p>
      </div>

      <Close
        sx={{ width: "18px", height: "18px", color: "rgba(29,155,240)" }}
      />
    </div>
  );
};
