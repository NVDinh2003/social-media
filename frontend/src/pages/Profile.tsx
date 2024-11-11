import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { Post as PostInterface, User } from "../utils/GlobalInterface";
import axios from "axios";
import { ProfileTopBar } from "../features/profile";
import { ProfileFollowSection } from "../features/profile/components/ProfileFollowSection/ProfileFollowSection";
import { ProfileUserPost } from "../features/profile/components/ProfileUserPost/ProfileUserPost";
import { ProfileUserRepost } from "../features/profile/components/ProfileUserPost/ProfileUserRepost";
import { ProfileUserReplyPost } from "../features/profile/components/ProfileUserPost/ProfileUserReplyPost";
import { VerifiedNotifications } from "../features/notification/components/VerifiedNotifications/VerifiedNotifications";
import { Nothing } from "../components/Nothing/Nothing";

export const Profile: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const currentUserLoggedIn = useSelector(
    (state: RootState) => state.user.loggedIn
  );
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState<User | undefined>();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  // const [loading, setLoading] = useState(false);
  const [selfMode, setSelfMode] = useState(false);
  // const hiddenDiv = useRef<HTMLDivElement>(null);

  const fetchProfileUser = async () => {
    let user;
    try {
      // console.log(username);
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

      // console.log(req.data);

      setPosts(req.data);
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  // const fetchNextPosts = (entries: any) => {
  //   entries.forEach((entry: any) => {
  //     if (entry.isIntersecting && currentUserLoggedIn && token) {
  //       // Dispatch action to fetch next posts if needed
  //     }
  //   });
  // };

  useEffect(() => {
    // console.log("posts: ", posts);
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
    // console.log("fetching profile");
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
                className="border-l md:w-[624px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center"
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
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer "
                  >
                    <span
                      className={
                        current === 0
                          ? "font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center "
                          : "text-[#71767B] whitespace-nowrap "
                      }
                    >
                      Post
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(1)}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span
                      className={
                        current === 1
                          ? "font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center "
                          : "text-[#71767B] whitespace-nowrap "
                      }
                    >
                      Reply
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(2)}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span
                      className={
                        current === 2
                          ? "font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center "
                          : "text-[#71767B] whitespace-nowrap "
                      }
                    >
                      Repost
                    </span>
                  </div>

                  <div
                    onClick={(e: any) => handleClick(3)}
                    style={{ cursor: "pointer" }}
                    className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#0f14191a] cursor-pointer"
                  >
                    <span
                      className={
                        current === 3
                          ? "font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center "
                          : "text-[#71767B] whitespace-nowrap "
                      }
                    >
                      Media
                    </span>
                  </div>
                </div>
                {current === 0 && <ProfileUserPost posts={posts} />}
                {current === 1 && (
                  <ProfileUserReplyPost profileUser={profileUser} />
                )}
                {current === 2 && (
                  <ProfileUserRepost profileUser={profileUser} />
                )}
                {current === 3 && <Nothing />}
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
