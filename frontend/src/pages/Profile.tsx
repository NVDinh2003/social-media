import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Profile.css";
import { Post, User } from "../utils/GlobalInterface";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { ProfileTopBar } from "../features/profile";

import bannerImage from "../assets/pocket-watch-1637396_1280.jpg";
import { ProfileFollowSection } from "../features/profile/components/ProfileFollowSection/ProfileFollowSection";

export const Profile: React.FC = () => {
  //
  const token = useSelector((state: RootState) => state.user.token);
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchProfileUser = async () => {
    //
    let user;
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      user = req.data;
      //   user.bannerPicture = `${process.env.REACT_APP_DEFAULT_BANNER}`;

      console.log(user);
      setProfileUser(user);
      //
    } catch (e) {
      console.log("User does not exist, or issue loading: ", e);
    } finally {
      await fetchUserPosts(user);
    }
  };

  const fetchUserPosts = async (user: User) => {
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/author/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(posts);

      setPosts(req.data);
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  useEffect(() => {
    if (token) fetchProfileUser();
  }, [username, token]);

  return (
    <div className="profile">
      {profileUser ? (
        <>
          {/* Top Bar  */}
          <ProfileTopBar
            nickname={profileUser.nickname}
            isVerified={true}
            organization={
              process.env.REACT_APP_PFP ? process.env.REACT_APP_PFP : ""
            }
            numberOfPosts={posts.length}
          />

          {/* Profile Banner */}
          <div
            className="profile-banner-picture"
            style={
              profileUser.bannerPicture
                ? {
                    backgroundImage: `url("${profileUser.bannerPicture}")`,
                  }
                : { backgroundColor: "#aab8c2" }
            }
          />

          {/* Profile picture, options, follow */}
          <ProfileFollowSection
            profilePicture={profileUser.profilePicture}
            username={profileUser.username}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
