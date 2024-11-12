import React from "react";

import "./ProfilePicture.css";
import { User } from "../../utils/GlobalInterface";
import { useNavigate } from "react-router-dom";

interface ProfilePictureProps {
  user: User;
  size: string;
}

export default function ProfilePicture(props: ProfilePictureProps) {
  //
  const default_pfp = process.env.REACT_APP_PFP;
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/${props.user.username}`);
  };

  return (
    <img
      src={
        props.user.profilePicture
          ? props.user.profilePicture.imageURL
          : default_pfp
      }
      alt="user pfp"
      className="profile-picture"
      height={props.size}
      width={props.size}
      onClick={navigateToProfile}
    />
  );
}
