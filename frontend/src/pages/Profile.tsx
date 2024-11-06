import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import {
  Post as PostInterface,
  User,
  FeedPost,
} from "../utils/GlobalInterface";
import axios from "axios";
import { ProfileTopBar } from "../features/profile";
import { ProfileFollowSection } from "../features/profile/components/ProfileFollowSection/ProfileFollowSection";
import { EditProfile } from "../features/profile/components/EditProfile/EditProfile";
import { updateDisplayEditProfile } from "../redux/Slices/ModalSlice";
import { Post } from "../features/post/components/Post/Post";
import { ProfileUserPost } from "../features/profile/components/ProfileUserPost/ProfileUserPost";

export const Profile: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const currentUserLoggedIn = useSelector(
    (state: RootState) => state.user.loggedIn
  );
  const followings = useSelector((state: RootState) => state.user.following);
  const followers = useSelector((state: RootState) => state.user.followers);
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [selfMode, setSelfMode] = useState(false);
  const hiddenDiv = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const fetchProfileUser = async () => {
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
      setProfileUser(user);
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

      setPosts(req.data);
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  const fetchNextPosts = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting && currentUserLoggedIn && token) {
        // Dispatch action to fetch next posts if needed
      }
    });
  };

  useEffect(() => {
    console.log("posts: ", posts);
    if (token) fetchProfileUser();
  }, [username, token]);

  useEffect(() => {
    console.log("Profile");
    if (profileUser && currentUserLoggedIn) {
      const isSelfMode = username === currentUserLoggedIn.username;
      setSelfMode(isSelfMode);
    }
  }, [username, profileUser, currentUserLoggedIn]);

  useEffect(() => {
    console.log("fetching profile");
    if (selfMode && token) fetchProfileUser();
  }, [selfMode, currentUserLoggedIn]);

  const [current, setCurrent] = useState<any>(0);

  const handleClick = (param: any) => {
    setCurrent(param);
  };

  return (
    <div className="">
      {profileUser ? (
        <main className="w-full flex items-start">
          <div className="min-w-full md:w-[990px] md:min-w-max relative">
            <div className="w-full flex items-end justify-end gap-10 ">
              <div
                id="tweets"
                className="border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center"
              >
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
                  <div
                    onClick={(e: any) => handleClick(0)}
                    // className={current == 0 ? "border-bottom" : "no-border"}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer "
                  >
                    <span className="font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center ">
                      Post
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(1)}
                    // className={current == 1 ? "border-bottom" : ""}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Reply
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(2)}
                    // className={current == 2 ? "border-bottom" : ""}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Media
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(3)}
                    // className={current == 3 ? "border-bottom" : ""}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Likes
                    </span>
                  </div>
                </div>
                {current == 0 && <ProfileUserPost posts={posts} />}
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
