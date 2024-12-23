import React, { useEffect, useState } from "react";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";

import "./ProfileFollowSection.css";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../../redux/Slices/UserSlice";
import { ImageInfo, User } from "../../../../utils/GlobalInterface";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateDisplayEditProfile } from "../../../../redux/Slices/ModalSlice";
import TimeJoinedSVG from "../../../../components/SVGs/EditProfile/TimeJoinedSVG";
import { FollowSection } from "./FollowSection";

interface ProfileFollowSectionProps {
  profileUser: User;
  selfMode: boolean;
}

export const ProfileFollowSection: React.FC<ProfileFollowSectionProps> = ({
  profileUser,
  selfMode,
}) => {
  //
  // console.log(selfMode);
  const default_pfp = process.env.REACT_APP_PFP;
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const followingList = useSelector((state: RootState) => state.user.following);
  const followersList = useSelector((state: RootState) => state.user.followers);

  const [hoveringOverUnfollow, setHoveringOverUnfollow] =
    useState<boolean>(false);

  // const handleFollowUser = () => {
  //   console.log("handle follow");
  //   if (token) dispatch(followUser({ token, followee: profileUser.username }));
  // };

  useEffect(() => {
    // console.log("selfMode in ProfileFollowSection:", selfMode);
  }, [selfMode]);

  function EditButton() {
    return (
      <button
        onClick={openEditProfile}
        className="w-[134px] rounded-3xl h-8 flex items-center justify-center border-2 border-[#323C44] transition-all hover:bg-[#0f14191a] self-start "
      >
        <span>Edit profile</span>
      </button>
    );
  }
  const openEditProfile = () => {
    console.log(`Open Edit Profile`);
    dispatch(updateDisplayEditProfile());
  };

  return (
    <div
      id="user-information"
      className="w-full flex flex-col justify-between relative pb-2"
    >
      <div className="w-full h-[200px] relative bg-[#aab8c2] ">
        <div
          className="profile-banner-picture"
          style={
            profileUser.bannerPicture
              ? {
                  backgroundImage: `url("${profileUser.bannerPicture.imageURL}")`,
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
              className="rounded-full  object-cover border-[2px] border-black "
              alt=""
            />
          </div>
          <div></div>
          {selfMode ? (
            <EditButton />
          ) : (
            <FollowSection
              followingList={followingList}
              profileUser={profileUser}
            />
          )}
        </div>
        <div className="h-10 w-full"></div>
      </div>
      <div className="flex flex-col items-start justify-center px-4 w-full">
        <h1 className="text-lg font-bold">{profileUser?.lastName}</h1>
        <span className="text-[#71767B]">@{profileUser?.username}</span>
        <span className="mt-3"> {profileUser?.bio} </span>

        <p className="text-[#575B5F] font-semibold mt-2 flex items-center">
          <TimeJoinedSVG height={20} width={20} /> Tham gia vào{" "}
          {moment(profileUser?.createTimestamp).format("MMMM YYYY")}
        </p>

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
