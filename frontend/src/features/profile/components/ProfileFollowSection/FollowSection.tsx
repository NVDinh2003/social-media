import MoreHoriz from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useState } from "react";
import { User } from "../../../../utils/GlobalInterface";
import NotificationAdd from "@mui/icons-material/NotificationAdd";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../../../../redux/Slices/UserSlice";
import { toast } from "react-toastify";

import "./ProfileFollowSection.css";

interface FollowSection {
  profileUser: User;
  followingList: User[];
}

export const FollowSection: React.FC<FollowSection> = ({
  profileUser,
  followingList,
}) => {
  //
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const [hoveringOverUnfollow, setHoveringOverUnfollow] =
    useState<boolean>(false);

  const handleFollowUser = () => {
    console.log("handle follow");
    if (token) {
      const isFollowing = followingList.find(
        (person) => person.username === profileUser.username
      );

      if (isFollowing) {
        const confirmUnfollow = window.confirm(
          "Bạn có chắc chắn muốn hủy theo dõi " + profileUser.username + "?"
        );
        if (confirmUnfollow) {
          dispatch(followUser({ token, followee: profileUser.username }));
          toast.success("Đã hủy theo dõi " + profileUser.username, {
            autoClose: 1500,
          });
        }
      } else {
        dispatch(followUser({ token, followee: profileUser.username }));
        toast.success("Đã theo dõi " + profileUser.username, {
          autoClose: 1500,
        });
      }
    }
  };

  //   useEffect(() => {
  //     console.log("FollowSection:", profileUser);
  //     console.log("list:", followingList);
  //   }, [profileUser, followingList]);

  return (
    <div className="profile-follow-section-left">
      <div className="profile-follow-section-more">
        <MoreHoriz
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
      </div>
      {/* 
      {followingList.find(
        (person) => person.username === profileUser.username
      ) && (
        <div className="profile-follow-section-more">
          <NotificationAdd
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>
      )} */}

      {followingList.find(
        (person) => person.username === profileUser.username
      ) ? (
        <button
          className="profile-follow-section-unfollow-button"
          onMouseEnter={() => setHoveringOverUnfollow(true)}
          onMouseLeave={() => setHoveringOverUnfollow(false)}
          onClick={handleFollowUser}
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
  );
};
