import React, { useEffect, useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";

import "./ProfileFollowSection.css";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../../redux/Slices/UserSlice";
import { ImageInfo, User } from "../../../../utils/GlobalInterface";
import { Link, useNavigate, useParams } from "react-router-dom";

interface ProfileFollowSectionProps {
  profilePicture: ImageInfo | null;
  profileUser: User;
  selfMode: boolean;
}

export const ProfileFollowSection: React.FC<ProfileFollowSectionProps> = ({
  profilePicture,
  profileUser,
  selfMode,
}) => {
  //
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const followingList = useSelector((state: RootState) => state.user.following);
  const followersList = useSelector((state: RootState) => state.user.followers);

  const [hoveringOverUnfollow, setHoveringOverUnfollow] =
    useState<boolean>(false);

  const handleFollowUser = () => {
    if (token) dispatch(followUser({ token, followee: profileUser.username }));
  };

  const default_pfp = process.env.REACT_APP_PFP;

  // github
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function EditButton() {
    return (
      <button
        onClick={() => setEditMode(true)}
        className="w-[134px] rounded-3xl h-8 flex items-center justify-center border-2 border-[#323C44] transition-all hover:bg-[#181919] self-start "
      >
        <span>Edit profile</span>
      </button>
    );
  }

  return (
    // <div className="profile-follow-section">
    //   <img
    //     src={profilePicture ? profilePicture.imageURL : default_pfp}
    //     alt={`${username}'s pfp`}
    //     className="profile-follow-section-pfp"
    //   />

    //   <div className="profile-follow-section-left">
    //     <div className="profile-follow-section-more">
    //       <MoreHorizIcon
    //         sx={{
    //           width: "20px",
    //           height: "20px",
    //         }}
    //       />
    //     </div>

    //     {followingList.find((person) => person.username === username) && (
    //       <div className="profile-follow-section-more">
    //         <NotificationAddIcon
    //           sx={{
    //             width: "20px",
    //             height: "20px",
    //           }}
    //         />
    //       </div>
    //     )}

    //     {followingList.find((person) => person.username === username) ? (
    //       <button
    //         className="profile-follow-section-unfollow-button"
    //         onMouseEnter={() => setHoveringOverUnfollow(true)}
    //         onMouseLeave={() => setHoveringOverUnfollow(false)}
    //       >
    //         {hoveringOverUnfollow ? "Unfollow" : "Following"}
    //       </button>
    //     ) : (
    //       <button
    //         className="profile-follow-section-follow-button"
    //         onClick={handleFollowUser}
    //       >
    //         Follow
    //       </button>
    //     )}
    //   </div>

    // </div>

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
              src={profileUser?.profilePicture?.imageURL ?? default_pfp}
              className="rounded-full  object-cover border-[4px] border-black "
              alt=""
            />
          </div>
          <div></div>
          {/* {selfMode ? <EditButton /> 
        :   
        } */}

          <div className="profile-follow-section-left">
            <div className="profile-follow-section-more">
              <MoreHorizIcon
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </div>

            {followingList.find(
              (person) => person.username === profileUser.username
            ) && (
              <div className="profile-follow-section-more">
                <NotificationAddIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
            )}

            {followingList.find(
              (person) => person.username === profileUser.username
            ) ? (
              <button
                className="profile-follow-section-unfollow-button"
                onMouseEnter={() => setHoveringOverUnfollow(true)}
                onMouseLeave={() => setHoveringOverUnfollow(false)}
              >
                {hoveringOverUnfollow ? "Unfollow" : "Following"}
              </button>
            ) : (
              <button
                className="profile-follow-section-follow-button"
                onClick={handleFollowUser}
              >
                Follow
              </button>
            )}
          </div>
        </div>
        <div className="h-10 w-full"></div>
      </div>
      <div className="flex flex-col items-start justify-center px-4 w-full">
        <h1 className="text-lg font-bold">{profileUser?.lastName}</h1>
        <span className="text-[#71767B]">@{profileUser?.username}</span>
        <span className="mt-3"> {profileUser?.bio} </span>
        <div className="flex items-center justify-center mt-3 gap-4">
          <Link
            to="following"
            className="text-sm hover:underline cursor-pointer "
          >
            <strong> {followingList?.length} </strong>{" "}
            <span className="text-[#71767B]">Following</span>
          </Link>
          <Link
            to="followers"
            className="text-sm hover:underline cursor-pointer "
          >
            <strong>{followersList?.length} </strong>{" "}
            <span className="text-[#71767B]">Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
