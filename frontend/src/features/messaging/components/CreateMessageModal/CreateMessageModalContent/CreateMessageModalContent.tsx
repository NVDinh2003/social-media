import React, { useContext, useState } from "react";

import "./CreateMessageModalContent.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/Store";
import { DiscoveryContext } from "../../../../discovery/context/DiscoveryContext";
import { DiscoveryContextType } from "../../../../discovery/context/Modals";
import ThinSearchSVG from "../../../../../components/SVGs/Messages/ThinSearchSVG";
import CreateGroupSVG from "../../../../../components/SVGs/Messages/CreateGroupSVG";
import { CreateMessageUserCard } from "../../CreateMessageUserCard/CreateMessageUserCard";

export const CreateMessageModalContent: React.FC = () => {
  //
  const messageState = useSelector((state: RootState) => state.message);
  const loggedInUser = useSelector((state: RootState) => state.user.loggedIn);
  const {
    updateSearchContent,
    searchForUsers,
    searchResultUsers,
    searchContent,
  } = useContext(DiscoveryContext) as DiscoveryContextType;

  const [searchActive, setSearchActive] = useState<boolean>(false);

  const searchForMessagingUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchContent(e.target.value);
    searchForUsers(e.target.value);
  };

  return (
    <div className="create-message-modal-content">
      <div className="create-message-modal-content-search">
        <ThinSearchSVG
          height={20}
          width={20}
          color={searchActive ? "#1da1f2" : "#657786"}
        />
        <input
          type="text"
          className="create-message-modal-content-search-input"
          placeholder="Search people"
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
          onChange={searchForMessagingUsers}
        />
      </div>

      <div className="create-message-modal-content-scroll-box">
        <div className="create-message-modal-content-selected-users">
          {messageState.conversationUsers.length < 1 ? (
            <div className="create-message-modal-content-create-group">
              <div className="create-message-modal-content-group-icon-wrapper">
                <CreateGroupSVG
                  height={20}
                  width={20}
                  color="rgb(29, 155, 240)"
                />
              </div>

              <h3 className="create-message-modal-content-group-text">
                Create Group
              </h3>
            </div>
          ) : (
            <div className="create-message-modal-content-user-list">
              {messageState.conversationUsers.map((user) => {
                return <>{user.nickname}</>;
              })}
            </div>
          )}
        </div>

        {searchContent ? (
          <div className="create-message-modal-content-search-users">
            {searchResultUsers.map((user) => {
              return (
                <div className="">
                  {user.nickname}@{user.username}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="create-message-modal-content-conversation-users">
            {messageState.conversations.map((conversation) => {
              let conversationUsers = loggedInUser
                ? conversation.conversationUsers.filter(
                    (user) => user.userId !== loggedInUser.userId
                  )
                : conversation.conversationUsers;

              return <CreateMessageUserCard users={conversationUsers} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
