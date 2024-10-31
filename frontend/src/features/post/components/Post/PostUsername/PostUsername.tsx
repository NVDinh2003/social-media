import React, { useState } from "react";

import "./PostUsername.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../../utils/GlobalInterface";
import { PostProfilePopup } from "../PostProfilePopup/PostProfilePopup";
import {
  getFollowers,
  getFollowing,
} from "../../../../../services/UserService";

interface PostUsernameProps {
  author: User;
  repost: boolean;
}

export const PostUsername: React.FC<PostUsernameProps> = ({
  author,
  repost,
}) => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToProfile = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    navigate(`/${author.username}`);
  };

  const openPopup = async () => {
    // do logic to fetch the authors following and followers list
    try {
      const followers = getFollowers(author.username);
      const following = getFollowing(author.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      setFollowers(followingAndFollowers[0]);
      setFollowing(followingAndFollowers[1]);

      // console.log("followers: ", followers);
      // console.log("following: ", following);
      setDisplayModal(true);
    } catch (e) {}
  };

  const closePopup = () => {
    setDisplayModal(false);
  };

  return (
    <div
      className="post-username-container"
      onMouseOver={openPopup}
      onMouseLeave={closePopup}
    >
      {repost ? (
        <span className="post-username-repost-user" onClick={navigateToProfile}>
          {author.nickname} reposted
        </span>
      ) : (
        <p className="post-username-text" onClick={navigateToProfile}>
          {author.nickname ? author.nickname : author.username}
        </p>
      )}
      {displayModal && (
        <PostProfilePopup
          author={author}
          followersList={followers}
          followingList={following}
          closeModal={closePopup}
        />
      )}
    </div>
  );
};
