// UserFollowingList.tsx
import React from "react";
import { Link } from "react-router-dom";
import Verified from "@mui/icons-material/Verified";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { FollowSection } from "../../profile/components/ProfileFollowSection/FollowSection";
import { User } from "../../../utils/GlobalInterface";
import { SeeAllFollowingStyled } from "./SeeAllFollowing.styled";

interface UserFollowingListProps {
  suggest: User;
}

export const AllFollowing: React.FC<UserFollowingListProps> = ({ suggest }) => {
  const default_pfp = process.env.REACT_APP_PFP;
  const followingList = useSelector((state: RootState) => state.user.following);

  return (
    <SeeAllFollowingStyled>
      <div className="meetContainer">
        <div className="subConnectFlex">
          <div
            style={{
              backgroundImage: `url(${
                suggest.profilePicture
                  ? suggest.profilePicture.imageURL
                  : default_pfp
              })`,
              border: "1px white solid",
            }}
            className="bgImg"
          ></div>
          <div className="followFlex">
            <div>
              <Link to={`/${suggest.username}`}>
                <h3>
                  {suggest.nickname}{" "}
                  {suggest.verifiedAccount && (
                    <Verified
                      sx={{ color: "#1da1f2", width: "20px", height: "20px" }}
                    />
                  )}
                </h3>
              </Link>
              <p className="usersAt">@{suggest.username}</p>
              <p>{suggest.bio}</p>
            </div>
            <FollowSection
              followingList={followingList}
              profileUser={suggest}
            />
          </div>
        </div>
      </div>
    </SeeAllFollowingStyled>
  );
};
