import React from "react";

import "./PostProfilePopupIcons.css";
import { User } from "../../../../../../utils/GlobalInterface";

interface PostProfilePopupIconsProps {
  followedBy: User[];
}

export const PostProfilePopupIcons: React.FC<PostProfilePopupIconsProps> = ({
  followedBy,
}) => {
  const defaultPfp = process.env.REACT_APP_PFP;

  return (
    <div className="post-profile-popup-icons">
      {followedBy.map((user, index) => {
        if (user.profilePicture) {
          return (
            <img
              key={index}
              src={user.profilePicture.imageURL}
              alt="user pfp"
              className="post-profile-popup-icon"
              style={{ left: `${index * 10}px` }}
            />
          );
        }

        return (
          <img
            key={index}
            src={defaultPfp}
            alt="user pfp"
            className="post-profile-popup-icon"
            style={{ left: `${index * 10}px` }}
          />
        );
      })}
    </div>
  );
};
