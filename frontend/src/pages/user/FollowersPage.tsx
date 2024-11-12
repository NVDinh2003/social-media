// FollowersPage.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../redux/Store";
import { getFollowers } from "../../services/UserService";
import { FollowHeader } from "../../features/user/FollowHeader/FollowHeader";
import { AllFollowers } from "../../features/user/UserFollowers/AllFollowers";
import { Nothing } from "../../components/Nothing/Nothing";
import { User } from "../../utils/GlobalInterface";
import "./FollowersAndFollowingPage.css";

export const FollowersPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const currentUserLoggedIn = useSelector(
    (state: RootState) => state.user.loggedIn
  );
  const userLoggedInFollowersList = useSelector(
    (state: RootState) => state.user.followers
  );
  const { username } = useParams();
  const [followersList, setFollowersList] = useState<User[]>([]);
  const [profileUser, setProfileUser] = useState<User | undefined>();

  const fetchProfileUser = async () => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = req.data;
      setProfileUser(user);
      fetchUserFollowersList(user.username);
    } catch (e) {
      console.log("User does not exist, or issue loading: ", e);
    }
  };

  const fetchUserFollowersList = async (username: string) => {
    try {
      const followers = await getFollowers(username);
      setFollowersList(followers);
    } catch (e) {
      console.log("Error fetching followers: ", e);
    }
  };

  useEffect(() => {
    if (username === currentUserLoggedIn?.username) {
      setFollowersList(userLoggedInFollowersList);
      setProfileUser(currentUserLoggedIn);
    } else {
      fetchProfileUser();
    }
  }, [username, currentUserLoggedIn, token]);

  return (
    <div className="follow-list">
      {profileUser && <FollowHeader user={profileUser} />}
      <div className="mappedContainer">
        {followersList.length > 0 ? (
          followersList.map((suggest: User) => (
            <div key={suggest.userId} className="subMapped">
              <AllFollowers suggest={suggest} />
            </div>
          ))
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
};
