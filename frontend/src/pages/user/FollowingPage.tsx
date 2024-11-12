// FollowingPage.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../redux/Store";
import { getFollowing } from "../../services/UserService";
import { FollowHeader } from "../../features/user/FollowHeader/FollowHeader";
import { AllFollowing } from "../../features/user/UserFollowing/UserFollowingList";
import { Nothing } from "../../components/Nothing/Nothing";
import { User } from "../../utils/GlobalInterface";
import "./FollowersAndFollowingPage.css";

export const FollowingPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const currentUserLoggedIn = useSelector(
    (state: RootState) => state.user.loggedIn
  );
  const userLoggedInFollowingList = useSelector(
    (state: RootState) => state.user.following
  );
  const { username } = useParams();
  const [followingList, setFollowingList] = useState<User[]>([]);
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
      fetchUserFollowingList(user.username);
    } catch (e) {
      console.log("User does not exist, or issue loading: ", e);
    }
  };

  const fetchUserFollowingList = async (username: string) => {
    try {
      const following = await getFollowing(username);
      setFollowingList(following);
    } catch (e) {
      console.log("Error fetching following: ", e);
    }
  };

  useEffect(() => {
    if (username === currentUserLoggedIn?.username) {
      setFollowingList(userLoggedInFollowingList);
      setProfileUser(currentUserLoggedIn);
    } else {
      fetchProfileUser();
    }
  }, [username, currentUserLoggedIn, token]);

  return (
    <div className="follow-list">
      {profileUser && <FollowHeader user={profileUser} />}
      <div className="mappedContainer">
        {followingList.length > 0 ? (
          followingList.map((suggest: User) => (
            <div key={suggest.userId} className="subMapped">
              <AllFollowing suggest={suggest} />
            </div>
          ))
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
};
