import React, { useContext, useEffect } from "react";
import "./CreateMentionPostModal.css";
import { DiscoveryContext } from "../../../discovery/context/DiscoveryContext";
import { DiscoveryContextType } from "../../../discovery/context/Modals";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { checkFollowing } from "../../../../services/UserService";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import Verified from "@mui/icons-material/Verified";
import FollowNotificationSVG from "../../../../components/SVGs/FollowNotificationSVG";

interface CreateMentionPostModalProps {
  content: string;
  userClicked: (username: string) => void;
}

export const CreateMentionPostModal: React.FC<CreateMentionPostModalProps> = ({
  content,
  userClicked,
}) => {
  //
  const { updateSearchContent, searchForUsers, searchResultUsers } = useContext(
    DiscoveryContext
  ) as DiscoveryContextType;
  const useState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    updateSearchContent(content);
    searchForUsers(content);
    console.log(content);
  }, [content]);

  return (
    <div className="create-mention-post-modal">
      {searchResultUsers.slice(0, 10).map((user) => {
        return (
          <div
            className="create-mention-post-user-card"
            onClick={() => userClicked(user.username)}
          >
            <div
              className={
                checkFollowing(useState.following, user)
                  ? "create-mention-post-user-pfp-wrapper"
                  : ""
              }
            >
              <ProfilePicture user={user} size={"40"} />
            </div>

            <div className="create-mention-post-user-info">
              <div className="create-mention-post-user-nickname-bar">
                <h2 className="create-mention-post-user-nickname">
                  {user.nickname}
                </h2>
                {user.verifiedAccount && (
                  <Verified
                    sx={{ color: "#1da1f2", width: "20px", height: "20px" }}
                  />
                )}
                {user.organization && (
                  <img
                    src={user.organization.imageURL}
                    alt="user organization"
                    className="create-mention-post-user-organization"
                  />
                )}
              </div>

              <p className="create-mention-post-text">@{user.username}</p>
              {checkFollowing(useState.following, user) && (
                <span className="create-mention-post-text">
                  <FollowNotificationSVG
                    height={12}
                    width={12}
                    color="#aab8c2"
                  />{" "}
                  Following
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
