import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./Profile.css";
import { Post, User } from "../utils/GlobalInterface";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { ProfileTopBar } from "../features/profile";

import { ProfileFollowSection } from "../features/profile/components/ProfileFollowSection/ProfileFollowSection";

export const Profile: React.FC = () => {
  //
  const token = useSelector((state: RootState) => state.user.token);
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
        // <>
        //   {/* Top Bar  */}
        //   <ProfileTopBar
        //     nickname={profileUser.nickname}
        //     isVerified={profileUser.verifiedAccount}
        //     organization={profileUser.organization}
        //     numberOfPosts={posts.length}
        //   />

        //   {/* Profile Banner */}
        //   <div
        //     className="profile-banner-picture"
        //     style={
        //       profileUser.bannerPicture
        //         ? {
        //             backgroundImage: `url("${profileUser.bannerPicture}")`,
        //           }
        //         : { backgroundColor: "#aab8c2" }
        //     }
        //   />

        //   {/* Profile picture, options, follow */}
        //   <ProfileFollowSection
        //     profilePicture={profileUser.profilePicture}
        //     username={profileUser.username}
        //   />
        // </>

        <main className="w-full flex items-start">
          <div className="min-w-full md:w-[990px] md:min-w-max relative">
            <div className="w-full flex items-end justify-end gap-10 ">
              {/* <EditComponent setEditMode={setEditMode} active={editMode} /> */}

              <div
                id="tweets"
                className="border-l md:w-[592px] w-full border-l-gray-500 border-r border-r-gray-500 border-opacity-50 self-start flex flex-col items-center"
              >
                <div
                  id="topbar"
                  className="w-full relative h-[53px] flex items-center justify-center z-10"
                >
                  <div
                    className="flex items-center h-[53px] fixed w-[85%]  md:w-[31%] px-4 gap-6"
                    style={{
                      backdropFilter: "blur(12px)",
                      backgroundColor: "rgba(0, 0, 0, 0.65)",
                    }}
                  >
                    <div
                      // onClick={() => navigate(-1)}
                      className="transition-all hover:bg-[#181919] p-1 rounded-full cursor-pointer"
                    >
                      {/* <img src={back} width="20" alt="" /> */}
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <span className="font-bold text-xl">
                        {" "}
                        {profileUser?.lastName}{" "}
                      </span>
                      <span className="text-sm text-[#6A6F74]">
                        {" "}
                        {posts.length} Tweet
                      </span>
                    </div>
                  </div>
                </div>

                {profileUser ? (
                  <div
                    id="user-information"
                    className="w-full flex flex-col justify-between relative pb-2"
                  >
                    <div className="w-full h-[200px] relative bg-[#333639] ">
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
                    </div>
                    <div className="flex flex-col items-center w-full ">
                      <div className="px-4 flex items-center justify-between w-full mt-3 relative">
                        <div className="bg-black w-[141px] h-[141px] rounded-full absolute -bottom-[90%] ">
                          <img
                            src={
                              profileUser?.profilePicture?.imageURL ??
                              default_pfp
                            }
                            className="rounded-full  object-cover border-[4px] border-black "
                            alt=""
                          />
                        </div>
                        <div></div>
                        {/* <EditButton active={selfMode} />
                        <FollowButton
                          active={!selfMode}
                          user={user}
                          followersCallback={followersCallback}
                          followingCallback={followingCallback}
                        /> */}
                      </div>
                      <div className="h-10 w-full"></div>
                    </div>
                    <div className="flex flex-col items-start justify-center px-4 w-full">
                      <h1 className="text-lg font-bold">
                        {profileUser?.lastName}
                      </h1>
                      <span className="text-[#71767B]">
                        @{profileUser?.username}
                      </span>
                      <span className="mt-3"> {profileUser?.bio} </span>
                      <div className="flex items-center justify-center mt-3 gap-4">
                        <Link
                          to="following"
                          className="text-sm hover:underline cursor-pointer "
                        >
                          <strong> {followings?.length} </strong>{" "}
                          <span className="text-[#71767B]">Takip edilen</span>
                        </Link>
                        <Link
                          to="followers"
                          className="text-sm hover:underline cursor-pointer "
                        >
                          <strong>{followers?.length} </strong>{" "}
                          <span className="text-[#71767B]">Takipçi</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full self-start"></div>
                )}

                <div
                  id="menu"
                  className="w-full h-12 relative flex items-center border-b border-b-gray-500 border-opacity-50 mt-3"
                >
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer ">
                    <span className="font-bold h-full border-b-4 border-[#1d9bf0] flex items-center justify-center ">
                      Tweetler
                    </span>
                  </div>
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Tweetler ve yanıtlar
                    </span>
                  </div>
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Medya
                    </span>
                  </div>
                  <div className="w-full h-full px-2 md:px-4 flex items-center justify-center transition-all hover:bg-[#181818] cursor-pointer">
                    <span className="text-[#71767B] whitespace-nowrap ">
                      Beğeni
                    </span>
                  </div>
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
