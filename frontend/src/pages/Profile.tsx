import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./Profile.css";
import { Post, User } from "../utils/GlobalInterface";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { ProfileTopBar } from "../features/profile";

import { ProfileFollowSection } from "../features/profile/components/ProfileFollowSection/ProfileFollowSection";
import { EditProfile } from "../features/profile/components/EditProfile/EditProfile";
import { updateDisplayEditProfile } from "../redux/Slices/ModalSlice";

export const Profile: React.FC = () => {
  //
  const token = useSelector((state: RootState) => state.user.token);
  const currentUserLoggedIn = useSelector(
    (state: RootState) => state.user.loggedIn
  );
  const followings = useSelector((state: RootState) => state.user.following);
  const followers = useSelector((state: RootState) => state.user.followers);
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [posts, setPosts] = useState<Post[]>([]);
  const default_pfp = process.env.REACT_APP_PFP;

  const fetchProfileUser = async () => {
    //
    let user;
    try {
      console.log(username);
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

      // console.log(user);
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

      // console.log(posts);

      setPosts(req.data);
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  useEffect(() => {
    if (token) fetchProfileUser();
  }, [username, token]);

  // github
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selfMode, setSelfMode] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    console.log("Profile");
    if (profileUser && currentUserLoggedIn) {
      const isSelfMode = username === currentUserLoggedIn.username;
      setSelfMode(isSelfMode);
    }
  }, [username, profileUser, currentUserLoggedIn]);

  useEffect(() => {
    if (selfMode && token) fetchProfileUser();
  }, [selfMode, currentUserLoggedIn]);

  return (
    <div className="">
      {profileUser ? (
        <main className="w-full flex items-start">
          <div className="min-w-full md:w-[990px] md:min-w-max relative">
            <div className="w-full flex items-end justify-end gap-10 ">
              {/* <EditComponent setEditMode={setEditMode} active={editMode} /> */}

              <div
                id="tweets"
                className="border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center"
              >
                {/* Top Bar  */}
                <ProfileTopBar
                  nickname={profileUser.nickname}
                  isVerified={profileUser.verifiedAccount}
                  organization={profileUser.organization}
                  numberOfPosts={posts.length}
                />

                {profileUser ? (
                  <div
                    id="user-information"
                    className="w-full flex flex-col justify-between relative pb-2"
                  >
                    <ProfileFollowSection
                      profilePicture={profileUser.profilePicture}
                      profileUser={profileUser}
                      selfMode={selfMode}
                    />
                  </div>
                ) : (
                  <div className="w-full self-start"></div>
                )}

                <div
                  id="menu"
                  className="w-full h-12 relative flex items-center border-b border-b-gray-500 border-opacity-50 mt-3"
                >
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer ">
                    <span className="font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center ">
                      Post
                    </span>
                  </div>
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Reply
                    </span>
                  </div>
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Media
                    </span>
                  </div>
                  {/* <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Beğeni
                    </span>
                  </div> */}
                </div>

                <div
                  id="mainTweets"
                  className="w-full flex flex-col min-h-screen "
                >
                  {/* {loading ? (
                    <Loading />
                  ) : (
                    tweets.map((tweet, index) => {
                      return (
                        <Tweet
                          id={tweet.user}
                          key={index}
                          content={tweet.content}
                          date={tweet.date}
                        />
                      );
                    })
                  )} */}
                </div>
              </div>

              <div
                id="tags"
                className="!w-[350px] !min-w-[350px] hidden md:flex flex-col mr-[10px] gap-4 self-start"
              >
                {/* <SearchComp />
                <div className="w-full !h-11 mb-2"></div>
                <UsersBox title="Bunları beğenebilirsin" />
                <Hashtags /> */}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <></>
      )}
    </div>
  );
};
